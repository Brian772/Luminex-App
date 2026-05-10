"use client";

import { useState } from "react";

export default function AIExtractPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [provider, setProvider] = useState("gemini");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("provider", provider);

    try {
      const response = await fetch("http://localhost:8080/api/documents/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Gagal mengunggah file. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">AI Brain Extractor</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih AI Provider</label>
          <div className="flex gap-4">
            <button 
              onClick={() => setProvider("gemini")}
              className={`px-4 py-2 rounded ${provider === "gemini" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
            >
              Google Gemini
            </button>
            <button 
              onClick={() => setProvider("openai")}
              className={`px-4 py-2 rounded ${provider === "openai" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"}`}
            >
              OpenAI (GPT-4)
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <button 
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Memproses dengan AI..." : "Ekstrak Materi"}
        </button>
      </div>

      {result && (
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">📝 Rangkuman (To The Point)</h2>
            <div className="bg-blue-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
              {result.summary}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">✅ Tugas & Action Items</h2>
            <div className="bg-green-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700 font-mono text-sm">
              {result.tasks}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">🎴 Flashcards (Materi Belajar)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.flashcards.split("\n\n").map((card, idx) => (
                <div key={idx} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm">
                  <div className="whitespace-pre-wrap text-gray-700">{card}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
