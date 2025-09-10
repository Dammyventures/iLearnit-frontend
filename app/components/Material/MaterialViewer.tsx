"use client";
import React, { useState } from "react";

interface Material {
  title: string;
  type: string;
  url: string;
}

interface Props {
  materials: Material[];
}

const MaterialViewer: React.FC<Props> = ({ materials }) => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLoad = (url: string) => {
    setLoading(prev => ({ ...prev, [url]: false }));
  };

  const handleError = (url: string, errorMsg: string) => {
    setLoading(prev => ({ ...prev, [url]: false }));
    setErrors(prev => ({ ...prev, [url]: errorMsg }));
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getFileType = (url: string, declaredType: string) => {
    const extension = getFileExtension(url);
    const extensionMap: { [key: string]: string } = {
      'pdf': 'pdf',
      'mp4': 'video',
      'mov': 'video',
      'avi': 'video',
      'ppt': 'ppt',
      'pptx': 'ppt',
      'doc': 'doc',
      'docx': 'doc'
    };
    return extensionMap[extension] || declaredType;
  };

  const renderContent = (mat: Material) => {
    const actualType = getFileType(mat.url, mat.type);
    const fullUrl = `"https://ilearnit-server.onrender.com/"${mat.url}`;

    if (errors[mat.url]) {
      return (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <p className="text-red-600">Error loading file: {errors[mat.url]}</p>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Download file instead
          </a>
        </div>
      );
    }

    if (loading[mat.url] !== false) {
      return (
        <div className="flex items-center justify-center h-48 bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3">Loading...</span>
        </div>
      );
    }

    switch (actualType) {
      case "pdf":
        return (
          <iframe
            src={fullUrl}
            width="100%"
            height="500px"
            className="border"
            onLoad={() => handleLoad(mat.url)}
            onError={() => handleError(mat.url, "Failed to load PDF")}
            title={mat.title}
          />
        );

      case "video":
        return (
          <video 
            controls 
            width="100%"
            onLoadedData={() => handleLoad(mat.url)}
            onError={() => handleError(mat.url, "Failed to load video")}
          >
            <source src={fullUrl} type="video/mp4" />
            <source src={fullUrl} type="video/webm" />
            <source src={fullUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        );

      case "ppt":
      case "doc":
        return (
          <div className="h-500px bg-gray-100">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`}
              width="100%"
              height="500px"
              className="border"
              onLoad={() => handleLoad(mat.url)}
              onError={() => handleError(mat.url, "Failed to load document")}
              title={mat.title}
            />
            <div className="mt-2 text-sm text-gray-600">
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Download original file
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <p className="text-yellow-800">Unsupported file type: {actualType}</p>
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Download file
            </a>
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-6">
      {materials.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No materials available
        </div>
      ) : (
        materials.map((mat) => (
          <div key={mat.url} className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{mat.title}</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {renderContent(mat)}
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Type: {mat.type.toUpperCase()} • 
              <a
                href={`https://ilearnit-server.onrender.com/${mat.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline"
              >
                Direct download
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MaterialViewer;