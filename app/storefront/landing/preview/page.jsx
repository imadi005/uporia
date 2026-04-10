'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PreviewLandingPage() {
  const params = useSearchParams();
  const id = params.get('id'); // e.g., "Accelerate"

  const [valid, setValid] = useState(false);

  // ✅ Capitalized names (used in folder preview), lowercase used for zip
  const allowedTemplates = [
    'Accelerate',
    'Luxe',
    'Glory',
    'Bold',
    'Clean',
    'Matrix',
    'Storyline',
    'Flash',
    'Zenith',
  ];

  useEffect(() => {
    if (id && allowedTemplates.includes(id)) {
      setValid(true);
    }
  }, [id]);

  if (!valid) {
    return (
      <div className="h-screen bg-black flex justify-center items-center text-white text-xl">
        ❌ Invalid landing page: <span className="text-red-400 ml-2">{id}</span>
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
        <a
          href={`/landing/${id.toLowerCase()}.zip`} // ✅ force lowercase for zip file
          download
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm transition shadow-lg"
        >
          📥 Use this Template
        </a>
      </div>

      {/* 🖥️ Iframe Preview */}
      <iframe
        src={`/landing/${id}/index.html`}
        className="w-full h-full mt-16"
        frameBorder="0"
        title={`Template Preview - ${id}`}
      ></iframe>
    </div>
  );
}
