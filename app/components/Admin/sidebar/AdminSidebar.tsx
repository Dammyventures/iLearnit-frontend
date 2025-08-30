"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlined,
  ArrowForwardIos,
  ArrowBackIos,
  PeopleOutlined,
  ReceiptOutlined,
  BarChartOutlined,
  MapOutlined,
  Groups,
  OndemandVideo,
  VideoCall,
  Web,
  Quiz,
  Note,
  ManageHistory,
  Settings,
  ExitToApp,
  Category,
  LiveTv,
  Upload,
  Dashboard as DashboardIcon,
  Analytics,
  School,
  LibraryBooks,
  Person,
  QuestionAnswer,
  Class,
  GroupWork,
} from "@mui/icons-material";
import avatarDefault from "../../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  
  return (
    <MenuItem
      active={isActive}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{
        color: isActive ? "#6870fa" : "inherit",
        backgroundColor: isActive ? "rgba(104, 112, 250, 0.1)" : "transparent",
        margin: "4px 0",
        borderRadius: "8px",
      }}
    >
      <Typography className="!text-[15px] !font-Poppins font-medium">
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    router.push("/");
  };

  const menuItems = [
    {
      title: "Dashboard",
      to: "/admin",
      icon: <HomeOutlined className="text-lg" />,
    },
    {
      title: "Users",
      to: "/admin/users",
      icon: <Groups className="text-lg" />,
    },
    {
      title: "Invoices",
      to: "/admin/invoices",
      icon: <ReceiptOutlined className="text-lg" />,
    },
    {
      title: "Create Course",
      to: "/admin/create-course",
      icon: <VideoCall className="text-lg" />,
    },
    {
      title: "Upload Material",
      to: "/admin/material-upload",
      icon: <Upload className="text-lg" />,
    },
    {
      title: "Live Courses",
      to: "/admin/courses",
      icon: <LiveTv className="text-lg" />,
    },
    {
      title: "Hero Section",
      to: "/admin/hero",
      icon: <Web className="text-lg" />,
    },
    {
      title: "FAQ",
      to: "/admin/faq",
      icon: <QuestionAnswer className="text-lg" />,
    },
    {
      title: "Categories",
      to: "/admin/categories",
      icon: <Category className="text-lg" />,
    },
    {
      title: "Manage Team",
      to: "/admin/team",
      icon: <GroupWork className="text-lg" />,
    },
    {
      title: "Courses Analytics",
      to: "/admin/courses-analytics",
      icon: <Analytics className="text-lg" />,
    },
    {
      title: "Orders Analytics",
      to: "/admin/orders-analytics",
      icon: <BarChartOutlined className="text-lg" />,
    },
    {
      title: "Users Analytics",
      to: "/admin/users-analytics",
      icon: <ManageHistory className="text-lg" />,
    },
  ];

  const menuSections = [
    {
      title: "Data",
      items: ["Users", "Invoices"],
    },
    {
      title: "Content",
      items: ["Create Course", "Upload Material", "Live Courses"],
    },
    {
      title: "Customization",
      items: ["Hero Section", "FAQ", "Categories"],
    },
    {
      title: "Management",
      items: ["Manage Team"],
    },
    {
      title: "Analytics",
      items: ["Courses Analytics", "Orders Analytics", "Users Analytics"],
    },
  ];

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          position: "fixed",
          height: "100vh",
          zIndex: 1111,
          transition: "all 0.3s ease",
        },
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#6870fa !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "8px 20px 8px 15px !important",
        },
      }}
      className="bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          width: isCollapsed ? "80px" : "250px",
        }}
        breakPoint="md"
      >
        <Menu>
          {/* LOGO AND COLLAPSE ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : <ArrowBackIos />}
            style={{
              margin: "15px 0 25px 0",
              padding: "10px 20px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link href="/" className="block">
                  <h3 className="text-[22px] font-Poppins font-bold uppercase dark:text-white text-black">
                    iLEARNIT
                  </h3>
                </Link>
              </Box>
            )}
          </MenuItem>

          {/* USER PROFILE */}
          {!isCollapsed && (
            <Box mb="25px" px="15px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={80}
                  height={80}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box textAlign="center" mt="15px">
                <Typography
                  variant="h6"
                  className="!text-[16px] text-black dark:text-[#ffffffc1] font-medium"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-[14px] text-gray-500 dark:text-[#ffffff80] capitalize mt-1"
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box px={isCollapsed ? "10px" : "15px"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<DashboardIcon className="text-lg" />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Typography
                variant="subtitle2"
                sx={{ m: "20px 0 10px 0", opacity: 0.7 }}
                className="!text-[12px] text-gray-500 dark:text-[#ffffff80] uppercase tracking-wider"
              >
                Main Navigation
              </Typography>
            )}

            {menuSections.map((section, index) => (
              <Box key={index}>
                {!isCollapsed && (
                  <Typography
                    variant="subtitle2"
                    sx={{ m: "15px 0 8px 0", opacity: 0.7 }}
                    className="!text-[11px] text-gray-500 dark:text-[#ffffff80] uppercase tracking-wider"
                  >
                    {section.title}
                  </Typography>
                )}
                {menuItems
                  .filter((item) => section.items.includes(item.title))
                  .map((item) => (
                    <Item
                      key={item.title}
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
              </Box>
            ))}

            {/* LOGOUT */}
            <Box mt="20px">
              <MenuItem
                onClick={logoutHandler}
                icon={<ExitToApp className="text-lg" />}
                style={{
                  color: "#f44336",
                  margin: "4px 0",
                  borderRadius: "8px",
                  padding: "8px 15px",
                }}
              >
                {!isCollapsed && (
                  <Typography className="!text-[15px] !font-Poppins font-medium">
                    Logout
                  </Typography>
                )}
              </MenuItem>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;