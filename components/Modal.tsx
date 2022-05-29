import { FC, ReactNode, useRef, Dispatch, SetStateAction } from "react";
import { useOutsideAlerter } from "../lib/hooks/useOutsideAlerter";

const Modal: FC<{
  children: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ children, show, setShow }) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => setShow(false));
  if (!show) {
    return null;
  }
  return (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="container min-w-min h-auto bg-gray-200 rounded-xl shadow-xl pt-8 pb-8 text-black"
        ref={modalRef}
      >
        <button onClick={() => setShow(false)} className="float-right -mt-5">
          &#10006;
        </button>
        <br />
        {children}
      </div>
    </div>
  );
};

export default Modal;
