import Navbar from "./Navbar";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow container">{children}</div>
    </div>
  );
};

export default Layout;
