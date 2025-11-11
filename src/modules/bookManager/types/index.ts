export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  pdfFile: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastReadDate: string;
  progressPercentage: number;
}

export interface PDFViewerState {
  currentPage: number;
  totalPages: number;
  scale: number;
  isLoading: boolean;
  error: string | null;
}
