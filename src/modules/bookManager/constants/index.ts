export const PDF_SETTINGS = {
  minScale: 0.5,
  maxScale: 3.0,
  defaultScale: 1.0,
  scaleStep: 0.25,
  pageTransitionDuration: 500, // ms
};

export const KEYBOARD_SHORTCUTS = {
  PREV_PAGE: ['ArrowLeft', 'PageUp'] as string[],
  NEXT_PAGE: ['ArrowRight', 'PageDown', ' '] as string[], // Space key
  ZOOM_IN: ['+', '='] as string[],
  ZOOM_OUT: ['-', '_'] as string[],
  ESCAPE: ['Escape'] as string[],
};

export const STORAGE_KEYS = {
  READING_PROGRESS: 'ebook_reading_progress',
};

export const ERROR_MESSAGES = {
  PDF_LOAD_FAILED: 'Failed to load PDF file. Please try again.',
  PDF_NOT_FOUND: 'PDF file not found.',
  INVALID_PAGE: 'Invalid page number.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

export const TOOLTIPS = {
  PREV_PAGE: 'Previous Page (←)',
  NEXT_PAGE: 'Next Page (→)',
  ZOOM_IN: 'Zoom In (+)',
  ZOOM_OUT: 'Zoom Out (-)',
  BACK_TO_LIBRARY: 'Back to Library',
};
