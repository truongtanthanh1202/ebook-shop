import React from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { TOOLTIPS, PDF_SETTINGS } from '../constants';

interface ControlBarProps {
  currentPage: number;
  totalPages: number;
  scale: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onScaleChange: (scale: number) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  currentPage,
  totalPages,
  scale,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onScaleChange,
}) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const canZoomIn = scale < PDF_SETTINGS.maxScale;
  const canZoomOut = scale > PDF_SETTINGS.minScale;

  const handleScaleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(event.target.value);
    onScaleChange(newScale);
  };

  return (
    <div className='sticky bottom-0 z-10 bg-[#fdfaf5]/80 backdrop-blur-sm border-t border-gray-200/50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
          {/* Navigation Controls */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={onPrevPage}
              disabled={!canGoPrev}
              className={`rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 w-10 h-10 flex items-center justify-center ${
                !canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title={TOOLTIPS.PREV_PAGE}
            >
              <ChevronLeft className='h-5 w-5' />
            </button>

            <span className='font-sans text-sm text-gray-600 min-w-20 text-center'>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={onNextPage}
              disabled={!canGoNext}
              className={`rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 w-10 h-10 flex items-center justify-center ${
                !canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title={TOOLTIPS.NEXT_PAGE}
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={onZoomOut}
              disabled={!canZoomOut}
              className={`rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 w-8 h-8 flex items-center justify-center ${
                !canZoomOut ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title={TOOLTIPS.ZOOM_OUT}
            >
              <Minus className='h-4 w-4' />
            </button>

            {/* Zoom Slider */}
            <div className='flex items-center space-x-2'>
              <input
                type='range'
                min={PDF_SETTINGS.minScale}
                max={PDF_SETTINGS.maxScale}
                step={PDF_SETTINGS.scaleStep}
                value={scale}
                onChange={handleScaleSliderChange}
                className='w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                style={{
                  background:
                    'linear-gradient(to right, #fb923c 0%, #fb923c ' +
                    ((scale - PDF_SETTINGS.minScale) / (PDF_SETTINGS.maxScale - PDF_SETTINGS.minScale)) *
                      100 +
                    '%, #e5e7eb ' +
                    ((scale - PDF_SETTINGS.minScale) / (PDF_SETTINGS.maxScale - PDF_SETTINGS.minScale)) *
                      100 +
                    '%, #e5e7eb 100%)',
                }}
              />
            </div>

            <button
              onClick={onZoomIn}
              disabled={!canZoomIn}
              className={`rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 w-8 h-8 flex items-center justify-center ${
                !canZoomIn ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title={TOOLTIPS.ZOOM_IN}
            >
              <Plus className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
