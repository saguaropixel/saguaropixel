import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('prismic');
  revalidateTag('project_post');
  revalidateTag('home');
  revalidateTag('projects');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
