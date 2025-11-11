import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { RouteName } from '@/shared/constants';
import booksData from '@/assets/data/books.json';
import { HeroSection, FeaturedBooksSection } from '../../components';
import type { Book, BookProgress } from '../../types';
import { MOCK_PROGRESS } from '../../constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const books = booksData as Book[];
  const bookProgresses: BookProgress[] = Object.values(MOCK_PROGRESS);

  const handleBookClick = (book: Book) => {
    navigate(`/${RouteName.BOOK_DETAILS}/${book.id}`);
  };

  const handlePrevious = () => {
    setCurrentHeroIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentHeroIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
  };

  const handleReadMore = () => {
    const currentBook = books[currentHeroIndex];
    if (currentBook) {
      handleBookClick(currentBook);
    }
  };

  const featuredBook = books[currentHeroIndex];
  const featuredBookProgress = bookProgresses.find((progress) => progress.bookId === featuredBook?.id);

  return (
    <div className='min-h-screen bg-[#fdfaf5]'>
      {featuredBook && (
        <HeroSection
          featuredBook={featuredBook}
          progress={featuredBookProgress}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReadMore={handleReadMore}
        />
      )}

      <FeaturedBooksSection books={books} bookProgresses={bookProgresses} onBookClick={handleBookClick} />
    </div>
  );
};

export default HomePage;
