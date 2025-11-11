import { getAppRefreshToken, ebookClient, ebookPublichClient, type IResponse } from '@/core';

class AuthService {
  async login(payload: any): Promise<IResponse> {
    return await ebookPublichClient.post('v1/auth/login', payload);
  }

  async logOut(payload: { logout_all: boolean }): Promise<IResponse> {
    return await ebookPublichClient.post('v1/auth/logout', {
      refresh_token: getAppRefreshToken(),
      ...payload,
    });
  }

  async refreshToken(): Promise<IResponse> {
    return await ebookClient.post('v1/auth/refresh-token', {
      refreshToken: getAppRefreshToken(),
    });
  }
}

export const authService = new AuthService();
