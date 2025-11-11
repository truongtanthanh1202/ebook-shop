import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/shared/components';
import type { Book, BookProgress } from '../types';
import { CONTENT } from '../constants';

interface HeroSectionProps {
  featuredBook: Book;
  progress?: BookProgress;
  onPrevious?: () => void;
  onNext?: () => void;
  onReadMore?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  featuredBook,
  progress,
  onPrevious,
  onNext,
  onReadMore,
}) => {
  return (
    <section className='py-20 px-10'>
      <div className='max-w-7xl mx-auto px-6 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]'>
          {/* Left Col */}
          <div className='space-y-6 lg:pr-8'>
            <h1 className='font-serif font-bold text-5xl lg:text-6xl text-gray-900 leading-tight'>
              {featuredBook.title}
            </h1>

            <p className='font-sans text-lg text-gray-600 leading-relaxed'>by {featuredBook.author}</p>
            <p className='font-sans text-base text-gray-500 leading-relaxed max-w-md'>
              {CONTENT.hero.subtitle}
            </p>

            <Button
              variant='outline'
              className='rounded-full px-8 py-2 border-gray-300 hover:bg-gray-50 transition-colors duration-300 font-medium tracking-wide cursor-pointer'
              onClick={onReadMore}
            >
              {CONTENT.hero.buttonText}
            </Button>
          </div>

          {/* Right Col */}
          <div className='flex flex-col items-center space-y-6'>
            <div className='relative overflow-hidden bg-white rounded-lg shadow-md max-w-xs w-full'>
              <div className='aspect-3/4 w-full'>
                <img
                  src={featuredBook.coverImage}
                  alt={`${featuredBook.title} cover`}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/300/400';
                  }}
                />
              </div>
            </div>

            {progress && (
              <div className='w-full max-w-xs'>
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

        {/* Navigation Arrows */}
        <div className='absolute -left-10 top-1/2 -translate-y-1/2'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full w-12 h-12 border-gray-300 hover:bg-gray-50 transition-colors duration-300'
            onClick={onPrevious}
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
        </div>

        <div className='absolute -right-10 top-1/2 -translate-y-1/2'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full w-12 h-12 border-gray-300 hover:bg-gray-50 transition-colors duration-300'
            onClick={onNext}
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
