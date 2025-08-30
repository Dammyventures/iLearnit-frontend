import YouTubeVideos from "../YouTube/YouTubeVideos";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";

const YouTubeSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ layout: { banner: object } } | null>(null);

  useEffect(() => {
    // This code runs only on the client side
    setIsClient(true);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would set actual data here
      setData({ layout: { banner: {} } });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isClient || isLoading) return <Loader />;

  const banner = data?.layout?.banner;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
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

      {/* YouTube videos section */}
      <section className="mt-12 dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black relative z-10">
        <h2 className="text-4xl font-bold text-center dark:text-white mt-[25px]">Latest <span className="text-gradient">Tutorials</span> </h2>
        <YouTubeVideos />
      </section>
    </div>
  );
};

export default YouTubeSection;