import React from 'react';
import { ProgressBar } from '@/shared/components';
import type { Book, BookProgress } from '../types';

interface BookCardProps {
  book: Book;
  progress?: BookProgress;
  className?: string;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, progress, className, onClick }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ${className || ''}`}
      onClick={handleClick}
    >
      <div className='relative overflow-hidden bg-white rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300'>
        <div className='aspect-3/4 w-full'>
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className='w-full h-full object-cover'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/300/400';
            }}
          />
        </div>
      </div>

      <div className='mt-4 space-y-2'>
        <h3 className='font-serif font-bold text-lg text-center text-gray-900 leading-tight truncate'>
          {book.title}
        </h3>
        <p className='font-sans text-sm text-gray-600 text-center truncate'>by {book.author}</p>
        {progress && (
          <div className='pt-2'>
            <ProgressBar
              value={progress.progressPercentage}
              max={100}
              label={`Page ${progress.currentPage} / ${progress.totalPages}`}
              className='w-full'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
