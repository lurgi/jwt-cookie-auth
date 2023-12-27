"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [router, setIsSuccess]);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>Navigation</header>
      {children}
    </div>
  );
};

export default DashboardLayout;

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    return { user: data, error: null };
  } catch (e) {
    const error = e as AxiosError;
    return { user: null, error };
  }
}
