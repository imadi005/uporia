'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PreviewPage() {
  const { id } = useParams();
  const [valid, setValid] = useState(false);

  // ✅ Validate if the template ID exists
  const allowedTemplates = ['success', 'swift', 'growth', 'blue'];

  useEffect(() => {
    if (allowedTemplates.includes(id)) {
      setValid(true);
    }
  }, [id]);

  const handleDownloadZip = () => {
    const link = document.createElement('a');
    link.href = `/templates/${id}.zip`; // ✅ Adjust zip path
    link.download = `${id}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!valid) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <h2 className="text-xl font-semibold">🚫 Template not found: {id}</h2>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-hidden">
      {/* 🔳 Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-black/90 text-white z-50 px-6 py-4 flex justify-between items-center border-b border-gray-800 backdrop-blur">
        <h1 className="text-lg font-semibold">
          Previewing Template: <span className="text-purple-400">{id}</span>
        </h1>
        <button
          onClick={handleDownloadZip}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded text-sm transition shadow-lg"
        >
          ⬇️ Use this Template
        </button>
      </div>

      {/* 🖥️ Iframe Preview */}
      <iframe
        src={`/templates/${id}/index.html`}
        className="w-full h-full mt-16"
        frameBorder="0"
        title={`Template Preview - ${id}`}
      ></iframe>
    </div>
  );
}
