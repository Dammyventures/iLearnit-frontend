import { useState } from 'react';
import { Course } from '@/types/cours';

interface LessonViewerProps {
  lessonId: string;
  course: Course;
  onComplete: () => void;
  onClose: () => void;
}

const LessonViewer = ({ lessonId, course, onComplete, onClose }: LessonViewerProps) => {
  const findLessonById = (id: string) => {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson._id === id) return lesson;
      }
    }
    return null;
  };

  const lesson = findLessonById(lessonId);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!lesson) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Lesson Not Found</h2>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{lesson.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          {lesson.mediaType === 'video' && (
            <div className="aspect-video bg-gray-800 mb-6 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <p>Video Player Placeholder</p>
              </div>
            </div>
          )}
          
          <div className="prose max-w-none">
            {lesson.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          {!isCompleted ? (
            <button 
              onClick={handleComplete}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Mark as Completed
            </button>
          ) : (
            <span className="text-green-600 font-semibold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Lesson Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;