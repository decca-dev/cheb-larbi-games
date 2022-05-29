import { useEffect } from "react";
import Router from "next/router";
import type { UserInterface } from "../types";
import useSWR from "swr";

type User = UserInterface & { isLoggedIn: boolean };

export const useUser = ({
  redirectTo,
  redirectIfFound = false,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
}) => {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/auth/me");
  useEffect(() => {
    if (!redirectTo || !user) return;
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
};
