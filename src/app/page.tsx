'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import TemplateForm from './components/TemplateForm';

export default function Home() {
  const { data: session } = useSession();
  const [templates, setTemplates] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templateContent, setTemplateContent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (session) {
      fetchTemplates();
    } else {
      signIn();
    }
  }, [session]);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/api/templates/list');
      setTemplates(response.data.templates);
    } catch (error) {
      console.error('Ошибка при получении шаблонов:', error);
    }
  };

  const handleLoadTemplate = async (template: string) => {
    try {
      const response = await axios.post('/api/templates/load', { filename: template });
      setSelectedTemplate(template);
      setTemplateContent(response.data.content);
      setMetadata(response.data.metadata); // Добавлено для загрузки метаданных
    } catch (error) {
      console.error('Ошибка при загрузке шаблона:', error);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      if (!selectedTemplate) {
        alert('Выберите шаблон для сохранения.');
        return;
      }
      await axios.post('/api/templates/save', { filename: selectedTemplate, content: templateContent });
      alert('Шаблон успешно сохранен.');
      fetchTemplates();
    } catch (error) {
      console.error('Ошибка при сохранении шаблона:', error);
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Левая колонка */}
      <div className="w-1/3 p-4 border-r">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск шаблонов"
          className="w-full p-2 border mb-4"
        />
        <ul>
          {filteredTemplates.map(template => (
            <li
              key={template}
              onClick={() => handleLoadTemplate(template)}
              className={`p-2 cursor-pointer ${template === selectedTemplate ? 'bg-gray-200' : ''}`}
            >
              {template}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Правая колонка */}
      <div className="w-2/3 p-4">
        <TemplateForm 
          metadata={metadata} 
          setMetadata={setMetadata} 
          handleSaveTemplate={handleSaveTemplate} 
        />
      </div>
    </div>
  );
}
          className="w-full p-2 border mb-4"        />        <button          onClick={handleSaveTemplate}          className="mt-4 bg-blue-500 text-white p-2 rounded"        >          Сохранить        </button>      </div>    </div>  );
}
