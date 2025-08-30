"use client";
import React from "react";
import AdminProtected from "../../hooks/adminProtected";
import MaterialUpload from "../../components/Material/MaterialUpload";
import { Heading } from "../../utils/Heading";

const MaterialUploadPage = () => {
  return (
    <AdminProtected>
      <Heading
        title="Upload Learning Materials"
        description="Upload PDFs, Docs, PPTs, or videos for students"
        keywords="learning materials, upload, pdf, docs, ppts, videos, admin"
      />
      <div className="p-4">
        <MaterialUpload />
      </div>
    </AdminProtected>
  );
};

export default MaterialUploadPage;
