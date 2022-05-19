import { useUser } from "../lib/hooks/useUser";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { exists, data } = useUser();
  return (
    <nav className="flex flex-row justify-between p-5 bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold">
      <h1 className="text-xl">
        <Link href={"/"}>Cheb Larbi Games</Link>
      </h1>
      <div className="space-x-3">
        <h1>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </h1>
        {exists && (
          <div>
            <div className="rounded-full inline-block align-middle">
              <Image
                src={`/avatars/${data.avatar}.svg`}
                width={25}
                height={25}
                alt="avatar"
              />
            </div>
            <p className="inline-block align-middle">{data.name}</p>
          </div>
        )}
        {!exists && (
          <h1>
            <Link href={"/auth/login"}>Login</Link>
          </h1>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
