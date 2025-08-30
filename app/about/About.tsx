import React from "react";
import { styles } from "../styles/style";

const About = () => {
  // Sample team data - replace with actual team information
  const teamMembers = [
   {
      name: "Ogunleye Damilola",
      role: "Technical Lead & Full-Stack Developer",
      bio: "Specializes in building scalable educational platforms with expertise in React, Node.js, and cloud architecture. Leads the technical vision for iLEARNIT."
    },
    {
      name: "Omoloba Oluwabunmi",
      role: "Curriculum Design Specialist",
      bio: "Designs adaptive learning pathways and content structures. Integrates pedagogical best practices with technology to create engaging learning experiences."
    },
    {
      name: "Adejuyigbe Joshua",
      role: "Platform Maintenance",
      bio: "Ensures the smooth operation and reliability of the iLEARNIT platform through regular updates and troubleshooting."
    },
    {
      name: "Eboyomi Kingsley",
      role: "Technical Support",
      bio: "Provides technical assistance and resolves platform issues for students and faculty members."
    },
    {
      name: "Amos Akintomiwa",
      role: "Content Management",
      bio: "Maintains and organizes educational materials to ensure they are up-to-date and properly structured on the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`${styles.title} 800px:!text-[45px] !mb-6`}>
            What is <span className="text-gradient">iLEARNIT?</span>
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-lg font-Poppins leading-relaxed">
                <strong className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">iLEARNIT</strong> is an AI-assisted adaptive learning platform designed specifically
                for students and lecturers at Adekunle Ajasin University, Akungba-Akoko.
                Our mission is to bridge learning gaps, enhance academic outcomes, and empower students
                through technology-driven education.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-lg font-Poppins leading-relaxed">
                Built using modern web technologies, iLEARNIT personalizes the learning
                experience for each user. Our platform intelligently recommends course materials,
                adjusts content difficulty, and supports diverse learning styles.
                <br />
                <br />
                Whether you&apos;re looking to revise foundational topics, explore advanced concepts, or track your
                academic growth, iLEARNIT provides the tools and support to help you succeed — anywhere, anytime.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-lg font-Poppins leading-relaxed">
                More than just a learning portal, iLEARNIT fosters a collaborative learning environment.
                With support from both peers and academic facilitators, students are empowered to take ownership
                of their learning journey.
                <br />
                <br />
                As an institution-backed platform, all content is carefully curated, reviewed, and aligned with academic
                standards. This ensures that every learner receives a high-quality, affordable, and accessible education.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <p className="text-lg font-Poppins text-white leading-relaxed">
                Join us as we transform learning at AAUA and beyond. With iLEARNIT, education becomes
                smarter, more inclusive, and future-ready.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">The passionate people behind iLEARNIT</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gradient font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;