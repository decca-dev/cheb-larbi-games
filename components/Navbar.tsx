import { useUser } from "../lib/hooks/useUser";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import Dropdown from "./Dropdown";

const Navbar: FC = () => {
  const { user } = useUser({});
  return (
    <div className="relative">
      <nav className="flex flex-row justify-around p-5 bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold">
        <h1 className="text-xl">
          <Link href={"/"}>Home</Link>
        </h1>
        <h1>
          <Link href={"/games"}>Games</Link>
        </h1>
        <div className="space-x-3 flex flex-row">
          {user?.isLoggedIn && (
            <Dropdown
              items={[{ text: "Logout", href: "/api/auth/logout" }]}
              direction="bottom"
              child={
                <div className="-mt-1 cursor-pointer">
                  <div className="rounded-full inline-block align-middle">
                    <Image
                      src={`/avatars/${user.avatar}.svg`}
                      width={25}
                      height={25}
                      alt="avatar"
                    />
                  </div>
                  <p className="inline-block align-middle font-bold">
                    {user.name}
                  </p>
                </div>
              }
            />
          )}
          {!user?.isLoggedIn && (
            <Dropdown
              items={[{ text: "Login", href: "/auth/login" }]}
              direction="bottom"
              child={<h1 className="font-bold">Extra</h1>}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
