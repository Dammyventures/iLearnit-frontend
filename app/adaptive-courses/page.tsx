"use client";
import React, { useState } from "react";
import { Heading } from "../utils/Heading";
import dynamic from "next/dynamic";
import AdaptiveCourses from "../components/Route/AdaptiveCourses";

// Dynamically import components
const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

const AdaptiveCoursesPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2); // Set active item to "Adaptive Learning" (index 2)
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Adaptive Learning Courses - iLEARNIT"
        description="Experience personalized learning paths that adapt to your style, pace, and knowledge level"
        keywords="Adaptive Learning,Personalized Education,Smart Courses"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      
      {/* Main content with padding to account for fixed header */}
      <div className="pt-20 min-h-screen">
        <AdaptiveCourses />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdaptiveCoursesPage;