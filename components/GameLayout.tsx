import { FC, ReactNode } from "react";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="h-full border-2 min-w-min flex flex-row justify-around items-center">
        {children}
      </div>
      <div className="h-10"></div>
    </>
  );
};

export default GameLayout;
