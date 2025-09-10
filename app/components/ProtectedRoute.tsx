// components/ProtectedRoute.tsx
"use client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader/Loader";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { data: userData, isLoading } = useLoadUserQuery(undefined, {});
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userData) {
      router.push("/");
    }
  }, [isLoading, userData, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!userData) {
    return null; // or a redirect message
  }

  return <>{children}</>;
};

export default ProtectedRoute;