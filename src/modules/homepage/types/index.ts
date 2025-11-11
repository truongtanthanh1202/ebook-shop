export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  pdfFile: string;
}

export interface BookProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  progressPercentage: number;
}
