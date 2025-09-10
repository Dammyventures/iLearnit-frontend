import { Course, Recommendation, ILesson } from '@/types/cours';

interface RecommendationsProps {
  recommendations: Recommendation[];
  course: Course;
  onLessonSelect: (lessonId: string) => void;
}

const Recommendations = ({ recommendations, course, onLessonSelect }: RecommendationsProps) => {
  const findLessonById = (lessonId: string): ILesson | null => {
    for (const module of course.modules) {
      const lesson = module.lessons.find((l) => l._id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          Complete some lessons to get personalized recommendations.
        </p>
      ) : (
        recommendations.slice(0, 3).map((rec) => {
          const lesson = findLessonById(rec.lessonId);

          if (!lesson) {
            return (
              <div
                key={rec.lessonId}
                className="p-4 border rounded-lg mb-4 bg-gray-50 text-gray-400"
              >
                <p>Lesson not found (ID: {rec.lessonId})</p>
              </div>
            );
          }

          return (
            <div
              key={rec.lessonId}
              className="p-4 border rounded-lg mb-4 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => onLessonSelect(rec.lessonId)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{lesson.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {Math.round(rec.score * 100)}% match
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>

              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-3">{lesson.duration} min</span>
                <span className="capitalize">{lesson.mediaType}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Recommendations;
