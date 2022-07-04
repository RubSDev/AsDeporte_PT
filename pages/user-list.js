import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavWU from "../components/NavWU/NavWU";
import NavMU from "../components/NavMU/NavMU";
import UserList from "../components/UserList/UserList";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AsDeporte App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/faviconAD.ico" />
      </Head>
      <NavWU></NavWU>
      <NavMU></NavMU>

      <main className={styles.main}>
        <UserList></UserList>
      </main>
      <Footer></Footer>
    </div>
  );
}