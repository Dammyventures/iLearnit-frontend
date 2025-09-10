// utils/NavItems.tsx
import Link from "next/link";
import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Tutorials",
    url: "/courses",
    protected: true, // Add this flag
  },
  {
    name: "Courses",
    url: "/adaptive-courses",
    protected: true, // Add this flag
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
  closeSidebar?: () => void;
  setOpen?: (open: boolean) => void;
  setRoute?: (route: string) => void;
};

const NavItems: React.FC<Props> = ({ 
  activeItem, 
  isMobile, 
  closeSidebar, 
  setOpen, 
  setRoute 
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});

  const handleProtectedClick = (e: React.MouseEvent, isProtected: boolean) => {
    if (isProtected && !userData) {
      e.preventDefault();
      if (setOpen && setRoute) {
        setOpen(true);
        setRoute("Login");
      }
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link 
            href={item.url} 
            key={index}
            onClick={(e) => item.protected && handleProtectedClick(e, item.protected)}
          >
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
            <Link 
              href={item.url} 
              key={index}
              onClick={(e) => {
                if (item.protected && !userData) {
                  e.preventDefault();
                  if (setOpen && setRoute) {
                    setOpen(true);
                    setRoute("Login");
                  }
                }
                closeSidebar && closeSidebar();
              }}
            >
              <span
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