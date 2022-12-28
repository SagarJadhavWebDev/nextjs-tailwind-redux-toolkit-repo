import Head from "next/head";
import { setUser } from "redux/reducers/userSlice";
import { addProduct } from "redux/reducers/productSlice";
const Home = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Sign your documents on the go" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
};

export default Home;
