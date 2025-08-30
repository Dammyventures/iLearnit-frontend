'use client';

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useState, useEffect, useRef } from "react";
import { BiSearch, BiPlay, BiStar, BiRocket, BiTrendingUp, BiShield, BiX } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Login from "../Auth/Login";


// Counter component with animation
const Counter: FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2, 
  suffix = "+" 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 3000), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // State for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeRoute, setActiveRoute] = useState("Login");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") return;
    router.push(`/courses?title=${search}`);
  };

  // Handle play button click for background video
  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // This function would typically come from your data fetching logic
  const refetch = () => {
    console.log("Refetching user data...");
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, [showVideo]);

  if (!isClient || isLoading) return <Loader />;

  const banner = data?.layout?.banner;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl mx-4"
          >
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            >
              <BiX size={32} />
            </button>
            <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full rounded-lg"
                controls
                playsInline
                onEnded={handleCloseVideo}
              >
                <source src="/assests/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative p-4">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <BiX size={24} />
            </button>
            <Login 
              setRoute={setActiveRoute} 
              setOpen={setShowLoginModal}
              refetch={refetch}
            />
          </div>
        </div>
      )}

      {/* Animated background with gradient and particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-900 dark:opacity-20"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-yellow-900 dark:opacity-20"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000 dark:bg-pink-900 dark:opacity-20"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-grid-pattern bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Water wave background at the bottom - Fixed positioning and animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none wave-container" style={{ zIndex: 1 }}>
          <svg 
            className="relative block w-full h-24 md:h-32 lg:h-40 wave" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{ transform: 'rotate(180deg)' }} // Flip the wave upside down
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              className="wave-layer-1"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              className="wave-layer-2"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="wave-layer-3"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <BiTrendingUp className="text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            #1 Trending Learning Platform 2025
          </span>
        </motion.div>

        {/* Main heading with typing animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Transform Your
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Learning Experience",
                2000,
                "Career Path",
                2000,
                "Knowledge Journey",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="block mt-2 dark:text-white text-gray-900"
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl leading-relaxed"
        >
          An intelligent, adaptive learning platform built to transform the way students and educators engage with knowledge.
        </motion.p>

        {/* Stats with animated counters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
          onViewportEnter={() => setHasCounted(true)}
        >
          <div className="flex items-center">
            <div className="text-blue-600 dark:text-blue-400">
              {hasCounted ? <Counter end={50000} duration={5} /> : '0'}
            </div>
            <div className="ml-2 text-gray-600 dark:text-gray-400">Active Students</div>
          </div>
          <div className="flex items-center">
            <div className="text-purple-600 dark:text-purple-400">
              {hasCounted ? <Counter end={500} duration={6} /> : '0'}
            </div>
            <div className="ml-2 text-gray-600 dark:text-gray-400">Expert Instructors</div>
          </div>
          <div className="flex items-center">
            <div className="text-pink-600 dark:text-pink-400">
              {hasCounted ? <Counter end={10000} duration={6} /> : '0'}
            </div>
            <div className="ml-2 text-gray-600 dark:text-gray-400">Courses Available</div>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative w-full max-w-2xl mb-12"
        >
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-1 border border-gray-200 dark:border-gray-700">
            <input
              type="search"
              placeholder="What do you want to learn today?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full py-4 px-6 bg-transparent outline-none text-gray-800 dark:text-white text-lg rounded-2xl"
            />
            <button
              onClick={handleSearch}
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <BiSearch size={24} />
            </button>
          </div>
          <div className="absolute -z-10 -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-16 mt-[-40px]"
        >
          {/* Updated button to trigger login modal */}
          <button 
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
          >
            <BiRocket className="mr-2" />
            Start Learning Free
          </button>
          
          <button 
            onClick={handlePlayVideo}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center"
          >
            <BiPlay className="mr-2 text-blue-600" />
            Watch Demo
          </button>
        </motion.div>

        {/* Trusted by section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="w-full max-w-4xl"
        >
          <p className="text-gray-500 dark:text-white mb-6">Trusted by students at</p>
          <div className="flex flex-wrap justify-center dark:text-white items-center gap-8   transition-all duration-500 mb-[140px]">
            <div className="h-8 w-auto">
              <Image src="/assests/aaua.png" alt="Stanford" width={60} height={60} />
            </div>
            <div className="h-10 w-auto">
              <Image src="/assests/futa.png" alt="MIT" width={40} height={40} />
            </div>
            <div className="h-8 w-auto">
              <Image src="/assests/unibadan.png" alt="Harvard" width={50} height={50} />
            </div>
            <div className="h-6 w-auto">
              <Image src="/assests/unilorin.png" alt="Oxford" width={50} height={45} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-5%  hidden lg:block z-10">
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <BiStar className="text-yellow-500 text-2xl" />
        </motion.div>
      </div>

      <div className="absolute bottom-1/3 right-10% hidden lg:block">
        <motion.div
          animate={{
            y: [0, 15, 0],
            }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <BiShield className="text-green-500 text-xl" />
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        /* Water wave animation - Faster and smoother */
        @keyframes water-wave {
          0% {
            d: path("M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z");
          }
          25% {
            d: path("M0,0V40c50,15,118,30,196,26,70-4,140-30,210-36,80-6,160,10,240,20,80,10,160,10,240-10,80-20,160-50,254-30V0Z");
          }
          50% {
            d: path("M0,0V30c60,10,130,15,200,10,70-5,140-20,210-25,80-5,160,0,240,10,80,10,160,25,240,15,80-10,160-35,270-25V0Z");
          }
          75% {
            d: path("M0,0V35c40,12,110,22,180,18,70-4,140-18,210-22,80-4,160,2,240,8,80,6,160,12,240,4,80-8,160-28,270-22V0Z");
          }
          100% {
            d: path("M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z");
          }
        }
        
        .wave-layer-1 {
          fill: rgb(239, 246, 255);
          animation: water-wave 6s ease-in-out infinite; /* Faster animation */
        }
        
        .wave-layer-2 {
          fill: rgb(219, 234, 254);
          opacity: 0.7;
          animation: water-wave 5s ease-in-out infinite; /* Faster animation */
          animation-delay: 0.3s; /* Reduced delay */
        }
        
        .wave-layer-3 {
          fill: rgb(191, 219, 254);
          opacity: 0.3;
          animation: water-wave 7s ease-in-out infinite; /* Faster animation */
          animation-delay: 0.6s; /* Reduced delay */
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        /* Ensure wave container doesn't overflow */
        .wave-container {
          overflow: hidden;
          height: auto;
          line-height: 0;
        }
        
        .wave {
          display: block;
          width: 100%;
          height: auto;
          position: relative;
        }
        
        @media (prefers-color-scheme: dark) {
          .bg-grid-pattern {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
          }
          
          .wave-layer-1 {
            fill: rgb(30, 41, 59);
          }
          
          .wave-layer-2 {
            fill: rgb(30, 41, 59);
            opacity: 0.7;
          }
          
          .wave-layer-3 {
            fill: rgb(30, 41, 59);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;