import React from "react";
import Layout from "../components/Layout";
import { useUser } from "../lib/hooks/useUser";
import { useMetaData } from "../lib/hooks/useMetaData";
import Image from "next/image";

const profile = () => {
  const { user } = useUser({});

  return (
    <>
      {useMetaData("Profile", "Checkout your account stats", "/profile")}
      <Layout>
        <div className="flex flex-col items-center text-center text-white">
          <Image
            src={`/avatars/${user?.avatar}.svg`}
            width="200"
            height="200"
            className="rounded-full border-2 border-l-8 border-r-2 border-cyan-600"
          />
          <div className="pb-3">
            <label className="text-2xl font-bold">Username</label>
            <br />
            <div className="tooltip mt-8">
              <span className="tooltip-text">Edit</span>
              <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                decc00n
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default profile;
