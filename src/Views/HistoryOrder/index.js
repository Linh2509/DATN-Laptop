import classNames from "classnames/bind";
import styles from "./HistoryOrder.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import "./History.css";

import { app, database } from "../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  documentId,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const cx = classNames.bind(styles);
const firestore = getFirestore(app);

function HistoryOrder() {
  const { id } = useParams();

  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productInfoList, setProductInfoList] = useState([]);

  const getHistoryData = async () => {
    const firestore = getFirestore(app);

    try {
      const orderStatusCollectionRef = collection(firestore, "orderStatus");
      const q = query(orderStatusCollectionRef, where("userID", "==", id));
      const querySnapshot = await getDocs(q);

      const orderStatusList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Danh sách lịch sử đơn hàng:", orderStatusList);
      return orderStatusList;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch sử đơn hàng:", error);
      return [];
    }
  };

  useEffect(() => {
    getHistoryData().then((data) => {
      setOrderHistoryList(data);
    });
  }, []);

  const handleViewDetail = async (orderID) => {
    try {
      setProductInfoList([]);
      const orderRef = doc(database, "order", orderID);
      const orderSnapshot = await getDoc(orderRef);

      if (orderSnapshot.exists()) {
        const orderData = {
          id: orderSnapshot.id,
          ...orderSnapshot.data(),
        };
        console.log("Chi tiết đơn hàng:", orderData);

        // Lặp qua danh sách các sản phẩm trong đơn hàng
        for (const product of orderData.products) {
          const productID = product.productID;
          const productQuantity = product.quantity;

          const productRef = doc(database, "laptops", productID);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            const productData = {
              id: productSnapshot.id,
              ...productSnapshot.data(),
              quantity: productQuantity,
            };
            console.log("Thông tin sản phẩm:", productData);

            // Thêm thông tin sản phẩm vào danh sách
            setProductInfoList((prevList) => [
              ...prevList,
              {
                id: productData.id,
                name: productData.name,
                quantity: productData.quantity,
                price: productData.price,
                imageLink: productData.imageLink,
              },
            ]);
          } else {
            console.error("Sản phẩm không tồn tại");
          }
        }
      } else {
        console.error("Đơn hàng không tồn tại");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đơn hàng:", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <h3 className={cx("title")}>Danh sách đơn hàng</h3>
        </div>
        <div className={cx("section002")}>
          <table className={cx("table-cart")}>
            <thead className={cx("head-tb")}>
              <tr>
                <th>Đơn hàng</th>
                <th>Mã đơn hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Tình trạng đơn hàng</th>
                <th>Xem chi tiết đơn hàng</th>
              </tr>
            </thead>
            <tbody className={cx("body-tb")}>
              {orderHistoryList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className={cx("cover-img")} src={logo} alt="" />
                  </td>
                  <td className={cx("break", "name-column")}>{item.orderID}</td>
                  <td>
                    {new Date(item.timestamp.seconds * 1000).toLocaleString()}
                  </td>
                  <td>{item.orderDescription}</td>
                  <td>
                    <button
                      className="btn btn-success mg0"
                      onClick={() => handleViewDetail(item.orderID)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productInfoList.length > 0 && (
          <>
            <h4>Thông tin đơn hàng:</h4>
            <div className={cx("section002")}>
              <table className={cx("table-cart")}>
                <thead className={cx("head-tb")}>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody className={cx("body-tb")}>
                  {productInfoList.map((product, index) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          className={cx("cover-img")}
                          src={product.imageLink}
                          alt=""
                        />
                      </td>
                      <td className={cx("break", "name-column")}>
                        {product.name}
                      </td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price * product.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryOrder;
