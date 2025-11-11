import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RouteName } from '@/shared/constants';
import { loadAllReadingProgress } from '@/shared/helpers';
import booksData from '@/assets/data/books.json';
import { HeroSection, FeaturedBooksSection } from '../../components';
import type { Book, BookProgress } from '../../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [bookProgresses, setBookProgresses] = useState<BookProgress[]>([]);

  const books = booksData as Book[];

  // Load current reading progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      const allProgress = loadAllReadingProgress();
      const progressArray: BookProgress[] = Object.values(allProgress).map((progress) => ({
        bookId: progress.bookId,
        currentPage: progress.currentPage,
        totalPages: progress.totalPages,
        progressPercentage: progress.progressPercentage,
      }));
      setBookProgresses(progressArray);
    };

    loadProgress();

    // Listen for storage changes to update progress in real-time
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'ebook_reading_progress') {
        loadProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
