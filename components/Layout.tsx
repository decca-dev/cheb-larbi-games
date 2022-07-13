import Navbar from "./Navbar";
import { FC, ReactNode } from "react";
import { useRouter } from "next/router";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div
        className={
          router.route.includes("/games/") ? "flex-grow" : "flex-grow container"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
