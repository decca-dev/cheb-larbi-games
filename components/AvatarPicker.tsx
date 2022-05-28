import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface AVPProps {
  avatar: number;
  setAvatar: Dispatch<SetStateAction<number>>;
}

interface AVProps {
  number: number;
  setAvatar: Dispatch<SetStateAction<number>>;
}

const AvatarPicker = ({ avatar, setAvatar }: AVPProps) => {
  return (
    <div className="grid place-items-center grid-cols-3 gap-5">
      <Avatar number={1} setAvatar={setAvatar} />
      <Avatar number={2} setAvatar={setAvatar} />
      <Avatar number={3} setAvatar={setAvatar} />
      <Avatar number={4} setAvatar={setAvatar} />
      <Avatar number={5} setAvatar={setAvatar} />
      <Avatar number={6} setAvatar={setAvatar} />
    </div>
  );
};

const Avatar = ({ number, setAvatar }: AVProps) => {
  return (
    <Image
      src={`/avatars/${number}.svg`}
      width={150}
      height={150}
      onClick={() => setAvatar(number)}
      className="cursor-pointer"
      alt={`number ${number}`}
    />
  );
};

export default AvatarPicker;
