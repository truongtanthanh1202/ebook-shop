import type { ReadingProgress } from '@/modules/bookManager/types';
import { STORAGE_KEYS } from '@/modules/bookManager/constants';

export const loadAllReadingProgress = (): Record<string, ReadingProgress> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load reading progress from localStorage:', error);
  }
  return {};
};

export const getBookReadingProgress = (bookId: string): ReadingProgress | null => {
  const allProgress = loadAllReadingProgress();
  return allProgress[bookId] || null;
};

export const hasReadingProgress = (bookId: string): boolean => {
  return getBookReadingProgress(bookId) !== null;
};
