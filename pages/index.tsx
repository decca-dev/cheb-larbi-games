import type { NextPage } from "next";
import { useMetaData } from "../lib/hooks/useMetaData";
import Layout from "../components/Layout";
import Link from "next/link";
import PageDisplay from "../components/PageDisplay";
import { getRepoData } from "../lib/helpers/getRepoData";
import CommitCard from "../components/CommitCard";

const Home: NextPage<{ data: Array<{ date: string; message: string }> }> = ({
  data,
}) => {
  return (
    <>
      {useMetaData("Cheb Larbi Games", "Cheb Larbi Games", "/")}
      <Layout>
        <div className="flex flex-col items-center text-white text-center">
          <div className="text-center py-5">
            <h1 className="text-3xl font-bold">Cheb Larbi</h1>
            <p className="text-xl font-semibold">
              A fan-made website dedicated to the one and only, Cheb Larbi
            </p>
          </div>
          <h1 className="text-2xl font-semibold pb-5">
            New here?{" "}
            <span className="text-blue-500">
              <Link href={"/auth/register"}>Create an account</Link>
            </span>
          </h1>
          <h1 className="text-2xl font-semibold pb-5">
            Already have an account?{" "}
            <span className="text-blue-500">
              <Link href={"/auth/login"}>Login</Link>
            </span>
          </h1>
          <h1 className="text-2xl font-semibold pb-5">
            Want to look around?{" "}
            <span className="text-blue-500">
              <Link href={"#pages"}>Checkout other pages</Link>
            </span>
          </h1>
          <h1 className="text-3xl font-bold mb-5 pt-28">
            Recent commits from the developer
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.map((d, i) => {
              return <CommitCard date={d.date} message={d.message} key={i} />;
            })}
          </div>
          <h1 className="pt-52 text-5xl font-bold pb-10">Other Pages</h1>
          <div
            id="pages"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <PageDisplay
              image="/avatars/1.svg"
              name="Flappy Larbi"
              href="/games/flappylarbi"
            />
            <PageDisplay
              image="/avatars/1.svg"
              name="Flappy Larbi"
              href="/games/flappylarbi"
            />
            <PageDisplay
              image="/avatars/1.svg"
              name="Flappy Larbi"
              href="/games/flappylarbi"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const repoData = await getRepoData();
  return {
    props: {
      data: [repoData[0], repoData[1], repoData[2]],
    },
  };
};

export default Home;
