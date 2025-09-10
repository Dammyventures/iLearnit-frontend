// app/adaptive-course/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heading } from "../../utils/Heading";
import dynamic from "next/dynamic";
import { Course, UserProgress, Recommendation } from "@/types/cours";
import { apiService } from "@/services/api";

// Dynamically import components
const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });
const CourseHeader = dynamic(() => import("@/app/components/head/courseHeader"), { ssr: false });
const ModuleList = dynamic(() => import("@/app/components/module/ModuleList"), { ssr: false });
const Recommendations = dynamic(() => import("@/app/components/recommend/Recommendation"), { ssr: false });
const LessonViewer = dynamic(() => import("@/app/components/Lesson/LessonViewer"), { ssr: false });

const AdaptiveCoursePage = () => {
  const params = useParams();
  const courseId = params?.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    // Check if courseId is available
    if (!courseId) {
      console.error('Course ID not found in params');
      setLoading(false);
      setError('Course ID not found');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [courseData, progressData, recData] = await Promise.all([
          apiService.getCourse(courseId),
          apiService.getUserProgress(courseId),
          apiService.getRecommendations(courseId)
        ]);
        
        setCourse(courseData);
        setUserProgress(progressData);
        setRecommendations(recData);
      } catch (error) {
        console.error('Failed to load course data:', error);
        setError('Failed to load adaptive course. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleLessonComplete = async (lessonId: string) => {
    try {
      const updatedProgress = await apiService.completeLesson(courseId, lessonId);
      setUserProgress(updatedProgress);
      
      // Refresh recommendations after completing a lesson
      const newRecs = await apiService.getRecommendations(courseId);
      setRecommendations(newRecs);
    } catch (error) {
      console.error('Failed to update progress:', error);
      setError('Failed to update progress. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div>
        <Heading
          title="Loading Adaptive Course - iLEARNIT"
          description="Loading adaptive course content"
          keywords="Adaptive Learning,Personalized Course"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading adaptive course content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <Heading
          title="Error - iLEARNIT"
          description="Error loading course"
          keywords="Error,Course,Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show course not found state
  if (!course || !userProgress) {
    return (
      <div>
        <Heading
          title="Adaptive Course Not Found - iLEARNIT"
          description="Adaptive course not found"
          keywords="Adaptive Course,Not Found"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Adaptive Course Not Found</h2>
            <p className="text-gray-600 mb-6">The requested adaptive course could not be found.</p>
            <button 
              onClick={() => window.location.href = '/adaptive-courses'}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Browse Adaptive Courses
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Heading
        title={`${course.title} - iLEARNIT`}
        description={course.description}
        keywords={course.tags.join(",")}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      
      <CourseHeader course={course} progress={userProgress} />
      
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ModuleList 
            modules={course.modules} 
            completedLessons={userProgress.completedLessons}
            onLessonSelect={setActiveLesson}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Recommendations 
            recommendations={recommendations} 
            course={course}
            onLessonSelect={setActiveLesson}
          />
        </div>
      </div>
      
      {activeLesson && (
        <LessonViewer 
          lessonId={activeLesson}
          course={course}
          onComplete={() => handleLessonComplete(activeLesson)}
          onClose={() => setActiveLesson(null)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default AdaptiveCoursePage;