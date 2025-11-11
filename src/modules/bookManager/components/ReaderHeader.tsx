import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Book, ReadingProgress } from '../types';
import { TOOLTIPS } from '../constants';

interface ReaderHeaderProps {
  book: Book;
  progress: ReadingProgress;
  onBack: () => void;
}

const ReaderHeader: React.FC<ReaderHeaderProps> = ({ book, progress, onBack }) => {
  return (
    <header className='sticky top-0 z-10 bg-[#fdfaf5]/80 backdrop-blur-sm border-b border-gray-200/50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          {/* Back Button */}
          <button
            onClick={onBack}
            className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200'
            title={TOOLTIPS.BACK_TO_LIBRARY}
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='font-sans text-sm font-medium'>Back to Library</span>
          </button>

          {/* Book Title - Centered */}
          <div className='flex-1 text-center px-4'>
            <h1 className='font-serif font-bold text-2xl text-gray-900 truncate'>{book.title}</h1>
          </div>

          {/* Progress Display */}
          <div className='flex flex-col items-end space-y-2'>
            <div className='font-sans text-sm text-gray-600'>
              Page {progress.currentPage} / {progress.totalPages}
            </div>
            <div className='h-1.5 w-[120px] bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='h-full bg-orange-400 rounded-full transition-[width] duration-500 ease-out'
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ReaderHeader;
