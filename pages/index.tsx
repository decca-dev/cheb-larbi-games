import type { NextPage } from "next";
import { useMetaData } from "../lib/hooks/useMetaData";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      {useMetaData("Cheb Larbi Games", "Cheb Larbi Games", "/")}
      <Layout>
        <h1>hi</h1>
      </Layout>
    </>
  );
};

export default Home;
