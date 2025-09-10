import { Course, UserProgress, Recommendation, ILesson, IModule, Instructor } from '../types/cours';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Mock data
const mockCourse: Course = {
  _id: "course-1",
  title: "Adaptive Learning Introduction",
  description: "Learn how adaptive learning personalizes education based on individual student needs and performance.",
  instructor: {
    _id: "instructor-1",
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com"
  },
  tags: ["adaptive-learning", "education"],
  difficulty: "beginner",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  modules: [
    {
      _id: "module-1",
      title: "Introduction to Adaptive Learning",
      lessons: [
        {
          _id: "lesson-1-1",
          title: "What is Adaptive Learning?",
          content: "Detailed explanation...",
          duration: 15,
          mediaType: "video",
          difficulty: 3,
          tags: ["intro"]
        },
        {
          _id: "lesson-1-2",
          title: "Benefits of Adaptive Learning",
          content: "Detailed explanation...",
          duration: 20,
          mediaType: "text",
          difficulty: 3,
          tags: ["benefits"]
        },
        {
          _id: "lesson-1-3",
          title: "Adaptive Learning vs Traditional",
          content: "Detailed explanation...",
          duration: 25,
          mediaType: "video",
          difficulty: 4,
          tags: ["comparison"]
        }
      ]
    },
    {
      _id: "module-2",
      title: "Learning Styles Assessment",
      lessons: [
        {
          _id: "lesson-2-1",
          title: "Identifying Learning Styles",
          content: "Detailed explanation...",
          duration: 30,
          mediaType: "interactive",
          difficulty: 4,
          tags: ["assessment"]
        },
        {
          _id: "lesson-2-2",
          title: "Assessment Techniques",
          content: "Detailed explanation...",
          duration: 20,
          mediaType: "text",
          difficulty: 3,
          tags: ["techniques"]
        }
      ]
    },
    {
      _id: "module-3",
      title: "Personalized Learning Paths",
      lessons: [
        {
          _id: "lesson-3-1",
          title: "Creating Learning Paths",
          content: "Detailed explanation...",
          duration: 40,
          mediaType: "video",
          difficulty: 5,
          tags: ["paths"]
        },
        {
          _id: "lesson-3-2",
          title: "Adaptive Content Delivery",
          content: "Detailed explanation...",
          duration: 25,
          mediaType: "text",
          difficulty: 4,
          tags: ["content"]
        }
      ]
    }
  ]
};

const mockUserProgress: UserProgress = {
  completedLessons: ["lesson-1-1", "lesson-1-2"],
  currentLesson: "lesson-1-3",
  currentModule: "module-1",
  progressPercentage: 25,
  lastAccessed: new Date().toISOString(),
  totalTimeSpent: 45
};

const mockRecommendations: Recommendation[] = [
  {
    moduleId: "module-2",
    lessonId: "lesson-2-1",
    score: 0.9,
    reason: "Based on your learning style assessment",
    priority: "high"
  },
  {
    moduleId: "module-3",
    lessonId: "lesson-3-2",
    score: 0.75,
    reason: "Builds on completed concepts",
    priority: "medium"
  }
];

export const apiService = {
  getCourse: async (courseId: string): Promise<Course> => {
    console.log("Mock API: Getting course", courseId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourse;
  },

  getUserProgress: async (courseId: string): Promise<UserProgress> => {
    console.log("Mock API: Getting user progress for", courseId);
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUserProgress;
  },

  updateUserProgress: async (courseId: string, updates: Partial<UserProgress>): Promise<UserProgress> => {
    console.log("Mock API: Updating progress for", courseId, updates);
    await new Promise(resolve => setTimeout(resolve, 200));
    Object.assign(mockUserProgress, updates);
    return mockUserProgress;
  },

  getRecommendations: async (courseId: string): Promise<Recommendation[]> => {
    console.log("Mock API: Getting recommendations for", courseId);
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockRecommendations;
  },

  completeLesson: async (courseId: string, lessonId: string): Promise<UserProgress> => {
    console.log("Mock API: Completing lesson", lessonId, "for course", courseId);
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!mockUserProgress.completedLessons.includes(lessonId)) {
      mockUserProgress.completedLessons.push(lessonId);
    }

    const totalLessons = mockCourse.modules.flatMap(m => m.lessons).length;
    mockUserProgress.progressPercentage = Math.round(
      (mockUserProgress.completedLessons.length / totalLessons) * 100
    );

    mockUserProgress.currentLesson = lessonId;

    return mockUserProgress;
  }
};
