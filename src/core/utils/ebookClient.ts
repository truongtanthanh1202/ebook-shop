import type { AxiosInstance } from 'axios';

import { BaseClient } from './baseClient';

export const ebookPublichClient: AxiosInstance = new BaseClient({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
}).create();

export const ebookClient: AxiosInstance = new BaseClient({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withActionLogout: true,
  withActionRefresh: true,
}).create();
