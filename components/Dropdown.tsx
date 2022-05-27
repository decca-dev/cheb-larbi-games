import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";

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
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
    >
      <button onClick={toggleVisibility}>{child}</button>
      {isVisible && (
        <div className="absolute flex flex-col rounded-md drop-shadow-lg child-xl">
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
      <p className="py-2 w-24 sm:w-32 pl-3 border-gray-200 border-b-2 bg-white text-black">
        <Link href={href}>{text}</Link>
      </p>
    </>
  );
};

export default Dropdown;
