import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import screenLogo from "../../assets/Screen.png";
import cpuLogo from "../../assets/Cpu.png";
import ramLogo from "../../assets/Ram.png";
import hddLogo from "../../assets/Hdd.png";
import graphicsLogo from "../../assets/Graphics.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  documentId,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
} from "firebase/firestore"; // Import các thư viện cần thiết
import { app, database } from "../../firebaseConfig.js";

const cx = classNames.bind(styles);

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const userCookie = Cookies.get("userId");

  const collectionProduct = collection(database, "laptops");
  const productQuery = query(collectionProduct, where(documentId(), "==", id));

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    onSnapshot(productQuery, (data) => {
      const detailProduct = data.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      setProduct(detailProduct[0]);
      // setLoading(false);
      console.log(detailProduct);
    });
  };

  const checkLogin = () => {
    if (!userCookie) {
      navigate("/login");
    } else {
      return 1;
    }
  };

  const handleBuyNow = () => {
    if (checkLogin() === 1) {
      const collectionRef = collection(database, "cart");
      const cartItemRef = query(
        collectionRef,
        where("userID", "==", userCookie),
        where("productID", "==", id)
      );

      getDocs(cartItemRef).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const cartItemData = doc.data();
            const quantity = cartItemData.quantity || 0;
            const newQuantity = quantity + 1;

            // Cập nhật quantity
            updateDoc(doc.ref, { quantity: newQuantity })
              .then(() => {
                navigate(`/cart/${userCookie}`);
              })
              .catch((error) => {
                console.error("Error updating quantity: ", error);
              });
          });
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
          addDoc(collectionRef, {
            userID: userCookie,
            productID: id,
            quantity: 1,
          })
            .then(() => {
              navigate(`/cart/${userCookie}`);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
      });
    }
  };

  const handleAddCart = () => {
    if (checkLogin() === 1) {
      const collectionRef = collection(database, "cart");
      const cartItemRef = query(
        collectionRef,
        where("userID", "==", userCookie),
        where("productID", "==", id)
      );

      getDocs(cartItemRef).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const cartItemData = doc.data();
            const quantity = cartItemData.quantity || 0;
            const newQuantity = quantity + 1;

            // Cập nhật quantity
            updateDoc(doc.ref, { quantity: newQuantity })
              .then(() => {
                alert("Quantity increased in Cart");
              })
              .catch((error) => {
                console.error("Error updating quantity: ", error);
              });
          });
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
          addDoc(collectionRef, {
            userID: userCookie,
            productID: id,
            quantity: 1,
          })
            .then(() => {
              alert("Data Added to Cart");
            })
            .catch((err) => {
              alert(err.message);
            });
        }
      });
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <div className={cx("title-name")}>
            <h3 className={cx("name")}>{product.name}</h3>
          </div>
        </div>

        <div className={cx("section002")}>
          <div className={cx("box-main")}>
            <div className={cx("box-left")}>
              <div className={cx("left-layout")}>
                <div className={cx("img-box")}>
                  <img
                    className={cx("cover-img")}
                    src={product.imageLink}
                    alt=""
                  />
                </div>
                <div className={cx("st-param")}>
                  <ul>
                    <li>
                      <span>
                        <img
                          className={cx("logo-card")}
                          src={screenLogo}
                          alt=""
                        />
                      </span>
                      <p>{product.desktop}</p>
                    </li>

                    <li>
                      <span>
                        <img className={cx("logo-card")} src={cpuLogo} alt="" />
                      </span>
                      <p>{product.cpu}</p>
                    </li>

                    <li>
                      <span>
                        <img className={cx("logo-card")} src={ramLogo} alt="" />
                      </span>
                      <p>{product.ram}</p>
                    </li>

                    <li>
                      <span>
                        <img className={cx("logo-card")} src={hddLogo} alt="" />
                      </span>
                      <p>{product.hardware}</p>
                    </li>

                    <li>
                      <span>
                        <img
                          className={cx("logo-card")}
                          src={graphicsLogo}
                          alt=""
                        />
                      </span>
                      <p>{product.graphics}</p>
                    </li>
                  </ul>

                  <button className={cx("btn-show")}>
                    Xem thông số kỹ thuật
                  </button>
                </div>
                <div className={cx("policy")}>
                  <div className={cx("policy-left")}>
                    <p>Hàng chính hãng</p>
                    <p>Giao hàng miễn phí trong 90 phút</p>
                    <p>Chính sách đổi trả </p>
                  </div>
                  <div className={cx("policy-right")}>
                    <p>Bảo hành 24 Tháng</p>
                    <p>Hỗ trợ cài đặt miễn phí</p>
                    <p>Chính sách trả góp</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("box-right")}>
              <div className={cx("right-layout")}>
                <div className={cx("price")}>
                  <div className={cx("new-price")}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </div>
                  <div className={cx("old-price")}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.oldPrice)}
                  </div>
                </div>
                <h3>Thông số kỹ thuật chi tiết</h3>
                <table className={cx("st-pd-table")}>
                  <tbody>
                    <tr className={cx("bg-table-1")}>
                      <td className={cx("w30")}>Màn hình</td>
                      <td className={cx("w70")}>{product.desktop}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>CPU</td>
                      <td>{product.cpu}</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>RAM</td>
                      <td>{product.ram}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Ổ cứng</td>
                      <td>{product.hardware}</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Đồ họa</td>
                      <td>{product.graphics}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Hệ điều hành</td>
                      <td>{product.system}</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Trọng lượng</td>
                      <td>{product.weight}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Kích thước</td>
                      <td>359 x 256 x 24.9 mm</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Xuất xứ</td>
                      <td>Trung Quốc</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Năm ra mắt</td>
                      <td>{product.year}</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Âm thanh</td>
                      <td>{product.sound}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Bàn phím & TouchPad</td>
                      <td>Backlit Chiclet Keyboard</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Thông tin pin & Sạc</td>
                      <td>{product.battery}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Bảo mật</td>
                      <td>Mật khẩu</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Cổng kết nối</td>
                      <td>{product.memory}</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Màn hình cảm ứng</td>
                      <td>{product.screenTouch}</td>
                    </tr>
                    <tr className={cx("bg-table-1")}>
                      <td>Độ phủ màu</td>
                      <td>45% NTSC</td>
                    </tr>
                    <tr className={cx("bg-table-2")}>
                      <td>Tấm nền</td>
                      <td>IPS</td>
                    </tr>
                  </tbody>
                </table>
                <div className={cx("st-pd-btn")}>
                  <button className={cx("btn-buy")} onClick={handleBuyNow}>
                    <div>
                      <strong>MUA NGAY</strong>
                    </div>
                    <p>Giao hàng miễn phí hoặc nhận tại shop</p>
                  </button>
                  <div className={cx("installment-cart")}>
                    <button className={cx("btn-installment-cart")}>
                      <div>
                        <strong>Trả góp 0%</strong>
                      </div>
                    </button>
                    <button
                      className={cx("btn-installment-cart")}
                      onClick={handleAddCart}
                    >
                      <div>
                        <strong>Thêm vào giỏ hàng</strong>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
