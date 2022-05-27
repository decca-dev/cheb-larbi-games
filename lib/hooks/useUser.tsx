import { useEffect } from "react";
import Router from "next/router";
import type { UserInterface } from "../types";
import useSWR from "swr";

export const useUser = ({
  redirectTo,
  redirectIfFound = false,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
}) => {
  const { data: user, mutate: mutateUser } = useSWR<
    UserInterface & { isLoggedIn: boolean }
  >("/api/auth/me");
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
