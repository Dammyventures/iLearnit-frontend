import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Tutorials", // Regular courses
    url: "/courses",
  },
  {
    name: "Courses ", // New separate item for adaptive courses
    url: "/adaptive-courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  closeSidebar?: () => void; // optional prop to close sidebar on mobile
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, closeSidebar }) => {
  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index}>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href="/">
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                iLEARNIT
              </span>
            </Link>
          </div>

          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                onClick={closeSidebar} // closes sidebar on click
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;