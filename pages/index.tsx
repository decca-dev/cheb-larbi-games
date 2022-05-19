import type { NextPage } from "next";
import { useMetaData } from "../lib/hooks/useMetaData";

const Home: NextPage = () => {
  return <>{useMetaData("Cheb Larbi Games", "Cheb Larbi Games", "/")}</>;
};

export default Home;
