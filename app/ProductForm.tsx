'use client';

import { useState } from 'react';

export default function ProductForm() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...product,
        userId: 'demo-user-id', // 🧠 Replace with actual auth user ID
        price: parseFloat(product.price),
      }),
    });

    if (res.ok) {
      setProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-md text-white space-y-4">
      <h2 className="text-2xl font-bold mb-2 text-center">📝 Add New Product</h2>

      <input
        name="title"
        placeholder="Product Title"
        value={product.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white placeholder-gray-400"
      />

      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white placeholder-gray-400"
        rows={3}
      />

      <input
        name="price"
        type="number"
        placeholder="Price (e.g. 199)"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white placeholder-gray-400"
      />

      <input
        name="category"
        placeholder="Category (e.g. Books, Electronics)"
        value={product.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white placeholder-gray-400"
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white placeholder-gray-400"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold transition"
      >
        {loading ? 'Submitting...' : '➕ Add Product'}
      </button>

      {success && <p className="text-green-400 text-center">✅ Product added successfully!</p>}
    </div>
  );
}
