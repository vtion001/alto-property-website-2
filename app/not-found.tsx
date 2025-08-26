'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Go back
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Common pages you might be looking for:</p>
          <div className="mt-2 space-y-1">
            <Link href="/buying" className="block text-blue-600 hover:underline">Buying Services</Link>
            <Link href="/selling" className="block text-blue-600 hover:underline">Selling Services</Link>
            <Link href="/contact" className="block text-blue-600 hover:underline">Contact Us</Link>
            <Link href="/team" className="block text-blue-600 hover:underline">Our Team</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
