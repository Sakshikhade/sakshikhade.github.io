import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationProps {
  onNext: () => void;
  onPrev: () => void;
  isTransitioning: boolean;
  isEnabled: boolean;
}

export const useScrollAnimation = ({ onNext, onPrev, isTransitioning, isEnabled }: UseScrollAnimationProps) => {
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isEnabled) return;
    
    let isScrolling = false;
    let scrollDirection = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown') {
        onNext();
      } else if (e.key === 'ArrowUp') {
        onPrev();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isTransitioning || isScrolling) return;
      
      // Only respond to significant scroll movements
      if (Math.abs(e.deltaY) < 10) return;
      
      // Determine scroll direction
      const newScrollDirection = e.deltaY > 0 ? 1 : -1;
      
      // If we're already processing a scroll in the same direction, ignore
      if (isScrolling && scrollDirection === newScrollDirection) return;
      
      // Set scrolling state
      isScrolling = true;
      scrollDirection = newScrollDirection;
      
      if (e.deltaY > 0) {
        onNext();
      } else {
        onPrev();
      }
      
      // Reset scrolling state after a delay
      setTimeout(() => {
        isScrolling = false;
        scrollDirection = 0;
      }, 500);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.targetTouches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.targetTouches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!touchStartY.current || !touchEndY.current || isTransitioning) return;
      
      const distance = touchStartY.current - touchEndY.current;
      const isSwipe = Math.abs(distance) > minSwipeDistance;
      
      if (isSwipe) {
        if (distance > 0) {
          // Swipe up - next section
          onNext();
        } else {
          // Swipe down - previous section
          onPrev();
        }
      }
      
      // Reset touch values
      touchStartY.current = null;
      touchEndY.current = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onNext, onPrev, isTransitioning, isEnabled]);
};

export const useTitleAnimation = (margin: string = "-50px") => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: margin as any,
    amount: 0.3
  });

  return { ref, isInView };
};
