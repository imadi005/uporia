'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Template data
const templates = [
  {
    id: 'accelerate',
    name: 'Accelerate',
    description: 'Drive urgency with countdowns and bonuses.',
    goodFor: ['Coaches', 'Live Launches'],
    features: ['Countdown Timer', 'Bonus Sections', 'Highlight Benefits', 'Simple Layout'],
    image: '/landing/accelerate.jpg',
  },
  {
    id: 'luxe',
    name: 'Luxe',
    description: 'Testimonials and demo video focused layout.',
    goodFor: ['Experts', 'Webinars'],
    features: ['Video Block', 'Testimonials', 'Guarantee Seal'],
    image: '/landing/luxe.png',
  },
  {
    id: 'glory',
    name: 'Glory',
    description: 'Perfect for knowledge creators & educators.',
    goodFor: ['Content Creators', 'Educators'],
    features: ['Clean Design', 'Outline Format', 'Content Blocks'],
    image: '/landing/glory.png',
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    description: 'Make a bold first impression with visuals.',
    goodFor: ['Marketers', 'Sales Pages'],
    features: ['Large Visual Banner', 'Striking CTA'],
    image: '/landing/bold.png',
  },
  {
    id: 'clean',
    name: 'Clean Slate',
    description: 'Minimalist style with powerful CTA focus.',
    goodFor: ['Minimalist Brands', 'Product Pages'],
    features: ['Clean Design', 'Hero CTA', 'Subtle Animations'],
    image: '/landing/clean.png',
  },
  {
    id: 'matrix',
    name: 'Matrix Grid',
    description: 'Dynamic grid layout with modern animations.',
    goodFor: ['Tech Brands', 'Portfolio'],
    features: ['Grid Design', 'CSS Animation'],
    image: '/landing/matrix.png',
  },
  {
    id: 'storyline',
    name: 'Storyline',
    description: 'Guide users through visual storytelling.',
    goodFor: ['Coaches', 'Storytelling Brands'],
    features: ['Steps Layout', 'Story Flow'],
    image: '/landing/storyline.png',
  },
  {
    id: 'flash',
    name: 'Flash Sale',
    description: 'Perfect for urgent marketing pushes.',
    goodFor: ['Flash Offers', 'One-day Sale'],
    features: ['Timer', 'Flash Deals Section'],
    image: '/landing/flash.png',
  },
  {
    id: 'zenith',
    name: 'Zenith',
    description: 'Sleek and calm layout for wellness brands.',
    goodFor: ['Wellness Coaches', 'Mindfulness Pages'],
    features: ['Smooth UI', 'Testimonial Focus', 'Simple CTA'],
    image: '/landing/zenith.png',
  },
];

export default function LandingPageSelector() {
  const [selected, setSelected] = useState(templates[0]);
  const router = useRouter();

  const handlePreview = () => {
    const capitalized = capitalize(selected.id);
    router.push(`/storefront/landing/preview?id=${capitalized}`);
  };

  const handleDownload = () => {
    const zipFile = selected.id.toLowerCase(); // Ensures it matches the actual ZIP file name
    window.location.href = `/landing/${zipFile}.zip`;
  };
  

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] text-white overflow-hidden font-sans">
      {/* Grid Section */}
      <div className="w-2/3 p-10 grid grid-cols-3 gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelected(template)}
            className={`bg-[#1c1c1c] border border-gray-700 hover:border-white rounded-lg p-4 cursor-pointer transition-all ${
              selected.id === template.id ? 'ring-1 ring-slate-400' : ''
            }`}
          >
            <Image
              src={template.image}
              alt={template.name}
              width={300}
              height={200}
              className="rounded-md w-full h-40 object-cover"
              unoptimized
            />
            <h3 className="mt-3 text-lg font-semibold">{template.name}</h3>
            <p className="text-sm text-gray-400">{template.description}</p>
          </div>
        ))}
      </div>

      {/* Details Panel */}
      <div className="w-1/3 p-8 border-l border-gray-800 bg-black/80 backdrop-blur-md flex flex-col">
        <h3 className="text-2xl font-semibold mb-6">{selected.name}</h3>

        <div className="rounded overflow-hidden border border-gray-700 mb-4">
          <Image
            src={selected.image}
            alt={selected.name}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
            unoptimized
          />
        </div>

        <p className="text-sm text-gray-400 mb-6">{selected.description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Good For</h4>
          <ul className="space-y-1 text-sm">
            {selected.goodFor.map((item) => (
              <li key={item} className="text-gray-300 before:content-['✔'] before:mr-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Features</h4>
          <ul className="space-y-1 text-sm">
            {selected.features.map((feature) => (
              <li key={feature} className="text-green-400 before:content-['✓'] before:mr-2">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex gap-4">
          <button
            onClick={handlePreview}
            className="bg-white text-black px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
          >
            Preview
          </button>
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-4 py-2 rounded-md text-sm hover:from-gray-600 hover:to-gray-400 transition"
          >
            Use this Template
          </button>
        </div>
      </div>
    </div>
  );
}
