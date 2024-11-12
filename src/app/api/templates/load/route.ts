import { NextRequest, NextResponse } from 'next/server';
import { loadTemplate } from '@/lib/templates';

export async function POST(req: NextRequest) {
  const { filename } = await req.json();
  if (!filename) {
    return NextResponse.json({ error: 'Имя файла не предоставлено' }, { status: 400 });
  }
  const content = await loadTemplate(filename);

  if (content) {
    return NextResponse.json({ content });
  } else {
    return NextResponse.json({ error: 'Шаблон не найден' }, { status: 404 });
  }
}
