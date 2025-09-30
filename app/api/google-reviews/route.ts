import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, handleSupabaseError } from '@/lib/supabase-server';

export const runtime = 'edge';

// GET all reviews
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('google_reviews')
      .select('*')
      .order('review_date', { ascending: false });
    
    if (error) {
      const errorResponse = handleSupabaseError(error, 'GET google_reviews');
      return NextResponse.json(errorResponse, { 
        status: errorResponse.code === 'PERMISSION_DENIED' ? 403 : 500 
      });
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('❌ Unexpected error in GET google_reviews:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}

// POST a new review
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    
    const { reviewer_name, rating, comment, review_date, review_url } = await request.json();
    
    const { data, error } = await (supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from('google_reviews') as any)
      .insert([{ reviewer_name, rating, comment, review_date, review_url }])
      .select();
    
    if (error) {
      const errorResponse = handleSupabaseError(error, 'POST google_reviews');
      return NextResponse.json(errorResponse, { 
        status: errorResponse.code === 'PERMISSION_DENIED' ? 403 : 500 
      });
    }
    
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('❌ Unexpected error in POST google_reviews:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}
