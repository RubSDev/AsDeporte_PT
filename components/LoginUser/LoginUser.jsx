import React, { useState } from "react";
import styles from "./loginUser.module.scss";
import { useRouter } from "next/router";
import { auth } from "../../firebaseconfig";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};

export default function LoginUser() {
  const router = useRouter();
  const url = "http://localhost:3000";
  const [errorMsg, setErrorMsg] = useState("");
  console.log("error", errorMsg);
  const [dataLogin, setDataLogin] = useState(initialState);

  function saveState(event) {
    setDataLogin({
      ...dataLogin,
      [event.target.name]: event.target.value,
    });
  }

  async function register(event) {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(dataLogin.email, dataLogin.password)
      .then((res) => {
        console.log("res", res);
        alert("Usuario registrado");
        router.push("/register");
      })

      .catch((e) => {
        console.log("error register", e);
        if (e.code == "auth/invalid-email") {
          setErrorMsg("Formato de email incorrecto");
        }
        if (e.code == "auth/weak-password") {
          setErrorMsg("La contraseña debe tener al menos 6 caracteres");
        }
      });
  }

  async function login(event) {
    auth
      .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
      .then((res) => router.push("/user-list"))
      .catch((e) => {
        console.log("error login", e);
        if (e.code == "auth/invalid-email") {
          setErrorMsg("Formato de email incorrecto");
        }
        if (e.code == "auth/wrong-password") {
          setErrorMsg("Contraseña incorrecta");
        }
      });
  }

  return (
    <div className={styles.containerLoginAndImg}>
      <div className={styles.contImgLADM}>
        <img
          className={styles.imgLoginM}
          src="/ladm.png"
          alt="Logo AsDeporte"
        />
      </div>

      <div className={styles.containerLogin}>
        <div className={styles.contImgLADW}>
          <img
            className={styles.imgLoginW}
            src="/ladw.png"
            alt="Logo AsDeporte"
          />
        </div>
        <div className={styles.contentLogin}>
          <div className={styles.cardLogin}>
            <h2 className={styles.titleLogin}>Iniciar sesión</h2>
            <div>
              <p className={styles.upInputLogin}>Email</p>
              <input
                className={styles.inputLogin}
                type="email"
                placeholder="Email"
                name="email"
                onChange={saveState}
                value={dataLogin.email}
              />
            </div>
            <div>
              <p className={styles.upInputLogin}>Password</p>
              <input
                className={styles.inputLogin}
                type="password"
                placeholder="Password"
                name="password"
                onChange={saveState}
                value={dataLogin.password}
              />
            </div>
            <button className={styles.btnL} onClick={login}>
              Iniciar
            </button>

            <p>{errorMsg}</p>
            <div className={styles.contetContaseña}>
              <Link href="/register">
                <a className={styles.aContaseña}>
                  ¿Aún no tienes cuenta? Crear cuenta
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
