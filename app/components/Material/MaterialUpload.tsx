"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MaterialUpload = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [materials, setMaterials] = useState<any[]>([]);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/materials");
      setMaterials(res.data.materials);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchMaterials(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select a file");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/api/materials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        fetchMaterials();
        setTitle("");
        setFile(null);
        alert("Uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Upload Learning Material</h2>
      <form onSubmit={handleUpload} className="flex flex-col space-y-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="doc">DOC</option>
          <option value="ppt">PPT</option>
          <option value="video">Video</option>
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Upload</button>
      </form>

      <h3 className="text-xl mt-4">Available Materials:</h3>
      <ul className="list-disc ml-4">
        {materials.map((mat) => (
          <li key={mat.url}>
            <a href={`http://localhost:8000${mat.url}`} target="_blank" rel="noreferrer">
              {mat.title} ({mat.type})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialUpload;
