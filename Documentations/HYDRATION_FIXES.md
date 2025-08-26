# Hydration Mismatch Fixes Documentation

## Overview

This document describes the hydration mismatch errors that were identified and fixed in the Alto Property Group website, along with best practices to prevent future issues.

## What is Hydration Mismatch?

Hydration mismatch occurs when the server-rendered HTML doesn't match the client-rendered HTML. This happens when:
- Components render different content on the server vs. client
- Dynamic values (like dates, random numbers) are calculated during rendering
- Client-side only APIs (like `window`, `document`) are accessed during SSR
- Browser extensions modify the DOM

## Issues Identified and Fixed

### 1. Image Component Hydration Mismatch

**Problem**: Next.js Image component was adding client-side attributes (`data-first-enter-image="true"`) that weren't present during server rendering.

**Location**: `app/buying/buyers-agent-services/page.tsx`

**Solution**: Created a `ClientImage` component that renders a placeholder during SSR and the actual image on the client.

```typescript
// components/ui/client-image.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ClientImage({ src, alt, width, height, className, priority = false }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return placeholder during SSR
    return (
      <div 
        className={`${className} bg-gray-200 animate-pulse`}
        style={{ width: `${width}px`, height: `${height}px` }}
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
```

### 2. Dynamic Date Hydration Mismatch

**Problem**: `new Date().getFullYear()` was being calculated during rendering, causing different values on server vs. client.

**Location**: Multiple files with footer copyright notices

**Solution**: Created a `useCurrentYear` hook that safely handles the year display.

```typescript
// lib/hydration-safe.tsx
export function useCurrentYear(): string {
  return useHydrationSafe('', new Date().getFullYear().toString());
}

// components/ui/footer.tsx
export default function Footer({ companyName = "Alto Property Group" }) {
  const year = useCurrentYear();
  
  return (
    <footer className="bg-brown-900 text-cream py-16">
      <div className="container">
        <div className="text-center">
          <p>© {year} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

## Utility Functions Created

### 1. `useHydrationSafe<T>`

Safely handles client-side values without hydration mismatches.

```typescript
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
```

### 2. `useCurrentYear`

Safely gets the current year without hydration issues.

```typescript
export function useCurrentYear(): string {
  return useHydrationSafe('', new Date().getFullYear().toString());
}
```

### 3. `useWindowDimensions`

Safely gets window dimensions without hydration issues.

```typescript
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
```

### 4. `ClientOnly`

Component that renders content only on the client side.

```typescript
export function ClientOnly({ children, fallback = null }) {
  const isClient = useIsClient();
  
  if (!isClient) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}
```

## Best Practices to Prevent Hydration Issues

### 1. Avoid Dynamic Values During Rendering

**❌ Don't do this:**
```typescript
function MyComponent() {
  return <div>Current time: {new Date().toISOString()}</div>;
}
```

**✅ Do this instead:**
```typescript
function MyComponent() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);
  
  return <div>Current time: {time}</div>;
}
```

### 2. Use Client Components for Dynamic Content

**❌ Don't do this:**
```typescript
// Server component
function ServerComponent() {
  const randomValue = Math.random(); // Different on server vs client
  return <div>{randomValue}</div>;
}
```

**✅ Do this instead:**
```typescript
'use client';

function ClientComponent() {
  const [randomValue, setRandomValue] = useState(0);
  
  useEffect(() => {
    setRandomValue(Math.random());
  }, []);
  
  return <div>{randomValue}</div>;
}
```

### 3. Handle Browser APIs Safely

**❌ Don't do this:**
```typescript
function MyComponent() {
  const width = window.innerWidth; // Error during SSR
  return <div>Width: {width}</div>;
}
```

**✅ Do this instead:**
```typescript
function MyComponent() {
  const { width } = useWindowDimensions();
  return <div>Width: {width}</div>;
}
```

### 4. Use Consistent Data Fetching

**❌ Don't do this:**
```typescript
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <div>{data.content}</div>;
}
```

**✅ Do this instead:**
```typescript
// Use getServerSideProps or getStaticProps
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

function MyComponent({ data }) {
  return <div>{data.content}</div>;
}
```

## Common Hydration Issues and Solutions

### 1. Date and Time Display

**Issue**: Server and client render different times
**Solution**: Use `useCurrentYear()` or similar hooks

### 2. Random Values

**Issue**: Server and client generate different random numbers
**Solution**: Generate on client side only or use consistent seeds

### 3. Browser Detection

**Issue**: Server doesn't know browser capabilities
**Solution**: Use `useIsClient()` hook and render fallbacks

### 4. Image Loading

**Issue**: Next.js Image adds client attributes
**Solution**: Use `ClientImage` component for problematic images

### 5. Local Storage

**Issue**: Server can't access localStorage
**Solution**: Use `useEffect` to read localStorage on client

## Testing for Hydration Issues

### 1. Development Mode

Hydration warnings appear in the console during development.

### 2. Production Build

Run `npm run build` to catch hydration issues during build.

### 3. Browser Testing

- Test in incognito mode to rule out extensions
- Check different browsers
- Test on mobile devices

### 4. Console Monitoring

Look for these warning patterns:
```
Warning: Text content did not match. Server: "2024" Client: "2025"
Warning: Expected server HTML to contain a matching <div> in <Component>
```

## Performance Considerations

### 1. Minimize Client Components

Only use `'use client'` when necessary to avoid unnecessary JavaScript bundles.

### 2. Lazy Loading

Use dynamic imports for components that might cause hydration issues:

```typescript
const ClientOnlyComponent = dynamic(() => import('./ClientOnlyComponent'), {
  ssr: false
});
```

### 3. Placeholder Optimization

Ensure placeholders have the same dimensions as final content to prevent layout shifts.

## Monitoring and Maintenance

### 1. Regular Testing

- Test all pages after updates
- Monitor console for hydration warnings
- Use automated testing tools

### 2. Code Review

- Review new components for potential hydration issues
- Check for dynamic values in render functions
- Ensure proper client/server component separation

### 3. Performance Monitoring

- Monitor Core Web Vitals
- Check for layout shifts
- Monitor JavaScript bundle sizes

## Conclusion

Hydration mismatches can significantly impact user experience and SEO. By following these best practices and using the utility functions provided, you can prevent most hydration issues and ensure consistent rendering between server and client.

Remember:
- Always test in both development and production modes
- Use the provided utility functions for common patterns
- Keep client components minimal and focused
- Monitor for warnings and errors regularly

For questions or additional support, refer to the main project documentation or contact the development team.
