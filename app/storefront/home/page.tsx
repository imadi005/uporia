'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const templates = [
  {
    id: 'success',
    name: 'Success',
    downloadName: 'Success',
    description: 'High-converting success layout for professionals.',
    goodFor: ['Coaches', 'Consultants', 'Freelancers'],
    features: ['Bold Hero Section', 'Testimonial Carousel', 'Lead Capture Form'],
    image: '/templates/success.png',
  },
  {
    id: 'swift',
    name: 'Swift',
    downloadName: 'Swift',
    description: 'Smooth, modern landing with animated elements.',
    goodFor: ['Yoga & Wellness', 'Fitness Coaches', 'Therapists'],
    features: ['Visual Hero Section', 'Animated Transitions', 'Minimal Layout'],
    image: '/templates/swift.png',
  },
  {
    id: 'growth',
    name: 'Growth',
    downloadName: 'Growth',
    description: 'Professional layout with stock & finance focus.',
    goodFor: ['Stock Traders', 'Finance Experts', 'Crypto Educators'],
    features: ['Market Feed Block', 'Minimalist Style', 'High Performance'],
    image: '/templates/growth.png',
  },
  {
    id: 'blue',
    name: 'Blue Theme',
    downloadName: 'Blue',
    description: 'Professional theme with trust-building layout.',
    goodFor: ['Fitness Trainers', 'Corporate Speakers'],
    features: ['Cover image', 'Intro video', 'Simple navigation'],
    image: '/templates/blue.png',
  },
];

export default function TemplateGalleryPage() {
  const [selected, setSelected] = useState(templates[0]);
  const router = useRouter();

  const handleDownload = () => {
    const zipFile = selected.downloadName.toLowerCase();
    window.location.href = `/landing/${zipFile}.zip`;
  };

  return (
    <div className="flex h-screen w-full font-sans bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] text-white">
      {/* LEFT PANEL */}
      <div className="w-[65%] overflow-y-scroll p-10 space-y-10 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <h2 className="text-3xl font-bold mb-4 text-silver-200 drop-shadow">🚀 Most Popular Templates</h2>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelected(template)}
            className={clsx(
              'rounded-xl p-4 bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] border border-gray-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:border-gray-400 hover:scale-[1.02] hover:backdrop-blur-lg',
              selected.id === template.id && 'ring-1 ring-white/30'
            )}
          >
            <Image
              src={template.image}
              alt={template.name}
              width={1000}
              height={400}
              className="rounded-lg object-cover w-full h-56 shadow-inner"
              unoptimized
            />
            <h3 className="mt-4 font-semibold text-lg text-white">{template.name}</h3>
            <p className="text-sm text-gray-400">{template.description}</p>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[35%] p-8 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] border-l border-gray-800 flex flex-col backdrop-blur-lg shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-silver-100 tracking-wide">🔍 Template Preview</h3>

        <div className="rounded-lg overflow-hidden border border-gray-700 mb-4 shadow-md">
          <Image
            src={selected.image}
            alt="Preview"
            width={800}
            height={300}
            className="w-full h-52 object-cover"
            unoptimized
          />
        </div>

        <h4 className="text-xl font-semibold mb-2">{selected.name}</h4>
        <p className="text-sm text-gray-400 mb-6">{selected.description}</p>

        <div className="mb-6">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Good For</h5>
          <ul className="space-y-1 text-sm text-white/80">
            {selected.goodFor.map((item) => (
              <li key={item} className="before:content-['•'] before:mr-2 text-gray-300">{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Features Include</h5>
          <ul className="space-y-1 text-sm">
            {selected.features.map((item) => (
              <li key={item} className="text-green-400 before:content-['✓'] before:mr-2">{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex gap-4">
          <button
            onClick={() => router.push(`/preview/${selected.id}`)}
            className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-300 transition duration-300 shadow hover:shadow-lg"
          >
            👁️ Preview
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm bg-gradient-to-r from-gray-600 to-gray-400 text-white rounded-md hover:from-gray-500 hover:to-gray-300 transition duration-300 shadow hover:shadow-xl"
          >
            ⬇️ Use this Template
          </button>
        </div>
      </div>
    </div>
  );
}
