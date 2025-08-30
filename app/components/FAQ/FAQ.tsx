import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  _id: string;
  question: string;
  answer: string;
};

const defaultFAQs: FAQItem[] = [
  {
    _id: "1",
    question: "What is iLEARNIT and how does it work?",
    answer:
      "iLEARNIT is an AI-assisted adaptive learning platform designed to help university students learn smarter. It recommends personalized content based on your learning style, tracks progress, and provides resources like videos, quizzes, and projects.",
  },
  {
    _id: "2",
    question: "Is iLEARNIT free to use?",
    answer:
      "Yes! iLEARNIT is currently free for all students of AAUA. Some advanced features or premium certifications may be added in the future, but core learning tools are free.",
  },
  {
    _id: "3",
    question: "Do I need internet access to use the platform?",
    answer:
      "Yes, iLEARNIT is web-based and requires an internet connection. However, we are working on an offline download feature for specific courses and materials.",
  },
  {
    _id: "4",
    question: "Can I use iLEARNIT on my phone?",
    answer:
      "Absolutely! The platform is fully responsive and mobile-friendly. You can access your courses and track progress from your smartphone or tablet.",
  },
  {
    _id: "5",
    question: "How do I reset my password if I forget it?",
    answer:
      "Simply go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox to reset it.",
  },
  {
    _id: "6",
    question: "Do I get certificates after completing a course?",
    answer:
      "Yes! Once you complete a course and pass all required assessments, you'll receive a digital certificate you can download or share with employers.",
  },
  {
    _id: "7",
    question: "How is this different from YouTube tutorials?",
    answer:
      "Unlike random YouTube videos, iLEARNIT offers structured, trackable lessons that adapt to your pace. It also includes quizzes, personalized feedback, and a learning community.",
  },
  {
    _id: "8",
    question: "Can I contribute as a tutor or content creator?",
    answer:
      "Yes! We welcome passionate AAUA students, lecturers, and professionals to join as content contributors. Reach out through the Contact page to apply.",
  },
];

const FAQ = () => {
  const [questions, setQuestions] = useState<FAQItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(defaultFAQs);
  }, []);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b]">
      <div className="w-[90%] 800px:w-[80%] mx-auto">
        <div className="text-center mb-16">
          <h1 className={`${styles.title} 800px:text-[40px] mb-4`}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Got questions? We&apos;ve got answers! Here are the most common things AAUA students ask us about the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {questions.map((q, index) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-2 top-5 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <div className="bg-white dark:bg-[#121212] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 ml-4">
                <button
                  onClick={() => toggle(q._id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {q.question}
                  </h3>
                  <span className="flex-shrink-0 ml-4 p-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    {activeId === q._id ? (
                      <HiMinus className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                    ) : (
                      <HiPlus className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {activeId === q._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-gray-700 dark:text-gray-300 font-Poppins leading-relaxed">
                          {q.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly team.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;