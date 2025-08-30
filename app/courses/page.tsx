"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import { Heading } from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import YouTubeSection from "../components/YouTube/YouTubeSection";

interface ICourse {
  _id: string;
  name: string;
  description: string;
  categories: string[];
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    url: string;
  };
  tags: string;
  purchased: number;
  ratings?: number;
  courseData?: any[];
}

interface ICategory {
  title: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title") || "";
  const { data, isLoading, error } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [category, setCategory] = useState("All");

  // Extract courses from API response - using the correct structure
  useEffect(() => {
    if (data) {
      // Use the same structure as the working component: data.courses.courses
      const coursesData = data.courses?.courses || data.courses || data.data?.courses || data.data || [];
      
      console.log("Extracted courses:", coursesData);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
    }
  }, [data]);

  useEffect(() => {
    let result = [...courses];

    // Filter by category
    if (category !== "All") {
      result = result.filter((item) => {
        // Check if course has categories and if any match the selected category
        const hasMatchingCategory = item.categories?.some(
          (cat) => cat.toLowerCase() === category.toLowerCase()
        );
        return hasMatchingCategory;
      });
    }

    // Filter by search
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
    }

    setFilteredCourses(result);
  }, [courses, category, search]);

  // Extract categories from API response
  const categories = React.useMemo(() => {
    if (!categoriesData) return [];
    
    // Try different possible structures for categories
    const categoriesArray = categoriesData.layout?.categories || 
                           categoriesData.categories || 
                           categoriesData.data || [];
    
    console.log("Extracted categories:", categoriesArray);
    return Array.isArray(categoriesArray) ? categoriesArray : [];
  }, [categoriesData]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error("Course loading error:", error);
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            Error loading courses. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />

      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
        <Heading
          title={"All courses - iLEARNIT"}
          description={"iLEARNIT is a programming community."}
          keywords={
            "programming community, coding skills, expert insights, collaboration, growth"
          }
        />

        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight pt-5">
          Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
          <br />
          With Our Courses
        </h1>

        {/* Category Filters */}
        {categories.length > 0 && (
          <>
            <br />
            <div className="w-full flex items-center flex-wrap justify-center mt-4">
              <div className="text-gray-600 dark:text-gray-300 mr-4 font-medium">
                Filter by:
              </div>
              <CategoryPill
                title="All"
                active={category === "All"}
                onClick={() => setCategory("All")}
              />
              {categories.map((item, index) => (
                <CategoryPill
                  key={index}
                  title={item.title}
                  active={category === item.title}
                  onClick={() => setCategory(item.title)}
                />
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && courses.length > 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <p className={`${styles.label} text-gray-600 dark:text-gray-300 mb-4`}>
              {search
                ? `No courses found matching "${search}"`
                : `No courses found in the "${category}" category`}
            </p>
            <button 
              onClick={() => {
                setCategory("All");
                // Clear search if needed
                if (search) {
                  window.location.href = '/courses';
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Courses
            </button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className={`${styles.label} text-gray-600 dark:text-gray-300 mb-4`}>
              No courses available yet.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Check back later for new courses.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredCourses.length} of {courses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                {search ? ` for "${search}"` : ''}
                {category !== 'All' ? ` in ${category}` : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {filteredCourses.map((item) => (
                <CourseCard item={item} key={item._id} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <YouTubeSection />
      <Footer />
    </div>
  );
};

// Category filter pill component
const CategoryPill = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    className={`h-[35px] ${
      active ? "bg-[crimson]" : "bg-[#5050cb]"
    } m-2 px-4 rounded-[30px] flex items-center justify-center font-Poppins text-white cursor-pointer transition-colors hover:opacity-90`}
    onClick={onClick}
  >
    {title}
  </div>
);

export default Page;