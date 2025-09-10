// types/cours.ts

// Lesson type
export interface ILesson {
  _id: string; // MongoDB ObjectId (string form)
  title: string;
  content: string;
  duration: number; // duration in minutes
  mediaType: "video" | "text" | "interactive";
  difficulty: number; // scale 1–10
  tags: string[];
}

// Module type
export interface IModule {
  _id: string; // MongoDB ObjectId
  title: string;
  lessons: ILesson[];
  quiz?: string; // quiz ObjectId
}

// Instructor type
export interface Instructor {
  _id: string; // MongoDB ObjectId
  name: string;
  email: string;
}

// Course type
export interface Course {
  _id: string; // MongoDB ObjectId
  title: string;
  description: string;
  instructor: Instructor; 
  modules: IModule[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// User progress type
export interface UserProgress {
  _id?: string;
  userId?: string;
  courseId?: string;
  completedLessons: string[];
  scores?: Record<string, number>;
  currentModule?: string;   // module _id
  currentLesson?: string;   // lesson _id
  knowledgeLevel?: number;
  learningStyle?: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
  preferences?: {
    preferredMedia: string[];
    pace: string;
    challengeLevel: string;
  };
  progressPercentage?: number;
  lastAccessed?: string;
  totalTimeSpent?: number;
}

// Recommendation type
export interface Recommendation {
  moduleId: string; // module _id
  lessonId: string; // lesson _id
  score: number;    // match percentage 0–1
  reason: string;
  priority: "high" | "medium" | "low";
}
