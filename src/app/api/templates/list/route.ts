import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  let logs = '';

  try {
    const templatesDir = '/data/coolify/templates';
    
    // Log the directory path
    logs += `Checking directory: ${templatesDir}\n`;
    
    // Log the current directory contents
    const currentDir = process.cwd();
    try {
      const currentDirContents = await fs.readdir(currentDir);
      logs += `Current directory (${currentDir}) contents: ${currentDirContents}\n`;
      const upperdir = await fs.readdir('../currentDir');
      logs += `upperDir contents: ${upperdir}\n`;      
      // Log details of each item in the current directory
      // for (const item of currentDirContents) {
      //   const itemPath = path.join(currentDir, item);
      //   const itemStats = await fs.stat(itemPath);
      //   logs += `Item: ${item}, Type: ${itemStats.isDirectory() ? 'Directory' : 'File'}\n`;
      // }
    } catch (error) {
      logs += `Error reading current directory (${currentDir}) contents: ${error}\n`;
    }
    
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
