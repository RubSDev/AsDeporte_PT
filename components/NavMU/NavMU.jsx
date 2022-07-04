import React from "react";
import styles from "./navmu.module.scss";
import Link from "next/link";

export default function NavW() {
  return (
    <nav className={styles.NavScss}>
      <div className={styles.contl}>
        <img
          width={56}
          height={42}
          className={"styles.iconSim"}
          src="/ladm.png"
          alt=""
        />
      </div>
      <div className={styles.contca}>
        <img
          width={45}
          height={41}
          className={"styles.iconSim"}
          src="/car.png"
          alt=""
        />
        <Link href="/edit-user">
          <img
            width={41}
            height={42}
            className={"styles.iconSim"}
            src="/avatar.png"
            alt=""
          />
        </Link>
      </div>
    </nav>
  );
}
