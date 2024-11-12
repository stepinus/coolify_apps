import fs from 'fs/promises';
import path from 'path';

const TEMPLATES_DIR = '/data/coolify/templates';

export async function listTemplates() {
  try {
    const files = await fs.readdir(TEMPLATES_DIR);
    return files.filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Ошибка при получении списка шаблонов:', error);
    return [];
  }
}

export async function loadTemplate(filename: string) {
  try {
    const filePath = path.join(TEMPLATES_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Ошибка при загрузке шаблона:', error);
    return null;
  }
}

export async function saveTemplate(filename: string, content: string) {
  try {
    const filePath = path.join(TEMPLATES_DIR, filename);
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении шаблона:', error);
    return false;
  }
}
