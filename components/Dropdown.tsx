import { useState, ReactNode, useRef } from "react";
import Link from "next/link";
import { useOutsideAlerter } from "../lib/hooks/useOutsideAlerter";

interface DropdownItem {
  text: string;
  href: string;
}

interface Dropdown {
  direction: "right" | "left" | "bottom";
  child: ReactNode;
  items: DropdownItem[];
}

const Dropdown = ({ direction, child, items }: Dropdown) => {
  const dropdownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  useOutsideAlerter(dropdownRef, () => setIsVisible(false));

  return (
    <div
      className={`${
        direction === "right"
          ? "flex flex-row"
          : direction === "left"
          ? "flex flex-row-reverse"
          : direction === "bottom"
          ? "relative inline-block"
          : ""
      }`}
      ref={dropdownRef}
    >
      <button onClick={toggleVisibility}>{child}</button>
      {isVisible && (
        <div className="absolute flex flex-col rounded-md drop-shadow-lg child-xl cursor-pointer">
          {items.map((item, i) => {
            return <DropdownItem href={item.href} text={item.text} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ text, href }: DropdownItem) => {
  return (
    <>
      <p
        className="py-2 w-28 sm:w-32 pl-2 border-gray-200 border-b-2 bg-white text-black"
        onClick={() => (window.location.href = href)}
      >
        <Link href={href}>{text}</Link>
      </p>
    </>
  );
};

export default Dropdown;
