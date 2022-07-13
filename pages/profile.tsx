import Layout from "../components/Layout";
import { UserInterface } from "../lib/types";
import { useMetaData } from "../lib/hooks/useMetaData";
import Image from "next/image";
import type { NextPage, NextPageContext } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/helpers/ironConfig";
import { useState, useRef } from "react";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const profile: NextPage<{ user: UserInterface }> = ({ user }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [profile, setProfile] = useState<{ name?: string; bio?: string }>();
  const [toast, setToast] = useState<{ type: string; description: string }>();
  const nameRef = useRef<HTMLParagraphElement | any>();
  const bioRef = useRef<HTMLParagraphElement | any>();

  const xpToNext = 5 * Math.pow(user.level, 2) + 5 * user.level + 100;

  const resetToast = () =>
    setTimeout(() => {
      setToast({ type: "", description: "" });
    }, 3000);

  const editName = () => {
    fetch("/api/auth/me?action=name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: profile?.name }),
    })
      .then(async (res) => {
        const data = await res.json();
        setToast({
          type: data.error === false ? "success" : "error",
          description: data.message,
        });
        resetToast();
        if (data.error === false)
          nameRef.current.innerText = "Name: " + profile?.name;
      })
      .catch((err) => {
        console.error(err);
        setToast({
          type: "error",
          description: `An unexpected error occured!`,
        });
        resetToast();
      });
  };
  const editBio = () => {
    fetch("/api/auth/me?action=bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio: profile?.bio }),
    })
      .then(async (res) => {
        const data = await res.json();
        setToast({
          type: data.error === false ? "success" : "error",
          description: data.message,
        });
        resetToast();
        if (data.error === false)
          bioRef.current.innerText = "Bio: " + profile?.bio;
      })
      .catch((err) => {
        console.error(err);
        setToast({
          type: "error",
          description: `An unexpected error occured!`,
        });
        resetToast();
      });
  };

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
            <div>
              <div className="mt-8">
                <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                  ID: {user?.ID}
                </p>
              </div>
            </div>
            <div>
              <div className="mt-8">
                <p
                  onClick={() => setShow1(true)}
                  className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2"
                  ref={nameRef}
                >
                  Name: {user?.name}
                </p>
              </div>
              <Modal show={show1} setShow={setShow1}>
                <h1 className="text-xl font-bold">Want to edit your name?</h1>
                <br />
                <input
                  type="text"
                  className="border-2 rounded-md w-52 h-10 pl-2"
                  placeholder={user?.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <div className="flex flex-row">
                  <button className="bg-gray-400 rounded-xl w-24 h-10 font-semibold text-white mr-5">
                    Close
                  </button>
                  {profile?.name?.length! > 0 && profile?.name !== user?.name && (
                    <button
                      className="bg-green-400 rounded-xl w-24 h-10 font-semibold text-white"
                      onClick={editName}
                    >
                      Save
                    </button>
                  )}
                </div>
              </Modal>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                Level: {user?.level}
              </p>
            </div>
          </div>
          <div>
            <div>
              <div className="mt-8">
                <p className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2">
                  XP: {user?.xp} | {xpToNext - 0} until level {user.level + 1}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <p
                onClick={() => setShow2(true)}
                className="hover:bg-green-500 cursor-pointer pt-1 h-10 w-96 rounded-md border-2 pl-2"
                ref={bioRef}
              >
                Bio: {user?.bio}
              </p>
            </div>
            <Modal show={show2} setShow={setShow2}>
              <h1 className="text-xl font-bold">Want to edit your bio?</h1>
              <br />
              <input
                type="text"
                className="border-2 rounded-md w-52 h-10 pl-2"
                placeholder={user?.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
              <div className="flex flex-row">
                <button className="bg-gray-400 rounded-xl w-24 h-10 font-semibold text-white mr-5">
                  Close
                </button>
                {profile?.bio?.length! > 5 && profile?.bio !== user?.bio && (
                  <button
                    className="bg-green-400 rounded-xl w-24 h-10 font-semibold text-white"
                    onClick={editBio}
                  >
                    Save
                  </button>
                )}
              </div>
            </Modal>
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
        {toast?.type && toast.description && (
          <Toast
            type={toast.type as "success" | "error"}
            title={toast.type.toUpperCase()}
            description={toast.description}
          />
        )}
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
