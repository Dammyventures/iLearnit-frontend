// app/page.tsx
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Heading } from "./utils/Heading";
import MaterialsSection from "./components/Material/MaterialsSection";
import YouTubeSection from "./components/YouTube/YouTubeSection";

// Dynamically import components with client-side logic
const Header = dynamic(() => import("./components/Header"), { ssr: false });
const Hero = dynamic(() => import("./components/Route/Hero"), { ssr: false });
const Courses = dynamic(() => import("./components/Route/Courses"), { ssr: false });
const AdaptiveCourses = dynamic(() => import("./components/Route/AdaptiveCourses"), { ssr: false });
const Reviews = dynamic(() => import("./components/Route/Reviews"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ/FAQ"), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const Chatbot = dynamic(() => import("./components/Chatbot/Chatbot"), { ssr: false });

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="iLEARNIT"
        description="iLEARNIT is a platform for students to learn, understand and gain more experience"
        keywords="Programming,MERN,Redux,Machine Learning,Adaptive Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <AdaptiveCourses />
      <Courses />
      <MaterialsSection />
     
      <Reviews />
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Page;