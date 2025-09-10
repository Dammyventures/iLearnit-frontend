// app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Heading } from "./utils/Heading";
import { useSession } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

// Create a wrapper component to handle the Header props correctly
const HeaderWrapper = dynamic(() => import("./components/Header"), { 
  ssr: false,
  loading: () => <div className="h-[80px]"></div> // placeholder while loading
});

// Dynamically import other components
const Hero = dynamic(() => import("./components/Route/Hero"), { ssr: false });
const Courses = dynamic(() => import("./components/Route/Courses"), { ssr: false });
const AdaptiveCourses = dynamic(() => import("./components/Route/AdaptiveCourses"), { ssr: false });
const Reviews = dynamic(() => import("./components/Route/Reviews"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ/FAQ"), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const Chatbot = dynamic(() => import("./components/Chatbot/Chatbot"), { ssr: false });
const MaterialsSection = dynamic(() => import("./components/Material/MaterialsSection"), { ssr: false });

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { data: session } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  
  // Determine if user is logged in
  const isLoggedIn = userData && userData.user;

  return (
    <div>
      <Heading
        title="iLEARNIT"
        description="iLEARNIT is a platform for students to learn, understand and gain more experience"
        keywords="Programming,MERN,Redux,Machine Learning,Adaptive Learning"
      />
      
      <HeaderWrapper
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        // Show all components including learning path when user is logged in
        <>
          <Hero />
          <AdaptiveCourses />
          <Courses />
          <MaterialsSection />
          <Reviews />
          <FAQ />
        </>
      ) : (
        // Show only Hero section when no user is logged in
        <Hero />
      )}
      <Reviews />
          <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Page;