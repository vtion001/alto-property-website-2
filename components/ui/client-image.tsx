'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ClientImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function ClientImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false 
}: ClientImageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <div 
        className={`${className} bg-gray-200 animate-pulse`}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          minHeight: `${height}px`
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
