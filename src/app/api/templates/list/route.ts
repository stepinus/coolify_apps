import { NextRequest, NextResponse } from 'next/server';
import { listTemplates } from '@/lib/templates';

export async function GET(req: NextRequest) {
  const templates = await listTemplates();
  return NextResponse.json({ templates });
}
