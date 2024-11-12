import { NextResponse } from 'next/server';
import fs from 'fs/promises';
// import path from 'path';

export async function GET() {
  try {
    const templatesDir = '/data/coolify/templates';
    
    // Check if directory exists, if not return empty array
    try {
      await fs.access(templatesDir);
    } catch {
      return NextResponse.json({ templates: [] });
    }
    
    const templates = await fs.readdir(templatesDir);
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error reading templates:', error);
    return NextResponse.json({ templates: [] }, { status: 500 });
  }
}
