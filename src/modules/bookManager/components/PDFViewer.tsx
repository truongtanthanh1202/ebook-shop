import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ERROR_MESSAGES } from '../constants';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  pdfFile: string;
  currentPage: number;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onLoadError: (error: Error) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile, currentPage, scale, onLoadSuccess, onLoadError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setIsLoading(false);
    setError(null);
    onLoadSuccess(numPages);
  };

  const handleLoadError = (error: Error) => {
    setIsLoading(false);
    setError(ERROR_MESSAGES.PDF_LOAD_FAILED);
    onLoadError(error);
  };

  const handlePageLoadSuccess = () => {
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-center py-8'>
      <div className='bg-white rounded-xl shadow-lg p-6 md:p-10 mx-auto max-w-fit'>
        {error ? (
          <div className='text-center py-12'>
            <div className='text-red-500 text-lg font-medium mb-2'>{error}</div>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
              }}
              className='text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200'
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className='text-center py-12'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4'></div>
                <div className='text-gray-600'>Loading PDF...</div>
              </div>
            )}

            <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              <Document
                file={pdfFile}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
                className='flex justify-center'
                loading={null}
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  onLoadSuccess={handlePageLoadSuccess}
                  className='shadow-sm'
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
