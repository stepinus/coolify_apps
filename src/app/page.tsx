'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TemplateForm from './components/TemplateForm';

interface MetaData { 
  content: string;
  documentation: string;
  slogan: string;
  tags: string;
  logo: string | ArrayBuffer | null;
  port: number;
} 

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [templates, setTemplates] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templateContent, setTemplateContent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [metadata, setMetadata] = useState<MetaData>({
    content: '',
    documentation: '',
    slogan: '',
    tags: '',
    logo: null,
    port: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    } else if (session) {
      fetchTemplates();
    }
  }, [session, status, router]);

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

  // const searchTemplates = async (term: string) => {
  //   try {
  //     const response = await axios.get(`/api/templates/search?term=${term}`);
  //     setTemplates(response.data.templates);
  //   } catch (error) {
  //     console.error('Ошибка при поиске шаблонов:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (searchTerm) {
  //     // searchTemplates(searchTerm);
  //   } else {
  //     fetchTemplates();
  //   }
  // }, [searchTerm]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {session ? (
        <>
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
              {templates.map(template => (
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
        </>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
};
