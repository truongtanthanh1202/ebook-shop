import * as React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  trackClassName?: string;
  fillClassName?: string;
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, trackClassName, fillClassName, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={`w-full ${className || ''}`} {...props}>
        <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${trackClassName || ''}`}>
          <div
            className={`h-full bg-orange-600 rounded-full transition-all duration-300 ease-out ${fillClassName || ''}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {label && <div className='text-xs text-gray-500 mt-1 text-center'>{label}</div>}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
