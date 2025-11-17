import type { AxiosRequestConfig } from 'axios';

export interface IResponse {
  data?: any;
  statusCode?: number | string;
  success: boolean;
  error: boolean;
  message?: string;
  rawResponse?: any;
}

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  offNotify?: boolean;
  offRefreshToken?: boolean;
}

export interface HttpInstance {
  get: (url: string, config?: any) => Promise<IResponse>;
  post: (url: string, data?: any, config?: any) => Promise<IResponse>;
  put: (url: string, data?: any, config?: any) => Promise<IResponse>;
  patch: (url: string, data?: any, config?: any) => Promise<IResponse>;
  delete: (url: string, config?: any) => Promise<IResponse>;
  request: (url: string, config?: any) => Promise<IResponse>;
}
