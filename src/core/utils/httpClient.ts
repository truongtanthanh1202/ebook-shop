import { type IResponse } from '../interface';
import { authService } from '@/services';
import { isNotifyWhenFail, jsonDecode } from '@/shared/utils';
import { APP_ACCESS_TOKEN, getAppAccessToken, removeAppToken } from '../helper';

interface FetchRequestConfig extends RequestInit {
  url?: string;
  offNotify?: boolean;
  offRefreshToken?: boolean;
  timeout?: number;
}

interface ConfigInstance {
  setAuthorizationFn?: (config: FetchRequestConfig) => FetchRequestConfig;
}

interface Constructor {
  baseURL: string;
  headers?: Record<string, string>;
  noTransform?: boolean;
  withActionRefresh?: boolean;
  withActionLogout?: boolean;
}

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

const LIST_CODE_ERROR = [422, 400, 403, 402, 409];

export class HttpClient {
  private isRefreshing = false;
  private failedQueue: FailedQueueItem[] = [];
  baseURL = '';
  headers: Record<string, string> = {};
  noTransform = false;
  withActionRefresh = false;
  withActionLogout = false;

  constructor({ baseURL, headers, noTransform, withActionRefresh, withActionLogout }: Constructor) {
    this.baseURL = baseURL;
    this.headers = headers || {};
    this.noTransform = !!noTransform;
    this.withActionRefresh = !!withActionRefresh;
    this.withActionLogout = !!withActionLogout;
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach((item) => {
      if (error) {
        item.reject(error);
      } else {
        item.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private rejectErrorAndClearToken(error: Error) {
    removeAppToken();

    if (this.withActionLogout) {
      window.location.href = `/login?returnUrl=${encodeURIComponent(
        window.location.href.replace(window.location.origin, ''),
      )}`;
    }

    return this.transformError(error, null);
  }

  private transformResponse(response: Response, data: any): IResponse | Response {
    if (this.noTransform) {
      return response;
    }

    const resData = data || {};
    const success = !!resData.success;
    return {
      success,
      error: !success,
      data: resData.data,
      statusCode: response.status,
      message: resData.message,
      rawResponse: response,
    };
  }

  private transformError(error: Error, response: Response | null): IResponse {
    let resData: any = {};
    let statusCode: number | string = 'NETWORK_ERROR';
    let message = error.message;

    if (response) {
      try {
        // Try to extract error data if available
        resData = (response as any).data || {};
        statusCode = response.status;
        message = resData.message || error.message;
      } catch (e) {
        // Use defaults if parsing fails
      }
    }

    return {
      success: false,
      error: true,
      data: resData.data,
      statusCode,
      message,
      rawResponse: response,
    };
  }

  private async timeoutPromise<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs),
    );

    return Promise.race([promise, timeout]);
  }

  private async parseResponse(response: Response) {
    const text = await response.text();
    const parsedData = jsonDecode(text);
    return parsedData;
  }

  private async handleErrorResponse(
    error: Error,
    response: Response | null,
    url: string,
    originalConfig: FetchRequestConfig,
    request: (url: string, config?: FetchRequestConfig) => Promise<IResponse | Response>,
  ): Promise<IResponse> {
    const statusCode = response?.status;

    if (response && isNotifyWhenFail(response) && statusCode && LIST_CODE_ERROR.includes(statusCode)) {
      // showErrorToast((response as any).data?.message);
    }

    if (!this.withActionRefresh) {
      if (statusCode === 401 && this.withActionLogout) {
        return this.rejectErrorAndClearToken(error);
      }
      return this.transformError(error, response);
    }

    // Prevent refresh token
    if (originalConfig.offRefreshToken) {
      return this.transformError(error, response);
    }

    // Only handle when status == 401
    if (statusCode !== 401) {
      return this.transformError(error, response);
    }

    // Clear token and throw error when retried
    if ((originalConfig as any)._retry) {
      return this.rejectErrorAndClearToken(error);
    }

    // If refresh token is expired or not valid and server response status == 401
    if (url.includes('v1/auth/refresh-token')) {
      return this.rejectErrorAndClearToken(error);
    }

    // Handle if token is refreshing
    if (this.isRefreshing) {
      return new Promise<IResponse>((resolve, reject) => {
        this.failedQueue.push({
          resolve: (_token) => {
            request(url, originalConfig)
              .then((result) => {
                if (this.noTransform && result instanceof Response) {
                  resolve(this.transformResponse(result, (result as any).data) as IResponse);
                } else {
                  resolve(result as IResponse);
                }
              })
              .catch(reject);
          },
          reject,
        });
      });
    }

    // Set variables
    (originalConfig as any)._retry = true;
    this.isRefreshing = true;

    try {
      // Call request refresh token
      const res = await authService.refreshToken();
      this.isRefreshing = false;

      if (res.error) {
        this.processQueue(error);
        return this.rejectErrorAndClearToken(error);
      }

      this.processQueue(null, res.data?.accessToken);
      localStorage.setItem(APP_ACCESS_TOKEN, res.data?.accessToken);

      const retryResult = await request(url, originalConfig);
      if (this.noTransform && retryResult instanceof Response) {
        return this.transformResponse(retryResult, (retryResult as any).data) as IResponse;
      }
      return retryResult as IResponse;
    } catch (refreshError) {
      this.isRefreshing = false;
      this.processQueue(refreshError as Error);
      return this.rejectErrorAndClearToken(error);
    }
  }

  create({ setAuthorizationFn }: ConfigInstance = {}) {
    const defaultSetAuthorizationFn = (config: FetchRequestConfig) => {
      const token = getAppAccessToken();

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    };

    const request = async (url: string, config: FetchRequestConfig = {}): Promise<IResponse | Response> => {
      try {
        // Setup default headers
        const defaultHeaders = {
          Accept: 'application/json',
          'accept-language': 'vi',
          ...this.headers,
          ...config.headers,
        };

        let requestConfig: FetchRequestConfig = {
          ...config,
          headers: defaultHeaders,
        };

        // Apply authorization
        if (setAuthorizationFn) {
          requestConfig = setAuthorizationFn(requestConfig);
        } else {
          requestConfig = defaultSetAuthorizationFn(requestConfig);
        }

        const fullUrl = url.startsWith('http') ? url : `${this.baseURL}/${url.replace(/^\//, '')}`;
        const timeout = config.timeout || 30000;

        // Make the request with timeout
        const fetchPromise = fetch(fullUrl, requestConfig);
        const response = await this.timeoutPromise(fetchPromise, timeout);

        // Parse response data
        const data = await this.parseResponse(response);
        (response as any).data = data;

        // Handle notifications
        if (isNotifyWhenFail(response)) {
          // showErrorToast(data?.message);
        }

        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
          return await this.handleErrorResponse(error, response, url, requestConfig, request);
        }

        return this.transformResponse(response, data);
      } catch (error) {
        return await this.handleErrorResponse(error as Error, null, url, config, request);
      }
    };

    // Create HTTP method helpers
    const get = (url: string, config: FetchRequestConfig = {}) => {
      return request(url, { ...config, method: 'GET' });
    };

    const post = (url: string, data?: any, config: FetchRequestConfig = {}) => {
      const body = data ? JSON.stringify(data) : undefined;
      return request(url, {
        ...config,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      });
    };

    const put = (url: string, data?: any, config: FetchRequestConfig = {}) => {
      const body = data ? JSON.stringify(data) : undefined;
      return request(url, {
        ...config,
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      });
    };

    const patch = (url: string, data?: any, config: FetchRequestConfig = {}) => {
      const body = data ? JSON.stringify(data) : undefined;
      return request(url, {
        ...config,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      });
    };

    const del = (url: string, config: FetchRequestConfig = {}) => {
      return request(url, { ...config, method: 'DELETE' });
    };

    return {
      request,
      get,
      post,
      put,
      patch,
      delete: del,
    };
  }
}
