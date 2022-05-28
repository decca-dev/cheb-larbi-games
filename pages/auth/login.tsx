import type { NextPage } from "next";
import { useState } from "react";
import { useMetaData } from "../../lib/hooks/useMetaData";
import Layout from "../../components/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import Toast from "../../components/Toast";
import Link from "next/link";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/helpers/ironConfig";

type FieldValues =
  | {
      email: string;
      password: string;
    }
  | { [x: string]: any };

const login: NextPage<{ loggedIn: boolean }> = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <>
        {useMetaData(
          "Login",
          "Login to your cheb larbi games account.",
          "/auth/login"
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
            <h2 className="pt-3 pb-5 font-bold text-xl">
              You are already logged in.
            </h2>
            <button
              className="text-white border-0 py-2 px-5 focus:outline-none rounded text-base mt-4 bg-green-600 md:mt-0"
              onClick={() => (window.location.href = "/")}
            >
              Take me home
            </button>
          </div>
        </Layout>
      </>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  }>();

  const clearMessage = () =>
    setTimeout(() => {
      setMessage({ type: "success", text: "" });
    }, 3000);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then(async (res) => {
        if (res.ok) {
          window.location.href = "/profile";
        } else {
          const data = await res.json();
          setMessage({ type: "error", text: data.message });
          clearMessage();
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage({ type: "error", text: "An unexpected error occured!" });
        clearMessage();
      });
  };
  return (
    <>
      {useMetaData(
        "Login",
        "Login to your cheb larbi games account.",
        "/auth/login"
      )}
      <Layout>
        <div className="flex w-full flex-col items-center justify-center rounded-3xl bg-white p-10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center text-center font-bold">
              <div className="pb-3">
                <label className="font-bold text-2xl">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="user@example.com"
                  className={
                    errors.email
                      ? "border-2 border-red-600 rounded-md w-52 h-10 pl-2"
                      : "border-2 rounded-md w-52 h-10 pl-2"
                  }
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="font-semibold text-red-600">
                    Email is required.
                  </p>
                )}
              </div>
              <div className="pb-3">
                <label className="font-bold text-2xl">Password</label>
                <br />
                <input
                  type="password"
                  placeholder="********"
                  className={
                    errors.password
                      ? "border-2 border-red-600 rounded-md w-52 h-10 pl-2"
                      : "border-2 rounded-md w-52 h-10 pl-2"
                  }
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="font-semibold text-red-600">
                    Password is required.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700"
              >
                Login
              </button>
            </div>
          </form>
          <p className="font-semibold pt-5">
            Don't have an account?{" "}
            <span className="text-blue-500 underline">
              <Link href={"/auth/register"}>Register</Link>
            </span>
          </p>
        </div>
        {message?.type && message.text && (
          <Toast
            type={message.type}
            title={message.type.toUpperCase()}
            description={message.text}
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
          loggedIn: true,
        },
      };
    } else {
      return {
        props: {
          loggedIn: false,
        },
      };
    }
  },
  ironOptions
);

export default login;
