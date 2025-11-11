export const APP_ACCESS_TOKEN = 'app_access_token';
export const APP_REFRESH_TOKEN = 'app_refresh_token';

export const authLogout = async (): Promise<void> => {
  //   try {
  //     await authService.logOut({
  //       logout_all: true,
  //     });
  //   } catch (e) {
  //     window.location.href = `/logout?continue=${window.location.origin}`;
  //   } finally {
  //     localStorage.clear();
  //   }
};

export const getAppAccessToken = (): string | null => {
  return localStorage.getItem(APP_ACCESS_TOKEN);
};

export const getAppRefreshToken = (): string | null => {
  return localStorage.getItem(APP_REFRESH_TOKEN);
};

export const isNoTokenPresent = (): boolean => {
  const accessToken = getAppAccessToken();
  const refreshToken = getAppRefreshToken();

  return !accessToken && !refreshToken;
};

export const setAppToken = (authInfo: any): void => {
  localStorage.setItem(APP_ACCESS_TOKEN, authInfo.access_token);
  localStorage.setItem(APP_REFRESH_TOKEN, authInfo.refresh_token);
};

export const removeAppToken = (): void => {
  localStorage.removeItem(APP_ACCESS_TOKEN);
  localStorage.removeItem(APP_REFRESH_TOKEN);
};
