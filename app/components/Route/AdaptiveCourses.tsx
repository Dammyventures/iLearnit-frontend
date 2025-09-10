"use client";
import React, { useState, useEffect, useCallback } from "react";

// Types
interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoId: string;
  completed: boolean;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  passingScore: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  duration: string;
  thumbnail: string;
  lessons: Lesson[];
  quiz: Quiz;
  progress: number;
  completed: boolean;
  grade?: number;
  prerequisites: number[];
  nextCourses: number[];
  tags: string[];
  skills: string[];
}

// AI Recommendation Types
interface UserProfile {
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  goals: string[];
  preferredPace: 'slow' | 'moderate' | 'fast';
}

interface AIContentRecommendation {
  courseId: number;
  recommendationScore: number;
  reason: string;
  estimatedCompletionTime: string;
}

interface AILearningPath {
  pathName: string;
  courses: number[];
  description: string;
  estimatedMasteryTime: string;
  suitabilityScore: number;
}

// Confetti Component for Celebrations
const Confetti = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-center items-center overflow-hidden">
      {[...Array(150)].map((_, i) => {
        const style = {
          '--x': Math.random() * 400 - 200 + 'px',
          '--y': Math.random() * 400 - 200 + 'px',
          '--delay': Math.random() * 2 + 's',
          '--duration': Math.random() * 2 + 1 + 's',
          '--color': `hsl(${Math.random() * 360}, 80%, 60%)`
        } as React.CSSProperties;
        
        return (
          <div
            key={i}
            className="absolute w-2 h-2 opacity-0 animate-confetti"
            style={style}
          >
            <div className="w-full h-full rounded-full" style={{ backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)` }}></div>
          </div>
        );
      })}
    </div>
  );
};

type ChatMessage = {
  text: string;
  sender: 'user' | 'ai';
};

// AI Assistant Chat Component

// AI Recommendation Engine Component
const AIRecommendationEngine = ({ courses, userProfile, onRecommendationSelect }: {
  courses: Course[];
  userProfile: UserProfile;
  onRecommendationSelect: (courseId: number) => void;
}) => {
  const [recommendations, setRecommendations] = useState<AIContentRecommendation[]>([]);
  const [learningPaths, setLearningPaths] = useState<AILearningPath[]>([]);
  
  useEffect(() => {
    // Simulate AI content recommendations
    const generateRecommendations = () => {
      const recommended: AIContentRecommendation[] = courses
        .filter(course => {
          // Filter based on user profile
          const matchesLevel = course.level.toLowerCase() === userProfile.proficiencyLevel;
          const matchesInterests = userProfile.interests.some(interest => 
            course.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
            course.category.toLowerCase().includes(interest.toLowerCase())
          );
          
          return matchesLevel || matchesInterests;
        })
        .map(course => ({
          courseId: course.id,
          recommendationScore: Math.random() * 40 + 60, // Score between 60-100
          reason: `Matches your interest in ${course.category} and ${userProfile.learningStyle} learning style`,
          estimatedCompletionTime: `${Math.floor(Math.random() * 5) + 3} weeks at your pace`
        }))
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 5);
      
      setRecommendations(recommended);
      
      // Generate learning paths
      const paths: AILearningPath[] = [
        {
          pathName: "Full-Stack Web Development",
          courses: [1, 2, 3, 4, 5],
          description: "Become a proficient full-stack developer with this comprehensive path",
          estimatedMasteryTime: "6-9 months",
          suitabilityScore: 92
        },
        {
          pathName: "Data Science Specialist",
          courses: [6, 7, 8, 9, 10],
          description: "Master data analysis, visualization, and machine learning",
          estimatedMasteryTime: "7-10 months",
          suitabilityScore: 88
        },
        {
          pathName: "AI & Machine Learning",
          courses: [8, 9, 10, 50],
          description: "Dive deep into artificial intelligence and advanced ML techniques",
          estimatedMasteryTime: "8-12 months",
          suitabilityScore: 85
        }
      ];
      
      setLearningPaths(paths);
    };
    
    generateRecommendations();
  }, [courses, userProfile]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl mt-3 shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">AI-Powered Recommendations</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Recommendations */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recommended Courses</h3>
          <div className="space-y-4">
            {recommendations.map(recommendation => {
              const course = courses.find(c => c.id === recommendation.courseId);
              if (!course) return null;
              
              return (
                <div 
                  key={recommendation.courseId}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onRecommendationSelect(recommendation.courseId)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">{course.title}</h4>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {Math.round(recommendation.recommendationScore)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{recommendation.reason}</p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{course.level} • {course.duration}</span>
                    <span>{recommendation.estimatedCompletionTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Learning Paths */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Learning Paths For You</h3>
          <div className="space-y-4">
            {learningPaths.map((path, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 dark:text-white">{path.pathName}</h4>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {path.suitabilityScore}% match
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{path.courses.length} courses</span>
                  <span>{path.estimatedMasteryTime}</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  {path.courses.slice(0, 4).map(courseId => {
                    const course = courses.find(c => c.id === courseId);
                    return course ? (
                      <div key={courseId} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {course.title.split(' ')[0]}
                      </div>
                    ) : null;
                  })}
                  {path.courses.length > 4 && (
                    <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      +{path.courses.length - 4}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// User Profile Setup Component
const UserProfileSetup = ({ onProfileComplete }: {
  onProfileComplete: (profile: UserProfile) => void;
}) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    learningStyle: 'visual',
    proficiencyLevel: 'beginner',
    interests: [],
    goals: [],
    preferredPace: 'moderate'
  });

  const learningStyles = [
    { id: 'visual', name: 'Visual', description: 'Learn best through images, diagrams, and videos' },
    { id: 'auditory', name: 'Auditory', description: 'Learn best through listening and discussions' },
    { id: 'reading', name: 'Reading/Writing', description: 'Learn best through reading and note-taking' },
    { id: 'kinesthetic', name: 'Kinesthetic', description: 'Learn best through hands-on activities and practice' }
  ];

  const proficiencyLevels = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting out' },
    { id: 'intermediate', name: 'Intermediate', description: 'Some knowledge and experience' },
    { id: 'advanced', name: 'Advanced', description: 'Extensive knowledge and experience' }
  ];

  const interestsList = [
    'Web Development', 'Data Science', 'AI', 'Business', 'Design', 
    'Marketing', 'Mathematics', 'Science', 'Languages', 'Personal Development'
  ];

  const goalsList = [
    'Career Advancement', 'Skill Development', 'Personal Interest', 
    'Academic Requirements', 'Career Change', 'Entrepreneurship'
  ];

  const paces = [
    { id: 'slow', name: 'Slow & Steady', description: 'Approx. 2-3 hours per week' },
    { id: 'moderate', name: 'Moderate', description: 'Approx. 5-7 hours per week' },
    { id: 'fast', name: 'Fast', description: 'Approx. 10+ hours per week' }
  ];

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = () => {
    onProfileComplete(profile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Set Up Your Learning Profile</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Help us personalize your learning experience with AI recommendations
          </p>
        </div>

        <div className="p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Step {step} of 5</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{step * 20}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${step * 20}%` }}
              ></div>
            </div>
          </div>

          {/* Step content */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What's your preferred learning style?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningStyles.map(style => (
                  <div 
                    key={style.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      profile.learningStyle === style.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setProfile({...profile, learningStyle: style.id as any})}
                  >
                    <h4 className="font-medium text-gray-800 dark:text-white">{style.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{style.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What's your current proficiency level?</h3>
              <div className="space-y-4">
                {proficiencyLevels.map(level => (
                  <div 
                    key={level.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      profile.proficiencyLevel === level.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setProfile({...profile, proficiencyLevel: level.id as any})}
                  >
                    <h4 className="font-medium text-gray-800 dark:text-white">{level.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{level.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What are you interested in learning?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Select all that apply</p>
              <div className="flex flex-wrap gap-3">
                {interestsList.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      profile.interests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What are your learning goals?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Select all that apply</p>
              <div className="flex flex-wrap gap-3">
                {goalsList.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleGoalToggle(goal)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      profile.goals.includes(goal)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What's your preferred learning pace?</h3>
              <div className="space-y-4">
                {paces.map(pace => (
                  <div 
                    key={pace.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      profile.preferredPace === pace.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setProfile({...profile, preferredPace: pace.id as any})}
                  >
                    <h4 className="font-medium text-gray-800 dark:text-white">{pace.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pace.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`px-5 py-2 rounded-lg font-medium ${
                step === 1 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Back
            </button>
            
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get video content based on course category
const getVideoContentByCategory = (category: string) => {
  const contentMap: Record<string, { videoIds: string[], thumbnails: string[] }> = {
    'Web Development': {
      videoIds: [
        'qz0aGYrrlhU', // HTML & CSS
        'PkZNo7MFNFg', // JavaScript
        'w7ejDZ8SWv8', // React
        'TlB_eWDSMt4', // Node.js
        'ZxKM3DCV2kE'  // Full Stack
      ],
      thumbnails: [
        'https://picnie-data.s3.ap-south-1.amazonaws.com/templates_output_images/new_7178_230917084321.jpg',
        'https://www.creativeitinstitute.com/images/course/course_1663052056.jpg',
        'https://ut.uvt.tn/pluginfile.php/2147895/course/overviewfiles/Web-Thumbnail.jpg',
        'https://skillsindia.yourjinnie.com/wp-content/uploads/2023/10/thumbnail.png',
        'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/258536138/original/0aa067519dec7a7cc07767ca85caa7d39a61f55a/design-unique-and-eye-catching-youtube-thumbnail.png',
     'https://gatutors.com/wp-content/uploads/2023/01/Web-dev-Thumbnail-O1.jpg',
     'https://cdn.ostad.app/course/photo/2024-12-17T11-35-19.890Z-Course%20Thumbnail%2012.jpg',
     'https://insightiq03.vercel.app/courses/image/webdev.png',
     'https://www.creativeitinstitute.com/images/course/course_1663052056.jpg'
      ]
    },
    'Data Science': {
      videoIds: [
        'LHBE6Q9XlzI', // Data Science
        'ua-CiDNNj30', // Python
        'r-uOLxNrNk8', // Machine Learning
        'GPVsHOlRBBI', // Data Visualization
        'JcI5Vnw0b2c'  // Big Data
      ],
      thumbnails: [
        'https://abctrainings.in/media/thumbnails/data-science.jpg',
        'https://nearlearn.com/public/images/data-science-python-course-in-bangalore.jpg',
        'https://i.ytimg.com/vi/yl7o-56NMJ8/maxresdefault.jpg',
        'https://courses.wscubetech.com/s/store/courses/62eb73ba0cf2f60b1b695721/cover.jpg?v=4',
        'https://i.ytimg.com/vi/pQkHUhFuRZo/hqdefault.jpg'
      ]
    },
    'AI': {
      videoIds: [
        'JMUxmLyrhSk', // AI Basics
        'aircAruvnKk', // Neural Networks
        'PySo_6S4ZAg', // Computer Vision
        'LIFOumqBZkM', // Reinforcement Learning
        'J7DyiqL2e7k'  // Generative AI
      ],
      thumbnails: [
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artificial-intelligence-youtube-thumbnail-design-template-e977846615d6ebe53c36c0dc9d995111_screen.jpg?ts=1684092259',
        'https://img.freepik.com/free-vector/artificial-intelligence-concept-youtube-thumbnail_23-2150389731.jpg',
        'https://studykosh.com/uploads/54925thumbnails-15.jpg',
        'https://studykosh.com/uploads/216793thumbnails-19.jpg',
        'https://i0.wp.com/www.millerwriter.com/wp-content/uploads/2025/04/Title-thumbnail.png?fit=750%2C420&ssl=1'
      ]
    },
    'Business': {
      videoIds: [
        'IYY5b5xqGrU', // Business Fundamentals
        'Z5Kp0JQ4Kc8', // Entrepreneurship
        'k1Lc6pXqkz4', // Digital Marketing
        '8SjUax4Bv8Q', // Leadership
        'f5WnTZk7yLc'  // Financial Analysis
      ],
      thumbnails: [
        'https://i0.wp.com/mandarinmonkey.com/wp-content/uploads/2021/12/Business-Marketing-Thumbnail.png?fit=1280%2C720&ssl=1',
        'https://training.premium.edu.et/wp-content/uploads/2024/06/Bityas-Exit_Thumbnail.jpg',
        'https://img.freepik.com/premium-psd/youtube-video-thumbnail-web-banner-template-business-video-with-youtube-marketing-company_797457-136.jpg',
        'https://img.freepik.com/premium-psd/upgrade-your-business-with-us-you-tube-thumbnail-banner_185633-194.jpg',
        'https://img.freepik.com/premium-psd/creative-business-youtube-thumbnail-design-template_986042-129.jpg'
      ]
    },
    'Design': {
      videoIds: [
        'ZKZ5O2Wvph4', // UI/UX Design
        'FTFaQWZBqQ8', // Figma
        'WZ0I5k2GpMc', // Design Systems
        '8SjUax4Bv8Q', // Interaction Design
        'f5WnTZk7yLc'  // Design Thinking
      ],
      thumbnails: [
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/UI-UX-Design.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Figma.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Design-Systems.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Interaction-Design.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Design-Thinking.jpg'
      ]
    },
    'General': {
      videoIds: [
        'rfscVS0vtbw', // Programming
        'RBSGKlAvoiM', // Data Structures
        'k1Lc6pXqkz4', // Cloud Computing
        '8SjUax4Bv8Q', // DevOps
        'f5WnTZk7yLc'  // Cybersecurity
      ],
      thumbnails: [
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Programming.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Data-Structures.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Cloud-Computing.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/DevOps.jpg',
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/Cybersecurity.jpg'
      ]
    }
  };

  return contentMap[category] || contentMap['General'];
};

// Function to generate courses based on user interests
// ... (previous code remains the same)

// ... (previous code remains the same)

const generateCoursesByInterest = (userInterests: string[]): Course[] => {
  const allCourses: Course[] = [];
  
  // Define quiz questions for each category
  const quizQuestionsByCategory = {
    'Web Development': [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which CSS property is used to change the text color?",
        options: [
          "text-style",
          "font-color",
          "text-color",
          "color"
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: "Which JavaScript framework is known for its virtual DOM?",
        options: [
          "Angular",
          "React",
          "Vue",
          "jQuery"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the purpose of media queries in CSS?",
        options: [
          "To query databases",
          "To make websites responsive",
          "To add multimedia content",
          "To optimize images"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which HTML tag is used to define an internal stylesheet?",
        options: [
          "<script>",
          "<css>",
          "<style>",
          "<link>"
        ],
        correctAnswer: 2
      }
    ],
    'Data Science': [
      {
        id: 1,
        question: "Which library is commonly used for data manipulation in Python?",
        options: [
          "NumPy",
          "Pandas",
          "Matplotlib",
          "Scikit-learn"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is the purpose of a confusion matrix?",
        options: [
          "To visualize data distributions",
          "To evaluate classification model performance",
          "To handle missing values",
          "To normalize data"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which algorithm is used for clustering?",
        options: [
          "Linear Regression",
          "K-Means",
          "Decision Trees",
          "Support Vector Machines"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What does EDA stand for in data science?",
        options: [
          "Electronic Design Automation",
          "Exploratory Data Analysis",
          "Enterprise Data Architecture",
          "Error Detection Algorithm"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which visualization is best for showing correlations between variables?",
        options: [
          "Bar chart",
          "Pie chart",
          "Heatmap",
          "Line graph"
        ],
        correctAnswer: 2
      }
    ],
    'AI': [
      {
        id: 1,
        question: "What is the Turing Test used for?",
        options: [
          "Testing computer speed",
          "Evaluating AI's ability to exhibit human-like intelligence",
          "Measuring algorithm complexity",
          "Testing network security"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which type of learning uses labeled datasets?",
        options: [
          "Unsupervised Learning",
          "Supervised Learning",
          "Reinforcement Learning",
          "Semi-supervised Learning"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is a neural network?",
        options: [
          "A computer network in the brain",
          "A series of algorithms that recognize relationships in data",
          "A type of database system",
          "A hardware component for AI processing"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which algorithm is commonly used for image recognition?",
        options: [
          "Linear Regression",
          "Convolutional Neural Network",
          "Decision Tree",
          "K-Nearest Neighbors"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the purpose of backpropagation in neural networks?",
        options: [
          "To increase network speed",
          "To reduce memory usage",
          "To adjust weights and minimize error",
          "To visualize network architecture"
        ],
        correctAnswer: 2
      }
    ],
    'Business': [
      {
        id: 1,
        question: "What does SWOT stand for in business analysis?",
        options: [
          "Strengths, Weaknesses, Opportunities, Threats",
          "Sales, Workforce, Operations, Technology",
          "Strategy, Workflow, Organization, Tactics",
          "Supply, Wholesale, Output, Trade"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What is a USP in marketing?",
        options: [
          "United Sales Program",
          "Unique Selling Proposition",
          "Universal Service Protocol",
          "User Satisfaction Percentage"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which financial statement shows a company's revenues and expenses?",
        options: [
          "Balance Sheet",
          "Income Statement",
          "Cash Flow Statement",
          "Statement of Equity"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the break-even point?",
        options: [
          "When a company starts making profit",
          "When total revenue equals total costs",
          "When a company expands to new markets",
          "When a product is launched"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What does ROI stand for?",
        options: [
          "Return on Investment",
          "Rate of Interest",
          "Return on Income",
          "Risk of Inflation"
        ],
        correctAnswer: 0
      }
    ],
    'Design': [
      {
        id: 1,
        question: "What does UX stand for?",
        options: [
          "User Experience",
          "Universal X-design",
          "User Examination",
          "Unified Experience"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which principle suggests that elements close together are perceived as related?",
        options: [
          "Similarity",
          "Proximity",
          "Continuity",
          "Closure"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the purpose of a wireframe in design?",
        options: [
          "To add color to a design",
          "To create a visual guide of a webpage's structure",
          "To code the final website",
          "To test user interactions"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which color scheme uses colors adjacent to each other on the color wheel?",
        options: [
          "Complementary",
          "Analogous",
          "Triadic",
          "Monochromatic"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the golden ratio in design?",
        options: [
          "1:1.618",
          "2:3",
          "3:4",
          "16:9"
        ],
        correctAnswer: 0
      }
    ],
    'General': [
      {
        id: 1,
        question: "What is the main purpose of version control systems like Git?",
        options: [
          "To track changes in source code during development",
          "To control user access to systems",
          "To version hardware components",
          "To manage project timelines"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which programming paradigm focuses on objects and classes?",
        options: [
          "Functional Programming",
          "Object-Oriented Programming",
          "Procedural Programming",
          "Logical Programming"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Instruction",
          "Automated Program Interaction",
          "Application Process Integration"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: [
          "Queue",
          "Stack",
          "Array",
          "Linked List"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the time complexity of binary search?",
        options: [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n log n)"
        ],
        correctAnswer: 2
      }
    ]
  };

  const courseTemplates = {
    'Web Development': [
      "Complete HTML & CSS Mastery",
      "JavaScript: From Zero to Hero",
      "React.js Complete Developer Course",
      "Node.js Backend Development",
      "Full-Stack Web Development Bootcamp",
      "Advanced CSS & Sass",
      "TypeScript Masterclass",
      "Vue.js Framework Course",
      "Angular Framework Deep Dive",
      "Web Performance Optimization"
    ],
    'Data Science': [
      "Python for Data Science",
      "Machine Learning Fundamentals",
      "Data Visualization with Python",
      "Statistical Analysis Course",
      "Big Data Analytics",
      "Deep Learning Specialization",
      "Natural Language Processing",
      "Data Engineering Bootcamp",
      "TensorFlow for Beginners",
      "PyTorch Deep Learning"
    ],
    'AI': [
      "Artificial Intelligence Fundamentals",
      "Neural Networks and Deep Learning",
      "Computer Vision Course",
      "Reinforcement Learning",
      "AI Ethics and Society",
      "Generative AI Models",
      "AI Product Management",
      "AI for Healthcare",
      "Robotics and AI",
      "AI Programming with Python"
    ],
    'Business': [
      "Business Fundamentals",
      "Entrepreneurship Masterclass",
      "Digital Marketing Strategy",
      "Leadership and Management",
      "Financial Analysis"
    ],
    'Design': [
      "UI/UX Design Principles",
      "Figma for Beginners",
      "Design Systems Masterclass",
      "Interaction Design",
      "Design Thinking Methodology"
    ]
  };

  let courseId = 1;
  userInterests.forEach(interest => {
    if (courseTemplates[interest as keyof typeof courseTemplates]) {
      const content = getVideoContentByCategory(interest);
      const questions = quizQuestionsByCategory[interest as keyof typeof quizQuestionsByCategory] || 
                        quizQuestionsByCategory['General'];
      
      courseTemplates[interest as keyof typeof courseTemplates].forEach((title, index) => {
        if (allCourses.length < 25) {
          const thumbnailIndex = index % content.thumbnails.length;
          const videoIndex = index % content.videoIds.length;
          
          allCourses.push({
            id: courseId++,
            title,
            description: `Comprehensive course on ${title}. Learn from industry experts and build real-world projects.`,
            instructor: "Expert Instructor",
            category: interest,
            level: Math.random() > 0.5 ? "Intermediate" : "Advanced",
            rating: 4.5 + Math.random() * 0.5,
            students: Math.floor(Math.random() * 10000) + 1000,
            duration: `${Math.floor(Math.random() * 6) + 4} weeks`,
            thumbnail: content.thumbnails[thumbnailIndex],
            progress: 0,
            completed: false,
            prerequisites: [],
            nextCourses: [],
            tags: [interest.toLowerCase(), "programming", "technology"],
            skills: ["Problem Solving", "Critical Thinking", "Technical Skills"],
            lessons: [
              { id: 1, title: "Introduction to " + title, duration: "10:00", videoId: content.videoIds[videoIndex], completed: false },
              { id: 2, title: "Fundamentals of " + title.split(' ')[0], duration: "15:30", videoId: content.videoIds[(videoIndex + 1) % content.videoIds.length], completed: false },
              { id: 3, title: "Advanced Concepts", duration: "20:45", videoId: content.videoIds[(videoIndex + 2) % content.videoIds.length], completed: false },
              { id: 4, title: "Practical Applications", duration: "18:20", videoId: content.videoIds[(videoIndex + 3) % content.videoIds.length], completed: false },
              { id: 5, title: "Project Work", duration: "25:00", videoId: content.videoIds[(videoIndex + 4) % content.videoIds.length], completed: false }
            ],
            quiz: {
              id: 1,
              title: `${title} Quiz`,
              passingScore: 70,
              questions: questions
            }
          });
        }
      });
    }
  });

  // Fill remaining slots with general courses if needed
  if (allCourses.length < 25) {
    const generalCourses = [
      "Introduction to Programming",
      "Data Structures and Algorithms",
      "Cloud Computing Fundamentals",
      "DevOps Practices",
      "Cybersecurity Essentials",
      "Software Engineering Principles",
      "Agile Methodology",
      "Database Design",
      "Mobile App Development",
      "Technical Writing"
    ];
    
    const generalContent = getVideoContentByCategory('General');
    const questions = quizQuestionsByCategory['General'];
    
    generalCourses.forEach((title, index) => {
      if (allCourses.length < 25) {
        const thumbnailIndex = index % generalContent.thumbnails.length;
        const videoIndex = index % generalContent.videoIds.length;
        
        allCourses.push({
          id: courseId++,
          title,
          description: `Comprehensive course on ${title}. Learn from industry experts and build real-world projects.`,
          instructor: "Expert Instructor",
          category: "General",
          level: "Beginner",
          rating: 4.0 + Math.random() * 0.5,
          students: Math.floor(Math.random() * 10000) + 1000,
          duration: `${Math.floor(Math.random() * 6) + 4} weeks`,
          thumbnail: generalContent.thumbnails[thumbnailIndex],
          progress: 0,
          completed: false,
          prerequisites: [],
          nextCourses: [],
          tags: ["general", "programming", "technology"],
          skills: ["Problem Solving", "Critical Thinking", "Technical Skills"],
          lessons: [
            { id: 1, title: "Introduction", duration: "10:00", videoId: generalContent.videoIds[videoIndex], completed: false },
            { id: 2, title: "Fundamentals", duration: "15:30", videoId: generalContent.videoIds[(videoIndex + 1) % generalContent.videoIds.length], completed: false },
            { id: 3, title: "Advanced Concepts", duration: "20:45", videoId: generalContent.videoIds[(videoIndex + 2) % generalContent.videoIds.length], completed: false }
          ],
          quiz: {
            id: 1,
            title: `${title} Quiz`,
            passingScore: 70,
            questions: questions
          }
        });
      }
    });
  }

  return allCourses;
};



// ... (rest of the code remains the same)
const AdaptiveLearningPlatform = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Load progress from localStorage on component mount
// In the AdaptiveLearningPlatform component, replace the initial useEffect with this:
const handleResetApp = () => {
  localStorage.removeItem('userProfile');
  localStorage.removeItem('courseProgress');
  setUserProfile(null);
  setCourses([]);
  setShowProfileSetup(true);
};
// Replace the useEffect hook in the AdaptiveLearningPlatform component with this:
useEffect(() => {
  const savedProfile = localStorage.getItem('userProfile');
  const savedProgress = localStorage.getItem('courseProgress');
  
  if (savedProfile) {
    const profile = JSON.parse(savedProfile);
    setUserProfile(profile);
    setShowProfileSetup(false);
    
    // If we have saved progress, use it, otherwise generate new courses
    if (savedProgress) {
      setCourses(JSON.parse(savedProgress));
    } else {
      const generatedCourses = generateCoursesByInterest(profile.interests);
      setCourses(generatedCourses);
    }
  } else {
    // If no profile exists, show the setup modal
    setShowProfileSetup(true);
  }
}, []);
  // Save progress to localStorage whenever it changes
 // Save progress to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('courseProgress', JSON.stringify(courses));
}, [courses]);

// Save user profile to localStorage
useEffect(() => {
  if (userProfile) {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }
}, [userProfile]);

  // Trigger confetti animation
  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfileSetup(false);
    
    // Generate courses based on user interests
    const generatedCourses = generateCoursesByInterest(profile.interests);
    setCourses(generatedCourses);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentLesson(0);
    setProgress(course.progress);
    setIsCourseCompleted(course.completed);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const handleLessonComplete = () => {
    if (!selectedCourse) return;

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const updatedLessons = course.lessons.map((lesson, index) => {
          if (index === currentLesson) {
            return { ...lesson, completed: true };
          }
          return lesson;
        });

        const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
        const newProgress = Math.round((completedLessons / course.lessons.length) * 100);
        const isCompleted = newProgress === 100;

        return {
          ...course,
          lessons: updatedLessons,
          progress: newProgress,
          completed: isCompleted
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id) || null);
    setProgress(updatedCourses.find(c => c.id === selectedCourse.id)?.progress || 0);
    
    if (currentLesson < selectedCourse.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      setIsCourseCompleted(true);
      setShowQuiz(true);
      // Find recommended courses
      const nextCourseIds = selectedCourse.nextCourses;
      const recommended = courses.filter(course => 
        nextCourseIds.includes(course.id) && 
        course.prerequisites.every(prereqId => {
          const prereqCourse = courses.find(c => c.id === prereqId);
          return prereqCourse?.completed;
        })
      );
      setRecommendedCourses(recommended);
      
      // Trigger confetti when course is completed
      triggerConfetti();
    }
  };

  const handleNextLesson = () => {
    if (selectedCourse && currentLesson < selectedCourse.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentLesson(0);
    setIsCourseCompleted(false);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    if (!selectedCourse) return;

    let correctAnswers = 0;
    selectedCourse.quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / selectedCourse.quiz.questions.length) * 100);
    setQuizScore(score);

    // Update course grade
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          grade: score
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    localStorage.setItem('courseProgress', JSON.stringify(updatedCourses));
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
  };

  const getBadgeColor = (course: Course) => {
    if (course.completed) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (course.progress > 0) return "bg-gradient-to-r from-blue-500 to-indigo-600";
    return "bg-gray-300";
  };

  const filterCoursesByCategory = (category: string) => {
    if (category === "All") return courses;
    return courses.filter(course => course.category === category);
  };

  const getCategoryProgress = (category: string) => {
    const categoryCourses = filterCoursesByCategory(category);
    if (categoryCourses.length === 0) return 0;
    
    const totalProgress = categoryCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / categoryCourses.length);
  };

  const getOverallProgress = () => {
    if (courses.length === 0) return 0;
    
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / courses.length);
  };

  const getCompletedCourses = () => {
    return courses.filter(course => course.completed);
  };

  // Get unique categories
  const categories = ["All", ...new Set(courses.map(course => course.category))];
  
  // Filter courses based on search and category
  const filteredCourses = filterCoursesByCategory(activeCategory).filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-4 md:p-6">
      {showProfileSetup && (
        <UserProfileSetup onProfileComplete={handleProfileComplete} />
      )}
      
      {showConfetti && <Confetti />}
      
     
      
      <div className="max-w-7xl mx-auto">
        {!selectedCourse ? (
          // Course List View
          <div>
            <header className="text-center py-8 md:py-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Begin your <span className="text-blue-600">Learning Journey</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Expand your knowledge with our curated courses. Learn at your own pace and earn badges upon completion.
              </p>
              <button 
  onClick={handleResetApp}
  className=" top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
>
  Reset App
</button>
              {/* Search Bar */}
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses, instructors..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Overall Progress */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Overall Learning Progress</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${getOverallProgress()}, 100`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-white">
                      {getOverallProgress()}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Your progress</span>
                      <span>{getCompletedCourses().length} of {courses.length} courses</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                        style={{ width: `${getOverallProgress()}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Keep learning! You're doing great.
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              {userProfile && courses.length > 0 && (
                <AIRecommendationEngine 
                  courses={courses} 
                  userProfile={userProfile} 
                  onRecommendationSelect={(courseId) => {
                    const course = courses.find(c => c.id === courseId);
                    if (course) handleCourseSelect(course);
                  }} 
                />
              )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-block w-6 h-6 rounded-full ${getBadgeColor(course)} shadow-md`}></span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <span className="text-xs font-semibold bg-blue-600 px-2 py-1 rounded-md">{course.level}</span>
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm">{course.rating.toFixed(1)}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-700 dark:text-gray-400">
                        <span className="font-medium">{course.lessons.length} lessons</span> • {course.duration}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-400">
                        By <span className="font-semibold">{course.instructor}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleCourseSelect(course)}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No courses found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          // Course Player View
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
              <div>
                <button 
                  onClick={handleBackToCourses}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Courses
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{selectedCourse.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">Lesson {currentLesson + 1} of {selectedCourse.lessons.length}</p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-medium text-gray-800 dark:text-white">Progress: {progress}%</div>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
              {/* Lesson List */}
              <div className="lg:w-1/4 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Course Content</h3>
                <ul className="space-y-2">
                  {selectedCourse.lessons.map((lesson, index) => (
                    <li 
                      key={lesson.id} 
                      className={`p-3 rounded-xl cursor-pointer transition-all ${currentLesson === index 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${lesson.completed 
                          ? 'border-l-4 border-green-500' 
                          : ''}`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center">
                        {lesson.completed ? (
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        ) : (
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${currentLesson === index ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            {index + 1}
                          </div>
                        )}
                        <span className="text-sm flex-1">{lesson.title}</span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Quiz Section */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Assessment</h3>
                  <button 
                    onClick={() => setShowQuiz(!showQuiz)}
                    className={`w-full py-3 px-4 rounded-xl transition-all ${showQuiz 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'}`}
                  >
                    {showQuiz ? 'Hide Quiz' : 'Take Final Quiz'}
                  </button>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:w-3/4 p-6">
                {showQuiz ? (
                  // Quiz View
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">{selectedCourse.quiz.title}</h3>
                    
                    {quizScore === null ? (
                      <>
                        <div className="space-y-6">
                          {selectedCourse.quiz.questions.map((question, index) => (
                            <div key={question.id} className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                              <h4 className="font-medium text-gray-800 dark:text-white mb-4">{index + 1}. {question.question}</h4>
                              <div className="space-y-3">
                                {question.options.map((option, optionIndex) => (
                                  <label key={optionIndex} className="flex items-start space-x-3 cursor-pointer group">
                                    <div className="flex items-center h-5 mt-0.5">
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        checked={quizAnswers[question.id] === optionIndex}
                                        onChange={() => handleQuizAnswer(question.id, optionIndex)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <button 
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(quizAnswers).length !== selectedCourse.quiz.questions.length}
                          className={`mt-8 py-3 px-6 rounded-xl text-white font-medium transition-all ${Object.keys(quizAnswers).length !== selectedCourse.quiz.questions.length
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg'}`}
                        >
                          Submit Quiz
                        </button>
                      </>
                    ) : (
                      // Quiz Results
                      <div className="text-center py-8">
                        <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${quizScore >= selectedCourse.quiz.passingScore ? 'bg-green-500' : 'bg-red-500'}`}>
                          <span className="text-white text-2xl font-bold">{quizScore}%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                          {quizScore >= selectedCourse.quiz.passingScore ? 'Quiz Passed!' : 'Quiz Failed'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          {quizScore >= selectedCourse.quiz.passingScore 
                            ? `Congratulations! You passed with a score of ${quizScore}%.` 
                            : `Your score of ${quizScore}% is below the passing score of ${selectedCourse.quiz.passingScore}%.`}
                        </p>
                        
                        {quizScore >= selectedCourse.quiz.passingScore ? (
                          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-xl inline-flex items-center mb-6 shadow-md">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="font-medium">You earned a completion badge!</span>
                          </div>
                        ) : (
                          <button 
                            onClick={handleRetakeQuiz}
                            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                          >
                            Retake Quiz
                          </button>
                        )}
                        
                        {/* Recommended Courses */}
                        {quizScore >= selectedCourse.quiz.passingScore && recommendedCourses.length > 0 && (
                          <div className="mt-10">
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recommended Next Courses</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {recommendedCourses.map(course => (
                                <div key={course.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                  <h5 className="font-bold text-gray-800 dark:text-white">{course.title}</h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 mt-1 line-clamp-2">{course.description}</p>
                                  <button 
                                    onClick={() => handleCourseSelect(course)}
                                    className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all"
                                  >
                                    Start Learning
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : isCourseCompleted ? (
                  // Course Completed View
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Completed!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Congratulations on completing {selectedCourse.title}</p>
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-xl inline-flex items-center shadow-md">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium">You earned a completion badge!</span>
                    </div>
                    <button 
                      onClick={() => setShowQuiz(true)}
                      className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      Take Final Quiz
                    </button>
                  </div>
                ) : (
                  // Lesson View
                  <>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                      {selectedCourse.lessons[currentLesson].title}
                    </h3>
                    
                    <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedCourse.lessons[currentLesson].videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-96"
                        title={selectedCourse.lessons[currentLesson].title}
                      ></iframe>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={handlePrevLesson}
                          disabled={currentLesson === 0}
                          className={`py-2 px-4 rounded-lg transition-all ${currentLesson === 0 
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow'}`}
                        >
                          Previous Lesson
                        </button>
                        <button 
                          onClick={handleNextLesson}
                          disabled={currentLesson === selectedCourse.lessons.length - 1}
                          className={`py-2 px-4 rounded-lg transition-all ${currentLesson === selectedCourse.lessons.length - 1 
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow'}`}
                        >
                          Next Lesson
                        </button>
                      </div>
                      
                      <button 
                        onClick={handleLessonComplete}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
                      >
                        {currentLesson === selectedCourse.lessons.length - 1 ? 'Complete Course' : 'Complete Lesson'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add custom CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translate(0, 0) rotate(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(0);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti var(--duration) var(--delay) forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdaptiveLearningPlatform;