"use client";
import React, { useState } from "react";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import AiChat from "@/app/components/AI/AiChat";

const Page = () => {
  const [videoName, setVideoName] = useState("");
  const [flag, setFlag] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (videoName.trim()) {
      setFlag(true);
    }
  }

  return flag ? (
    <AiChat videoName={videoName} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700/30">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h1 className={`${styles.title} text-4xl md:text-5xl lg:text-6xl mb-4`}>
              Welcome to <span className="text-gradient">iLearnIT AI</span> Assistant
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your intelligent learning companion is ready to help you understand any course material. 
              Enter your video name to start an interactive learning session.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Illustration Section */}
            <div className="lg:w-2/5 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <Image 
                    width={300} 
                    height={250} 
                    src={"/assests/AIBot.jpg"} 
                    alt="AI Assistant"
                    className="w-full h-auto rounded-xl transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-3/5 w-full">
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/30"
              >
                <div className="mb-8">
                  <label className={`${styles.label} !text-xl !font-semibold text-gray-800 dark:text-white mb-4 block`} htmlFor="video">
                    📹 Enter Video Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={videoName}
                      onChange={(e) => setVideoName(e.target.value)}
                      id="video"
                      placeholder="e.g., Introduction to React.js"
                      className={`${styles.input} !w-full !px-6 !py-4 !text-lg !border-2 !border-gray-300 dark:!border-gray-600 focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 dark:focus:!ring-blue-800/30 !rounded-xl !bg-white/80 dark:!bg-gray-700/80 backdrop-blur-sm transition-all duration-300`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
                    Enter the exact name of the video you want to discuss with the AI assistant
                  </p>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    disabled={!videoName.trim()}
                    className={`${styles.button} !w-full !py-4 !text-lg !font-semibold !rounded-xl !bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start AI Conversation
                  </button>
                </div>
              </form>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant Answers</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">24/7 Available</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              💡 Tip: Make sure to enter the exact video name for the best AI assistance experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;