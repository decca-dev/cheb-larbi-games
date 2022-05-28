import Layout from "../components/Layout";
import { UserInterface } from "../lib/types";
import { useMetaData } from "../lib/hooks/useMetaData";
import Image from "next/image";
import type { NextPage, NextPageContext } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/helpers/ironConfig";

const profile: NextPage<{ user: UserInterface }> = ({ user }) => {
  return (
    <>
      {useMetaData("Profile", "Checkout your account stats", "/profile")}
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

export const getServerSideProps = withIronSessionSsr(
  //@ts-ignore
  async function getServerSideProps(ctx: NextPageContext) {
    const user = ctx.req?.session.user;
    if (user?.isLoggedIn) {
      return {
        props: {
          user: user,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  },
  ironOptions
);

export default profile;
