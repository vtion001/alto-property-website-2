'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, Star } from 'lucide-react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import Footer from '@/components/ui/footer'

interface GoogleReview {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  review_date: string;
  review_url: string;
}

export default function GoogleReviewsIntegration() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReview, setEditingReview] = useState<GoogleReview | null>(null);
  const [syncing, setSyncing] = useState(false);
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [accounts, setAccounts] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('')
  const [formData, setFormData] = useState({
    reviewer_name: '',
    rating: 5,
    comment: '',
    review_date: new Date().toISOString().split('T')[0],
    review_url: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/google-reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    setLoading(false);
  };
  const loadAccounts = async () => {
    try {
      const res = await fetch('/api/google-reviews/accounts')
      const json = await res.json()
      if (json?.ok) setAccounts(json.data?.accounts || json.data?.accountSummaries || [])
      else alert(json?.error || 'Failed to fetch accounts')
    } catch {}
  }
  const loadLocations = async (accountId: string) => {
    try {
      const res = await fetch(`/api/google-reviews/accounts/${encodeURIComponent(accountId)}/locations`)
      const json = await res.json()
      if (json?.ok) setLocations(json.data?.locations || [])
      else alert(json?.error || 'Failed to fetch locations')
    } catch {}
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      const res = await fetch('/api/google-reviews/sync', { method: 'POST' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(`Sync failed: ${json?.error || res.statusText}`)
      } else {
        await fetchReviews()
        alert(`Imported ${json?.imported ?? 0} reviews from Google.`)
      }
    } catch (e: any) {
      alert(`Sync error: ${e?.message || String(e)}`)
    } finally {
      setSyncing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingReview) {
        await fetch(`/api/google-reviews/${editingReview.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setEditingReview(null);
      } else {
        await fetch('/api/google-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setFormData({
        reviewer_name: '',
        rating: 5,
        comment: '',
        review_date: new Date().toISOString().split('T')[0],
        review_url: ''
      });
      setShowAddForm(false);
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/google-reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navigation />
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-light text-brown-900">Google Reviews Integration</h1>
                <p className="text-brown-600 mt-2">Manage customer reviews from Google Business</p>
                {params?.get('oauth') === 'success' && (
                  <p className="text-green-700 mt-2">Google connected successfully. You can now import reviews.</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Link href="/admin/integrations/google-reviews/oauth" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Connect Google
                </Link>
                <Button onClick={handleSync} disabled={syncing} className="bg-brown-800 hover:bg-brown-900">
                  {syncing ? 'Importing…' : 'Import Reviews'}
                </Button>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-brown-800 hover:bg-brown-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {showAddForm ? 'Cancel' : 'Add Review'}
                </Button>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-brown-900">Find Your Google Account & Location IDs</CardTitle>
                <CardDescription className="text-brown-600">Use these helpers after connecting Google to discover IDs for env vars.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 flex-wrap items-center">
                  <Button onClick={loadAccounts} variant="outline" className="border-brown-300 text-brown-800">List Accounts</Button>
                  <Select onValueChange={(val) => { setSelectedAccount(val); loadLocations(val) }}>
                    <SelectTrigger className="w-80"><SelectValue placeholder="Select Account" /></SelectTrigger>
                    <SelectContent>
                      {accounts.map((a: any) => (
                        <SelectItem key={a.name || a.accountName} value={(a.name || a.accountName || '').replace('accounts/', '')}>
                          {(a.accountName || a.name || '').toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-96"><SelectValue placeholder="Select Location" /></SelectTrigger>
                    <SelectContent>
                      {locations.map((l: any) => (
                        <SelectItem key={l.name} value={(l.name || '').replace(/^accounts\/[^/]+\//, '')}>
                          {(l.locationName || l.title || l.name || '').toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-brown-600">Set <code>GOOGLE_ACCOUNT_ID</code> and <code>GOOGLE_LOCATION_ID</code> in your env once selected, then restart.</p>
              </CardContent>
            </Card>

      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-brown-900">Add New Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reviewer_name" className="text-brown-800">Reviewer Name</Label>
                  <Input
                    id="reviewer_name"
                    name="reviewer_name"
                    value={formData.reviewer_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviewer_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating" className="text-brown-800">Rating</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Star{rating !== 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="comment" className="text-brown-800">Comment</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  rows={3}
                  required
                />
              </div>
              <Button type="submit" className="bg-brown-800 hover:bg-brown-900">
                Add Review
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-brown-900">Google Reviews</CardTitle>
          <CardDescription className="text-brown-600">Sync latest Google Business reviews into your site’s database.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-brown-600">Loading reviews...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-brown-700">Reviewer</TableHead>
                  <TableHead className="text-brown-700">Rating</TableHead>
                  <TableHead className="text-brown-700">Comment</TableHead>
                  <TableHead className="text-brown-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium text-brown-900">{review.reviewer_name}</TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-xs truncate text-brown-700">{review.comment}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-brown-600">Reviews are shown on the Buyer’s Agent Services page.</div>
            <Link href="/admin/integrations/google-reviews/oauth" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto">
              Sync Now
            </Link>
          </div>
        </CardContent>
      </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
