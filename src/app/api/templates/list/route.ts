import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET() {
  let logs = '';

  try {
    const templatesDir = 'templates';
    
    // Log the directory path    

    
    // Check if directory exists, if not return empty array
    try {
      await fs.access(templatesDir);
      logs += `Directory exists: ${templatesDir}\n`;
    } catch (error) {
      logs += `Directory does not exist: ${templatesDir}, ${error}\n`;
      return NextResponse.json({ templates: [], logs });
    }
    
    const templates = await fs.readdir(templatesDir);
    logs += `Templates found: ${templates}\n`;
    

    // Check if directory is empty
    if (templates.length === 0) {
      logs += `Directory is empty: ${templatesDir}\n`;
      return NextResponse.json({ templates: [], logs });
    }

    return NextResponse.json({ templates, logs });
  } catch (error) {
    logs += `Error reading templates: ${error}\n`;
    return NextResponse.json({ templates: [], logs }, { status: 500 });
  }
}
