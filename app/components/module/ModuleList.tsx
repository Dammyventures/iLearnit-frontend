import { IModule } from '@/types/cours';

interface ModuleListProps {
  modules: IModule[];
  completedLessons: string[];
  onLessonSelect: (lessonId: string) => void;
}

const ModuleList = ({ modules, completedLessons, onLessonSelect }: ModuleListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Course Content</h2>
      
      {modules.map((module, moduleIndex) => (
        <div key={module._id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Module {moduleIndex + 1}: {module.title}
          </h3>
          
          <div className="border rounded-lg overflow-hidden">
            {module.lessons.map((lesson, lessonIndex) => {
              const isCompleted = completedLessons.includes(lesson._id);
              
              return (
                <div 
                  key={lesson._id}
                  className={`flex items-center p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                    isCompleted ? 'bg-green-50' : ''
                  }`}
                  onClick={() => onLessonSelect(lesson._id)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-gray-100">
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-gray-500">{lessonIndex + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="mr-3">{lesson.duration} min</span>
                      <span className="capitalize">{lesson.mediaType}</span>
                    </div>
                  </div>
                  
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;