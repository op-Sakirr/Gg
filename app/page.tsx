'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { encodeData, decodeData } from '@/lib/utils';
import { Share2, MessageCircle, Home } from 'lucide-react';

type PropertyData = {
  title: string;
  price: string;
  location: string;
  description: string;
  contact: string;
};

function PropertyView() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [formData, setFormData] = useState<PropertyData>({
    title: '',
    price: '',
    location: '',
    description: '',
    contact: '',
  });

  useEffect(() => {
    if (dataParam) {
      try {
        setProperty(decodeData(dataParam));
      } catch (e) {
        console.error('Invalid data');
      }
    }
  }, [dataParam]);

  const generateLink = () => {
    const encoded = encodeData(formData);
    const url = `${window.location.origin}/?data=${encoded}`;
    return url;
  };

  const shareOnWhatsApp = () => {
    const url = generateLink();
    const message = `Check out this property: ${formData.title} - ${formData.price}\n\nView here: ${url}`;
    const whatsappUrl = `https://wa.me/${formData.contact.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (property) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-slate-200">
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <p className="text-xl font-semibold text-slate-700 mb-2">{property.price}</p>
        <p className="text-md text-slate-600 mb-4">{property.location}</p>
        <p className="text-md mb-6">{property.description}</p>
        <a 
          href={`https://wa.me/${property.contact.replace(/\D/g, '')}`} 
          target="_blank" 
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          <MessageCircle size={20} />
          Contact Agent
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-slate-200">
      <h1 className="text-2xl font-bold mb-6">List a New Property</h1>
      <div className="grid gap-4">
        <input placeholder="Title" className="p-2 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
        <input placeholder="Price" className="p-2 border rounded" onChange={e => setFormData({...formData, price: e.target.value})} />
        <input placeholder="Location" className="p-2 border rounded" onChange={e => setFormData({...formData, location: e.target.value})} />
        <textarea placeholder="Description" className="p-2 border rounded" onChange={e => setFormData({...formData, description: e.target.value})} />
        <input placeholder="WhatsApp Number (e.g. 1234567890)" className="p-2 border rounded" onChange={e => setFormData({...formData, contact: e.target.value})} />
        <button onClick={shareOnWhatsApp} className="flex items-center justify-center gap-2 p-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
          <Share2 size={20} />
          Generate WhatsApp Link
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="flex items-center gap-2 mb-8">
        <Home className="text-slate-900" />
        <span className="text-xl font-bold">EstateShare</span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PropertyView />
      </Suspense>
    </main>
  );
}
