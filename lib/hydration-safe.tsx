'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to safely handle client-side only values without hydration mismatches
 * @param defaultValue - The value to use during SSR
 * @param clientValue - The value to use on the client
 * @returns The current value (default during SSR, client value after hydration)
 */
export function useHydrationSafe<T>(
  defaultValue: T,
  clientValue: T
): T {
  const [value, setValue] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setValue(clientValue);
  }, [clientValue]);

  return isHydrated ? clientValue : defaultValue;
}

/**
 * Hook to safely get the current year without hydration mismatches
 * @returns The current year as a string
 */
export function useCurrentYear(): string {
  return useHydrationSafe('', new Date().getFullYear().toString());
}

/**
 * Hook to safely get window dimensions without hydration mismatches
 * @returns Object with width and height
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return isHydrated ? dimensions : { width: 0, height: 0 };
}

/**
 * Hook to safely check if we're on the client side
 * @returns Boolean indicating if we're on the client
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Component to safely render content only on the client side
 * @param children - Content to render on the client
 * @param fallback - Content to render during SSR (optional)
 */
export function ClientOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}) {
  const isClient = useIsClient();
  
  if (!isClient) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}
