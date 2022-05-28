import Image from "next/image";
import { FC } from "react";

const PageDisplay: FC<{ image: string; href: string; name: string }> = ({
  image,
  href,
  name,
}) => {
  return (
    <div className="tooltip">
      <span className="tooltip-text">{name}</span>
      <div
        className="w-48 h-36 shadow-2xl rounded-lg transition hover:scale-90 ease-in-out duration-200"
        onClick={() => (window.location.href = href)}
      >
        <Image src={image} width={192} height={144} alt={name} />
      </div>
    </div>
  );
};

export default PageDisplay;
