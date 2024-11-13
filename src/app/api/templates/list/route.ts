import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  let logs = '';

  try {
    const templatesDir = './data/coolify/templates';
    
    // Log the directory path
    logs += `Checking directory: ${templatesDir}\n`;
    
    // Check if directory exists, if not return empty array
    try {
      await fs.access(templatesDir);
      logs += `Directory exists: ${templatesDir}\n`;
    } catch (error) {
      logs += `Directory does not exist: ${templatesDir}, ${error}\n`;
      return NextResponse.json({ templates: [], logs });
    }
    
    // Read the directory contents
    const templates = await fs.readdir(templatesDir);
    logs += `Templates found: ${templates}\n`;
    
    // Log details of each item in the templates directory
    for (const template of templates) {
      const templatePath = path.join(templatesDir, template);
      const templateStats = await fs.stat(templatePath);
      logs += `Template: ${template}, Type: ${templateStats.isDirectory() ? 'Directory' : 'File'}\n`;
    }

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
