import { NextResponse } from 'next/server';
import { listTemplates } from '@/lib/templates';

export async function GET() {
  const templates = await listTemplates();
  return NextResponse.json({ templates });
}
