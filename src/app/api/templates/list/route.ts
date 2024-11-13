import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET() {
  try {
    const templatesDir = '/data/coolify/templates';
    
    // Log the directory path
    console.log(`Checking directory: ${templatesDir}`);
    
    // Log the current directory contents
    const currentDir = process.cwd();
    try {
      const currentDirContents = await fs.readdir(currentDir);
      console.log(`Current directory (${currentDir}) contents: ${currentDirContents}`);
    } catch (error) {
      console.error(`Error reading current directory (${currentDir}) contents:`, error);
    }
    
    // Check if directory exists, if not return empty array
    try {
      await fs.access(templatesDir);
      console.log(`Directory exists: ${templatesDir}`);
    } catch (error) {
      console.error(`Directory does not exist: ${templatesDir}`, error);
      return NextResponse.json({ templates: [] });
    }
    
    const templates = await fs.readdir(templatesDir);
    console.log(`Templates found: ${templates}`);

    // Check if directory is empty
    if (templates.length === 0) {
      console.log(`Directory is empty: ${templatesDir}`);
      return NextResponse.json({ templates: [] });
    }

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error reading templates:', error);
    return NextResponse.json({ templates: [] }, { status: 500 });
  }
}
