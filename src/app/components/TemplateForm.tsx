import React from 'react';

const TemplateForm = ({ metadata, setMetadata, handleSaveTemplate }) => {
  return (
    <div className="w-2/3 p-4">
      <textarea
        value={metadata.content}
        onChange={(e) => setMetadata({ ...metadata, content: e.target.value })}
        className="w-full h-5/6 p-2 border"
        placeholder="Редактирование шаблона..."
      ></textarea>
      <input
        type="text"
        value={metadata.documentation}
        onChange={(e) => setMetadata({ ...metadata, documentation: e.target.value })}
        placeholder="Документация"
        className="w-full p-2 border mb-2"
      />
      <input
        type="text"
        value={metadata.slogan}
        onChange={(e) => setMetadata({ ...metadata, slogan: e.target.value })}
        placeholder="Слоган"
        className="w-full p-2 border mb-2"
      />
      <input
        type="text"
        value={metadata.tags}
        onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
        placeholder="Теги (через запятую)"
        className="w-full p-2 border mb-2"
      />
      <input
        type="text"
        value={metadata.logo}
        onChange={(e) => setMetadata({ ...metadata, logo: e.target.value })}
        placeholder="URL логотипа"
        className="w-full p-2 border mb-2"
      />
      {metadata.logo ? (
        <img src={metadata.logo} alt="Logo" className="w-32 h-32 mb-2" />
      ) : (
        <img src="/svgs/placeholder.svg" alt="Placeholder" className="w-32 h-32 mb-2" />
      )}
      <input
        type="number"
        value={metadata.port}
        onChange={(e) => setMetadata({ ...metadata, port: e.target.value })}
        placeholder="Порт"
        className="w-full p-2 border mb-4"
      />
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        onClick={handleSaveTemplate}
      >
        Сохранить
      </button>
    </div>
  );
};

export default TemplateForm;
