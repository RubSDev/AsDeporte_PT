import React, { useEffect, useState } from "react";
import styles from "./navwu.module.scss";
import { auth } from "../../firebaseconfig";

export default function NavW() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });
  }, []);

  const closeSesion = () => {
    auth.signOut()
    setUser(null);
  }

  return (
    <nav className={styles.NavScss}>
      <div className={styles.contl}>
        <img
          width={255}
          height={32}
          className={"styles.iconSim"}
          src="/ladw.png"
          alt=""
        />
      </div>
      <div className={styles.contca}>
        <button className={styles.btnL} onClick={closeSesion}>Salir</button>
        <img
          width={45}
          height={41}
          className={"styles.iconSim"}
          src="/car.png"
          alt=""
        />
        <img
          width={41}
          height={42}
          className={"styles.iconSim"}
          src="/avatar.png"
          alt=""
        />
      </div>
    </nav>
  );
}
