import React from 'react';

export default function Blank() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Maaf, terjadi kesalahan dalam memuat halaman.</h1>
        <p className="text-gray-600">Silakan coba lagi nanti atau buka halaman ini di versi mobile.</p>
      </div>
    </div>
  );
}
