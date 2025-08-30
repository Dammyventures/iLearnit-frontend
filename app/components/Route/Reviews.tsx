import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Chinonso Okafor",
    avatar: "/assests/user1.jpeg",
    profession: "Student | AAUA, Ondo State",
    comment:
      "iLEARNIT has completely changed the way I learn. The AI-powered system helps me focus on what I really need to improve. I&apos;ve gone from struggling in class to confidently understanding topics at my own pace. It&apos;s perfect for students like me who prefer flexible learning.",
    rating: 5,
  },
  {
    name: "Fatima Yusuf",
    avatar: "/assests/user2.jpeg",
    profession: "Undergraduate | University of Ilorin",
    comment:
      "I love how iLEARNIT makes learning feel personal. The lessons are structured in a way that makes even tough topics like Data Structures easier to understand. The fact that I can access it anytime on my phone is just amazing. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emeka Umeh",
    avatar: "/assests/user3.jpeg",
    profession: "Computer Science Student | UNN",
    comment:
      "Thanks to iLEARNIT, I completed my first full-stack project using React and Node.js. The real-life examples and practical courses helped me prepare for tech internships. It&apos;s honestly one of the best platforms for tech students in Nigeria.",
    rating: 5,
  },
  {
    name: "Aisha Bello",
    avatar: "/assests/user5.jpeg",
    profession: "Software Engineering Student | FUTA",
    comment:
      "Before iLEARNIT, I used to get bored of online courses. But the way this platform adapts to my progress and provides supportive guidance makes me feel like I&apos;m learning with a tutor. It has really helped me balance school and tech skill-building.",
    rating: 5,
  },
  {
    name: "Ifeanyi Obinna",
    avatar: "/assests/user4.jpeg",
    profession: "Self-Taught Developer | Lagos",
    comment:
      "iLEARNIT offers real-world projects that helped me build my GitHub portfolio. The lessons are practical, and the community is supportive. As a self-taught dev, I appreciate how accessible the content is. Big kudos to the team!",
    rating: 5,
  },
  {
    name: "Adesuwa Okojie",
    avatar: "/assests/user6.jpeg",
    profession: "Student | AAUA, Akungba",
    comment:
      "This platform makes studying more engaging. I can track my learning progress, retake quizzes, and even get study recommendations. I really feel like the system understands me. iLEARNIT is a game-changer for Nigerian education.",
    rating: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-green-500/10 to-teal-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative w-[90%] 800px:w-[85%] m-auto py-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16">
          <div className="lg:w-[45%] w-full relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              <Image
                src={require("../../../public/assests/business-img.png")}
                alt="Happy students using iLEARNIT"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transform rotate-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">5000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Happy Students</div>
              </div>
            </div>
          </div>

          <div className="lg:w-[55%] w-full">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400/20 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-400/20 rounded-full"></div>
              
              <h3 className={`${styles.title} 800px:!text-[40px] !text-3xl relative z-10`}>
                Our Students Are <span className="text-gradient">Our Strength</span>
                <br /> See What They Say About Us
              </h3>
              
              <p className={`${styles.label} mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300`}>
                At iLEARNIT, we&apos;re proud to support Nigerian students on their
                academic and tech journey. From universities across the country, our
                learners are building skills, confidence, and future-ready projects.
                Here&apos;s what a few of them had to say.
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">4.9/5 Average Rating</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">95% Completion Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          {/* Section title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Voices of Success
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real stories from real students who are transforming their education journey with iLEARNIT
            </p>
          </div>

          {/* Reviews grid with enhanced layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="relative group"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
              >
                {/* Card with enhanced styling */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Review comment */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  
                  {/* Reviewer info */}
                  <div className="flex items-center mt-auto">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {review.profession}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Learning Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of Nigerian students who are already experiencing the future of education with iLEARNIT
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;