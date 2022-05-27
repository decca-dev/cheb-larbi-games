import { FC, ReactNode } from "react";

const Modal: FC<{ children: ReactNode; show: boolean }> = ({
  children,
  show,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-gray-600 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;
