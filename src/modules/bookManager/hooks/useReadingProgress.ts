import { useState, useEffect, useCallback } from 'react';
import type { ReadingProgress } from '../types';
import { STORAGE_KEYS } from '../constants';

interface UseReadingProgressReturn {
  progress: ReadingProgress | null;
  updateProgress: (page: number, totalPages: number) => void;
  loadProgress: (bookId: string) => ReadingProgress | null;
  saveProgress: (progress: ReadingProgress) => void;
}

export const useReadingProgress = (bookId: string): UseReadingProgressReturn => {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);

  const loadProgress = useCallback((id: string): ReadingProgress | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
      if (stored) {
        const allProgress = JSON.parse(stored);
        return allProgress[id] || null;
      }
    } catch (error) {
      console.error('Failed to load reading progress:', error);
    }
    return null;
  }, []);

  const saveProgress = useCallback((progressData: ReadingProgress): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
      const allProgress = stored ? JSON.parse(stored) : {};

      allProgress[progressData.bookId] = {
        ...progressData,
        lastReadDate: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  }, []);

  const updateProgress = useCallback(
    (page: number, totalPages: number): void => {
      const progressPercentage = Math.round((page / totalPages) * 100);

      const newProgress: ReadingProgress = {
        bookId,
        currentPage: page,
        totalPages,
        progressPercentage,
        lastReadDate: new Date().toISOString(),
      };

      setProgress(newProgress);
      saveProgress(newProgress);
    },
    [bookId, saveProgress],
  );

  useEffect(() => {
    const loadedProgress = loadProgress(bookId);
    if (loadedProgress) {
      setProgress(loadedProgress);
    }
  }, [bookId, loadProgress]);

  return {
    progress,
    updateProgress,
    loadProgress,
    saveProgress,
  };
};
