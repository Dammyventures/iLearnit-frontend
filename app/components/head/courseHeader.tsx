import { Course, UserProgress } from '@/types/cours';

interface CourseHeaderProps {
  course: Course;
  progress: UserProgress;
}

const CourseHeader = ({ course, progress }: CourseHeaderProps) => {
  const calculateProgress = (): number => {
    if (!course) return 0;
    
    const totalLessons = course.modules.reduce(
      (total, module) => total + module.lessons.length, 0
    );
    
    const completedLessons = progress.completedLessons.length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-xl mb-4">{course.description}</p>
        
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              {course.difficulty}
            </span>
            <span>Instructor: {course.instructor.name}</span>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Progress: {calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;