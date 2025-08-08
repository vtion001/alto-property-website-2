
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Rss } from 'lucide-react';

export function RSSyncButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/rss/sync', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        // Refresh the page to show new posts
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to sync RSS feeds');
      console.error('RSS sync error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSync}
        disabled={isLoading}
        className="bg-brown-900 hover:bg-brown-800 text-cream"
      >
        {isLoading ? (
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Rss className="h-4 w-4 mr-2" />
        )}
        {isLoading ? 'Syncing RSS Feeds...' : 'Sync RSS Feeds'}
      </Button>
      
      {message && (
        <div className="p-3 rounded-md bg-brown-50 border border-brown-200">
          <p className="text-sm text-brown-800">{message}</p>
        </div>
      )}
      
      <div className="text-xs text-brown-600 space-y-1">
        <p><strong>RSS Sources:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>RealEstate.com.au (2 posts/day)</li>
          <li>Realty.com.au (2 posts/day)</li>
          <li>First National (1 post/day)</li>
          <li>The Real Estate Conversation (2 posts/day)</li>
        </ul>
      </div>
    </div>
  );
}
