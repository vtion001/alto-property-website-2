'use client';

import { useState } from 'react';
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RSSyncButton } from "@/components/rss-sync-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BlogAdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '/placeholder.svg?height=300&width=400',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Blog post created successfully!');
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          category: '',
          image: '/placeholder.svg?height=300&width=400',
        });
      } else {
        setMessage('Failed to create blog post. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16">
        <div className="container max-w-4xl space-y-8">
          {/* RSS Sync Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-light text-brown-800">
                RSS Feed Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RSSyncButton />
            </CardContent>
          </Card>

          {/* Create Blog Post Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-light text-brown-800">
                Create New Blog Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Author name"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                        <SelectItem value="Investment Tips">Investment Tips</SelectItem>
                        <SelectItem value="Property Tips">Property Tips</SelectItem>
                        <SelectItem value="Selling Guide">Selling Guide</SelectItem>
                        <SelectItem value="Buying Guide">Buying Guide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="Image URL"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Full blog post content"
                    rows={10}
                    required
                  />
                </div>

                {message && (
                  <div className={`p-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-brown-900 hover:bg-brown-800"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Blog Post'}
                  </Button>

                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => window.location.href = '/blog'}
                  >
                    Back to Blog
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}