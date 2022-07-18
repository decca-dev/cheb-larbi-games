import { FC, ReactNode } from "react";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-around items-center overflow-x-hidden pt-5">
        {children}
      </div>
    </>
  );
};

export default GameLayout;
