export const useUser = () => {
  let final: {
    exists: boolean;
    data: {
      id?: string;
      name?: string;
      avatar?: number;
      isBanned?: boolean;
      isAdmin?: boolean;
    };
  } = {
    exists: false,
    data: {},
  };
  const user = localStorage.getItem("user")!;
  if (!user) {
    return final;
  } else {
    final.data = JSON.parse(user);
    return final;
  }
};
