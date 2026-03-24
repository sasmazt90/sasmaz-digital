import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, ReactNode } from 'react';

interface HorizontalSliderProps {
  children: ReactNode[];
  title?: string;
  subtitle?: string;
}

export default function HorizontalSlider({ children, title, subtitle }: HorizontalSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">{title}</h3>}
          {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>}
        </div>
      )}

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-blue-600 dark:bg-blue-500 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all border-2 border-blue-700 dark:border-blue-400"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-white" strokeWidth={3} />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children.map((child, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              {child}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-blue-600 dark:bg-blue-500 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all border-2 border-blue-700 dark:border-blue-400"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-white" strokeWidth={3} />
          </button>
        )}
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
