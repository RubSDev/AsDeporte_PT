import React, { useState } from "react";
import styles from "./register.module.scss";
import { useRouter } from "next/router";
import { auth, db } from "../../firebaseconfig";
import Link from "next/link";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
  direction: "",
  city: "",
  country: "",
  phone: "",
  list: [],
};

export default function LoginUser() {
  const router = useRouter();

  const [dataLogin, setDataLogin] = useState(initialState);
  console.log("initial", dataLogin);

  function saveState(event) {
    // initialState[event.target.name] = event.target.value;
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
        console.log("res", res.user.uid);
        db.collection(res.user.uid).add(dataLogin);
        alert("Usuario registrado");
        router.push("/");
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
          <h2 className={styles.titleLogin}>Crear cuenta</h2>
          <div className={styles.cardLogin}>
            <div className={styles.contInpReg}>
              <div>
                <p className={styles.upInputLogin}>Nombre completo</p>
                <input
                  className={styles.inputLogin}
                  type="text"
                  placeholder="Nombre completo"
                  name="name"
                  onChange={saveState}
                  value={dataLogin.name}
                />
              </div>
              <div>
                <p className={styles.upInputLogin}>Email</p>
                <input
                  className={styles.inputLogin}
                  type="texto"
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
              <div>
                <p className={styles.upInputLogin}>Confirma Password</p>
                <input
                  className={styles.inputLogin}
                  type="password"
                  placeholder="Confirma Password"
                  name="cPassword"
                  onChange={saveState}
                  value={dataLogin.cPassword}
                />
                <p>
                  {dataLogin.password !== dataLogin.cPassword &&
                    "Password no coincide"}
                </p>
              </div>
              <div>
                <p className={styles.upInputLogin}>Dirección</p>
                <input
                  className={styles.inputLogin}
                  type="text"
                  placeholder="Dirección"
                  name="direction"
                  onChange={saveState}
                  value={dataLogin.direction}
                />
              </div>
            </div>
            <div className={styles.contInpReg}>
              <div>
                <p className={styles.upInputLogin}>Ciudad</p>
                <input
                  className={styles.inputLogin}
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  onChange={saveState}
                  value={dataLogin.city}
                />
              </div>
              <div>
                <p className={styles.upInputLogin}>País</p>
                <input
                  className={styles.inputLogin}
                  type="text"
                  placeholder="País"
                  name="country"
                  onChange={saveState}
                  value={dataLogin.country}
                />
              </div>
              <div>
                <p className={styles.upInputLogin}>Teléfono</p>
                <input
                  className={styles.inputLogin}
                  type="number"
                  placeholder="Teléfono"
                  name="phone"
                  onChange={saveState}
                  value={dataLogin.phone}
                />
              </div>
            </div>
          </div>
          <div className={styles.contbtna}>
            <button className={styles.btnL} onClick={register}>
              Registrarte
            </button>
            <div className={styles.contetContaseña}>
            <Link href="/">
              <a className={styles.aContaseña}>
                ¿Ya tienes una cuenta? Iniciar sesión
              </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
