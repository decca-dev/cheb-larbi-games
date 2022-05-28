import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useMetaData } from "../lib/hooks/useMetaData";
import Image from "next/image";

const fourOone: NextPage = () => {
  return (
    <>
      {useMetaData("401 | Unquthenticated", "401 | Unquthenticated", "/401")}
      <Layout>
        <div className="flex flex-col items-center bg-gray-200 rounded-xl shadow-xl pb-8">
          <div>
            <Image
              src="/assets/logo.svg"
              alt="sadge"
              width="250"
              height="250"
            />
          </div>
          <h1 className="pt-10 font-bold text-3xl">401 | Unauthenticated</h1>
          <h2 className="pt-3 pb-5 font-bold text-xl">
            You need to be logged in to view this route
          </h2>
          <button
            className="text-white border-0 py-2 px-5 focus:outline-none rounded text-base mt-4 bg-green-600 md:mt-0"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Login
          </button>
        </div>
      </Layout>
    </>
  );
};

export default fourOone;
