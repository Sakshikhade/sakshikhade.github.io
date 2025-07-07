import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (margin: string = "-100px") => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: margin as any,
    amount: 0.1
  });

  return { ref, isInView };
};

export const useTitleAnimation = (margin: string = "-50px") => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: margin as any,
    amount: 0.3
  });

  return { ref, isInView };
};
