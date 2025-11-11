import React from 'react';
import BookCard from './BookCard';
import type { Book, BookProgress } from '../types';
import { CONTENT } from '../constants';

interface FeaturedBooksSectionProps {
  books: Book[];
  bookProgresses?: BookProgress[];
  onBookClick?: (book: Book) => void;
}

const FeaturedBooksSection: React.FC<FeaturedBooksSectionProps> = ({
  books,
  bookProgresses = [],
  onBookClick,
}) => {
  const getBookProgress = (bookId: string) => {
    return bookProgresses.find((progress) => progress.bookId === bookId);
  };

  return (
    <section className='py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <p className='font-sans text-xs uppercase tracking-widest text-gray-400 mb-2'>
            {CONTENT.featuredBooks.label}
          </p>
          <h2 className='font-serif font-bold text-4xl lg:text-5xl text-gray-900'>
            {CONTENT.featuredBooks.title}
          </h2>
        </div>

        {/* Books Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {books.slice(0, 4).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              progress={getBookProgress(book.id)}
              onClick={() => onBookClick?.(book)}
              className='w-full'
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooksSection;
