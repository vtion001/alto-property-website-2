'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ClientImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

export default function ClientImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
  fill = false
}: ClientImageProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a responsive placeholder during SSR
    return (
      <div 
        className={`${className} bg-gray-200 animate-pulse`}
        style={fill ? undefined : { 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 rounded-lg`}
        onLoadingComplete={() => setIsLoading(false)}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
