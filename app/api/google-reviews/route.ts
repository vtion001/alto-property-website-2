import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export const runtime = 'edge';

// GET all reviews
export async function GET() {
  const supabase = getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('google_reviews')
    .select('*')
    .order('review_date', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data || []);
}

// POST a new review
export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  
  const { reviewer_name, rating, comment, review_date, review_url } = await request.json();
  
  const { data, error } = await supabase
    .from('google_reviews')
    .insert([{ reviewer_name, rating, comment, review_date, review_url }])
    .select();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data[0], { status: 201 });
}
