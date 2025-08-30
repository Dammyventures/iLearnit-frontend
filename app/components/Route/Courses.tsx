import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React from "react";
import CourseCard from "../Course/CourseCard";
import Loader from "../Loader/Loader";
import YouTubeSection from "../../components/YouTube/YouTubeSection";

const Courses = () => {
  const { data, isLoading, error } = useGetUsersAllCoursesQuery({});
  const courses = data?.courses?.courses ?? [];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading courses. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
          <br />
          With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses.length > 0 ? (
            courses.map((item: any) => (
              <CourseCard item={item} key={item._id} />
            ))
          ) : (
            <p className="col-span-4 text-center py-10 text-gray-500">
              No courses available at the moment.
            </p>
          )}
        </div>
      </div>
      <YouTubeSection />
    </div>
  );
};

export default Courses;