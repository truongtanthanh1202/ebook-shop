import { useState, useEffect } from 'react';
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
  onPageChange: (page: number) => void;
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
  onPageChange,
}) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const canZoomIn = scale < PDF_SETTINGS.maxScale;
  const canZoomOut = scale > PDF_SETTINGS.minScale;

  // Update input when currentPage changes externally
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handleScaleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(event.target.value);
    onScaleChange(newScale);
  };

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty input for editing
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pageNum = parseInt(pageInput, 10);

    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      // Reset to current page if invalid
      setPageInput(currentPage.toString());
    }
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInput, 10);

    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      // Reset to current page if invalid
      setPageInput(currentPage.toString());
    } else if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
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

            {/* Page Input */}
            <div className='flex items-center space-x-2'>
              <form onSubmit={handlePageInputSubmit} className='flex items-center'>
                <input
                  type='text'
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onBlur={handlePageInputBlur}
                  className='font-sans text-sm text-center bg-white border border-gray-300 rounded px-2 py-1 w-12 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                  min={1}
                  max={totalPages}
                />
              </form>
              <span className='font-sans text-sm text-gray-600'>/ {totalPages}</span>
            </div>

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
