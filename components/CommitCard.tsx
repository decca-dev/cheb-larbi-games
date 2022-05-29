import { FC } from "react";

const CommitCard: FC<{ date: string; message: string }> = ({
  date,
  message,
}) => {
  return (
    <div className="px-3 h-20 rounded-xl shadow-xl border-2 flex flex-col items-center justify-evenly transition hover:scale-90 duration-150 ease-in-out hover:translate-y-1">
      <h1 className="text-xl font-bold ">{message}</h1>
      <h1 className="text-xl font-semibold text-gray-300">
        {new Date(date).toLocaleDateString("en-US")}
      </h1>
    </div>
  );
};

export default CommitCard;
