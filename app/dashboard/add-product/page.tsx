'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category', form.category);
    if (form.image) data.append('image', form.image);

    const res = await fetch('/api/products', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      router.push('/storefront');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">➕ Add Product</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <input
          name="title"
          placeholder="Product Title"
          className="w-full p-3 rounded bg-slate-800 text-white border border-gray-600"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          className="w-full p-3 rounded bg-slate-800 text-white border border-gray-600"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="w-full p-3 rounded bg-slate-800 text-white border border-gray-600"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full p-3 rounded bg-slate-800 text-white border border-gray-600"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 rounded bg-slate-800 text-white border border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
