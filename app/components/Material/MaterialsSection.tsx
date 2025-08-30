"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialViewer from "./MaterialViewer";

const MaterialsSection = () => {
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/materials");
        setMaterials(res.data.materials);
      } catch (err) {
        console.error("Error fetching materials:", err);
      }
    };
    fetchMaterials();
  }, []);

  if (!materials.length) return null;

  return (
    <div className="p-4 mt-10 w-[80%] h-[50%] bg-white">
      <h2 className="text-3xl font-bold mb-6">Learning Materials</h2>
      <MaterialViewer materials={materials} />
    </div>
  );
};

export default MaterialsSection;
