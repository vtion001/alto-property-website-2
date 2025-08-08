import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, BlogPost } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';

    console.error('Blog API error:', {
      message: errorMessage,
      stack: errorStack,
      error: error
    });

    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Generate slug from title if not provided
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost = createPost({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author,
      category: data.category,
      image: data.image || '/placeholder.svg?height=300&width=400',
      published: data.published ?? true,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 400 }
    );
  }
}