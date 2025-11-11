import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import booksData from '@/assets/data/books.json';
import { ReaderHeader, PDFViewer, ControlBar } from '../../components';
import { useReadingProgress } from '../../hooks';
import type { Book, PDFViewerState } from '../../types';
import { PDF_SETTINGS, KEYBOARD_SHORTCUTS } from '../../constants';
import { RouteName } from '@/shared/constants';

const BookReading: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const books = booksData as Book[];
  const currentBook = books.find((book) => book.id === bookId);

  const [pdfState, setPdfState] = useState<PDFViewerState>({
    currentPage: 1,
    totalPages: 0,
    scale: PDF_SETTINGS.defaultScale,
    isLoading: true,
    error: null,
  });

  const { progress, updateProgress } = useReadingProgress(bookId || '');

  const handleBack = () => {
    navigate(RouteName.HOME);
  };

  const handlePDFLoadSuccess = useCallback(
    (numPages: number) => {
      setPdfState((prev) => ({
        ...prev,
        totalPages: numPages,
        isLoading: false,
        error: null,
      }));

      // If have saved progress, restore it
      if (progress && progress.totalPages === numPages) {
        setPdfState((prev) => ({
          ...prev,
          currentPage: progress.currentPage,
        }));
      } else {
        updateProgress(1, numPages);
      }
    },
    [progress, updateProgress],
  );

  const handlePDFLoadError = useCallback((error: Error) => {
    setPdfState((prev) => ({
      ...prev,
      isLoading: false,
      error: error.message,
    }));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= pdfState.totalPages) {
        setPdfState((prev) => ({
          ...prev,
          currentPage: page,
        }));
        updateProgress(page, pdfState.totalPages);
      }
    },
    [pdfState.totalPages, updateProgress],
  );

  const goToPrevPage = useCallback(() => {
    goToPage(pdfState.currentPage - 1);
  }, [pdfState.currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    goToPage(pdfState.currentPage + 1);
  }, [pdfState.currentPage, goToPage]);

  const zoomIn = useCallback(() => {
    setPdfState((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + PDF_SETTINGS.scaleStep, PDF_SETTINGS.maxScale),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setPdfState((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - PDF_SETTINGS.scaleStep, PDF_SETTINGS.minScale),
    }));
  }, []);

  const handleScaleChange = useCallback((scale: number) => {
    setPdfState((prev) => ({
      ...prev,
      scale,
    }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (KEYBOARD_SHORTCUTS.PREV_PAGE.includes(event.key)) {
        event.preventDefault();
        goToPrevPage();
      } else if (KEYBOARD_SHORTCUTS.NEXT_PAGE.includes(event.key)) {
        event.preventDefault();
        goToNextPage();
      } else if (KEYBOARD_SHORTCUTS.ZOOM_IN.includes(event.key)) {
        event.preventDefault();
        zoomIn();
      } else if (KEYBOARD_SHORTCUTS.ZOOM_OUT.includes(event.key)) {
        event.preventDefault();
        zoomOut();
      } else if (KEYBOARD_SHORTCUTS.ESCAPE.includes(event.key)) {
        event.preventDefault();
        handleBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPrevPage, goToNextPage, zoomIn, zoomOut, handleBack]);

  // Not found case
  if (!currentBook) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#fdfaf5]'>
        <div className='text-center'>
          <h1 className='text-2xl font-serif font-bold text-gray-900 mb-4'>Book Not Found</h1>
          <button
            onClick={handleBack}
            className='text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200'
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const headerProgress = progress || {
    bookId: currentBook.id,
    currentPage: pdfState.currentPage,
    totalPages: pdfState.totalPages,
    progressPercentage:
      pdfState.totalPages > 0 ? Math.round((pdfState.currentPage / pdfState.totalPages) * 100) : 0,
    lastReadDate: new Date().toISOString(),
  };

  return (
    <div className='min-h-screen flex flex-col bg-[#fdfaf5]'>
      <ReaderHeader book={currentBook} progress={headerProgress} onBack={handleBack} />

      <main className='flex-1 overflow-auto'>
        <PDFViewer
          pdfFile={currentBook.pdfFile}
          currentPage={pdfState.currentPage}
          scale={pdfState.scale}
          onLoadSuccess={handlePDFLoadSuccess}
          onLoadError={handlePDFLoadError}
        />
      </main>

      <ControlBar
        currentPage={pdfState.currentPage}
        totalPages={pdfState.totalPages}
        scale={pdfState.scale}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onScaleChange={handleScaleChange}
      />
    </div>
  );
};

export default BookReading;
