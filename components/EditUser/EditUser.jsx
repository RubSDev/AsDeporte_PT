import React, { useEffect, useState } from "react";
import styles from "./edituser.module.scss";
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

  const [user, setUser] = useState();

  const [dataLogin, setDataLogin] = useState(initialState);

  useEffect(() => {
    const getUser = async () => {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user.uid);
        } else {
          router.push("/");
        }
      });
      if (user) {
        const { docs } = await db.collection(user).get();
        const newArray = docs.map((item) => ({ id: item.id, ...item.data() }));
        setDataLogin(newArray[0]);
      }
    };
    getUser();
  }, [user]);

  function saveState(event) {
    // initialState[event.target.name] = event.target.value;
    setDataLogin({
      ...dataLogin,
      [event.target.name]: event.target.value,
    });
  }

  async function register(event) {
    event.preventDefault();
    const update = await db.collection(user).doc(dataLogin.id).set(dataLogin);
    const { docs } = await db.collection(user).get();

    const newArray = docs.map((item) => ({ id: item.id, ...item.data() }));
    setDataLogin(newArray[0]);
    alert("Usuario actualizado");
  }

  return (
    <>
      {user && (
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
              <h2 className={styles.titleLogin}>Editar cuenta</h2>
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
                      disabled
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
                      disabled
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
                      disabled
                    />
                    <p>
                      {dataLogin.password !== dataLogin.cPassword &&
                        "Password no coincide"}
                    </p>
                  </div>
                  <div>
                    <p className={styles.upInputLogin}>Direcci??n</p>
                    <input
                      className={styles.inputLogin}
                      type="text"
                      placeholder="Direcci??n"
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
                    <p className={styles.upInputLogin}>Pa??s</p>
                    <input
                      className={styles.inputLogin}
                      type="text"
                      placeholder="Pa??s"
                      name="country"
                      onChange={saveState}
                      value={dataLogin.country}
                    />
                  </div>
                  <div>
                    <p className={styles.upInputLogin}>Tel??fono</p>
                    <input
                      className={styles.inputLogin}
                      type="number"
                      placeholder="Tel??fono"
                      name="phone"
                      onChange={saveState}
                      value={dataLogin.phone}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.contbtna}>
                <button className={styles.btnL} onClick={register}>
                  Actualizar
                </button>
                <div className={styles.contetContase??a}>
                  <Link href="/user-list">
                    <a className={styles.aContase??a}>
                      Volver a lista de compras
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
