import type { NextPage } from "next";
import AvatarPicker from "../../components/AvatarPicker";
import { useState } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useMetaData } from "../../lib/hooks/useMetaData";
import { useForm, SubmitHandler } from "react-hook-form";
import Toast from "../../components/Toast";
import Link from "next/link";

type FieldValues =
  | {
      name: string;
      email: string;
      password: string;
    }
  | { [x: string]: any };

const register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState(1);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  }>();
  const [isVisible, setIsVisible] = useState(false);

  const clearMessage = () =>
    setTimeout(() => {
      setMessage({ type: "success", text: "" });
    }, 3000);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: avatar,
      }),
    }).then(async (res) => {
      if (res.ok) {
        setMessage({
          type: "success",
          text: "Registered successfully! Redirecting you to the login page...",
        });
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2500);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message });
        clearMessage();
      }
    });
  };

  return (
    <>
      {useMetaData(
        "Register",
        "Register an account for cheb larbi games.",
        "/auth/register"
      )}
      <Layout>
        <div className="flex flex-col items-center mb-10">
          <div className="flex flex-col justify-center items-center p-10 rounded-3xl shadow-2xl bg-white w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col text-center sm:grid grid-cols-3 gap-4 place-items-center">
                <div className="pb-3">
                  <label className="font-bold text-2xl">Username</label>
                  <br />
                  <input
                    type="text"
                    placeholder="cheb larbi stan"
                    className={
                      errors.name
                        ? "border-2 border-red-600 rounded-md w-52 h-10 pl-2"
                        : "border-2 rounded-md w-52 h-10 pl-2"
                    }
                    {...register("name", {
                      required: true,
                      maxLength: 35,
                      minLength: 5,
                    })}
                  />
                  {errors.name && (
                    <p className="font-semibold text-red-600">
                      Name is required and must be between 5 to 35 characters
                      long.
                    </p>
                  )}
                </div>
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
                    type={isVisible ? "text" : "password"}
                    className={
                      errors.password
                        ? "border-2 border-red-600 rounded-md w-52 h-10 pl-2"
                        : "border-2 rounded-md w-52 h-10 pl-2"
                    }
                    placeholder="********"
                    {...register("password", { required: true, minLength: 8 })}
                  />
                  <span
                    className="-ml-6 cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? "😑" : "👁"}
                  </span>
                  {errors.password && (
                    <p className="font-semibold text-red-600">
                      Password is required and must be at least 8 characters
                      long.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label className="font-bold mb-5">Avatar</label>
                <br />
                <Image
                  src={"/avatars/" + avatar + ".svg"}
                  width={200}
                  height={200}
                  className="mb-24"
                  alt="chosen avatar"
                />
                <div className="pt-10"></div>
                <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
                <div className="pt-10"></div>
                <button
                  type="submit"
                  className="w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </form>
            <p className="font-semibold pt-5">
              Already have an account?{" "}
              <span className="text-blue-500 underline">
                <Link href={"/auth/login"}>Login</Link>
              </span>
            </p>
          </div>
        </div>
        {message?.type && message?.text && (
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

export default register;
