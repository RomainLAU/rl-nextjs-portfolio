import { createContext, useState, useContext, ReactNode } from 'react';

export const TransitionContext = createContext<{
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
}>({
  isTransitioning: true,
  setIsTransitioning: () => {},
});

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionState = () => useContext(TransitionContext);
