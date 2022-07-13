import type { NextPage, NextPageContext } from "next";
import type { UserInterface } from "../../lib/types";
import { useMetaData } from "../../lib/hooks/useMetaData";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";

const USER: NextPage<{ user: UserInterface | null }> = ({ user }) => {
  const router = useRouter();
  if (user === null) {
    return (
      <>
        {useMetaData(
          "Not found",
          "The user with the provided ID was not found.",
          `/u/${router.query.id}`
        )}
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
            <h1 className="pt-10 font-bold text-3xl">404 | Not found</h1>
            <h2 className="pt-3 pb-5 font-bold text-xl">
              The user with the id "{router.query.id}" was not found.
            </h2>
            <button
              className="text-white border-0 py-2 px-5 focus:outline-none rounded text-base mt-4 bg-green-600 md:mt-0"
              onClick={() => (window.location.href = "/")}
            >
              Go home
            </button>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      {useMetaData(user.name, user.bio!, `/u/${router.query.id}`)}
      <Layout>
        <div className="flex flex-col items-center text-center text-white">
          <div className="rounded-full border-2 border-l-8 border-r-2 border-cyan-600">
            <Image
              src={`/avatars/${user?.avatar}.svg`}
              width="200"
              height="200"
              className="rounded-full"
              alt="avatar"
            />
          </div>
          <div>
            <div className="mt-8">
              <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                Name: {user?.name}
              </p>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                ID: {user?.ID}
              </p>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                Bio: {user?.bio}
              </p>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <div className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2 flex flex-row items-center justify-center">
                <h1>Avatar: </h1>
                <Image
                  src={`/avatars/${user?.avatar}.svg`}
                  width="25"
                  height="25"
                  className="rounded-full inline-block align-middle"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const protocol = ctx.req?.headers["x-forwarded-proto"] || "http";
  const baseUrl = ctx.req ? `${protocol}://${ctx.req.headers.host}` : "";
  //@ts-ignore
  const id = ctx.params.id;
  const res = await fetch(`${baseUrl}/api/users/${id}`);
  const data = await res.json();
  return {
    props: {
      user: data.error === false ? data.data : null,
    },
  };
};

export default USER;
