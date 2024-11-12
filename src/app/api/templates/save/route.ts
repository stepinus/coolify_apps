import { NextRequest, NextResponse } from 'next/server';
import { saveTemplate } from '@/lib/templates';

export async function POST(req: NextRequest) {
  const { filename, content } = await req.json();
  if (!filename || !content) {
    return NextResponse.json({ error: 'Имя файла или содержимое отсутствуют' }, { status: 400 });
  }
  const success = await saveTemplate(filename, content);

  if (success) {
    return NextResponse.json({ message: 'Шаблон сохранен' });
  } else {
    return NextResponse.json({ error: 'Не удалось сохранить шаблон' }, { status: 500 });
  }
}
