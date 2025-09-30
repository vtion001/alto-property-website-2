import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export const runtime = 'edge';

// PUT (update) a review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getSupabaseServerClient();
  
  const { reviewer_name, rating, comment, review_date, review_url } = await request.json();
  
  // Create update object with defined values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {};
  if (reviewer_name !== undefined) updateData.reviewer_name = reviewer_name;
  if (rating !== undefined) updateData.rating = rating;
  if (comment !== undefined) updateData.comment = comment;
  if (review_date !== undefined) updateData.review_date = review_date;
  if (review_url !== undefined) updateData.review_url = review_url;

  const { data, error } = await (supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .from('google_reviews') as any)
    .update(updateData)
    .eq('id', id)
    .select();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data[0]);
}

// DELETE a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getSupabaseServerClient();
  
  const { error } = await supabase
    .from('google_reviews')
    .delete()
    .eq('id', id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}
