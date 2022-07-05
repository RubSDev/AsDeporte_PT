import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseconfig";
import { useRouter } from "next/router";

import styles from "./userlist.module.scss";
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

export default function UserLiast() {
  const [product, setProduct] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [user, setUser] = useState();
  console.log("user", user);
  const [dataUser, setDataUser] = useState(initialState);
  const router = useRouter();

  const addProduct = (e) => {
    e.preventDefault();
    if (product.length !== 0) {
      const newList = [...dataUser.list, product];
      const newUser = { ...dataUser };
      newUser.list = newList;
      setDataUser(newUser);
      setProduct("");
    }
  };
  const deleteProduct = (e, product) => {
    e.preventDefault();
    const newListProduct = dataUser.list.filter((item) => item !== product);
    const newUser = { ...dataUser };
    newUser.list = newListProduct;
    setDataUser(newUser);
  };

  useEffect(() => {
    const getUser = async () => {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/");
        }
      });
      if (user) {
        const { docs } = await db.collection(user.uid).get();
        const newArray = docs.map((item) => ({ id: item.id, ...item.data() }));
        console.log("array", docs);
        setDataUser(newArray[0]);
      }
    };
    getUser();
  }, [user]);

  async function saveList(e) {
    e.preventDefault();
    console.log(dataUser);
    const update = await db.collection(user.uid).doc(dataUser.id).set(dataUser);
    const { docs } = await db.collection(user.uid).get();
    const newArray = docs.map((item) => ({ id: item.id, ...item.data() }));
    setDataUser(newArray[0]);
    alert("lista actualizada");
  }

  return (
    <>
      {user && (
        <div className={styles.NavScss}>
          <div className={styles.containerListAndImg}>
            <div className={styles.contImgLADM}>
              <img
                className={styles.imgListM}
                src="/imgasdm.png"
                alt="Logo AsDeporte"
              />
            </div>

            <div className={styles.containerList}>
              <div className={styles.contImgLADW}>
                <img
                  className={styles.imgListW}
                  src="/imgasdw.png"
                  alt="Logo AsDeporte"
                />
              </div>
              <div className={styles.contListp}>
                <form className={styles.contentList}>
                  <div className={styles.cardList}>
                    <h2 className={styles.titleList}>Ingresar producto</h2>
                    <div>
                      <p className={styles.upInputList}>Producto</p>
                      <input
                        className={styles.inputList}
                        type="text"
                        placeholder="Producto"
                        name="producto"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      />
                    </div>
                    <button
                      className={styles.btnpLA}
                      onClick={(e) => addProduct(e)}
                    >
                      Agregar
                    </button>
                    <button className={styles.btnL} onClick={saveList}>
                      Salvar Lista
                    </button>
                  </div>
                  <div className={styles.contProducL}>
                    <h5 className={styles.titleProdcList}>Productos</h5>
                    {dataUser.list.map((item, index) => (
                      <div key={index} className={styles.contProducList}>
                        <p className={styles.ppList}>{item}</p>
                        <button
                          className={styles.btnpL}
                          onClick={(e) => deleteProduct(e, item)}
                        >
                          ELIMINAR
                        </button>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
