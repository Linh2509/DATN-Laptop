import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import "./Order.css";

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
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const cx = classNames.bind(styles);
const firestore = getFirestore(app);

function Order() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const collectionOrder = collection(database, "order");
  const productQuery = query(collectionOrder, where("userID", "==", id));

  useEffect(() => {
    const unsubscribe = onSnapshot(productQuery, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(newOrders);
    });

    return () => unsubscribe();
  }, [productQuery]);

  const handleViewDetail = async (order) => {
    setSelectedOrder(order);
    if (order && order.products) {
      const productIdsAndQuantities = Object.values(order.products).map(
        (item) => ({
          id: item.productID,
          quantity: item.quantity,
        })
      );

      try {
        const productPromises = productIdsAndQuantities.map(async (item) => {
          const productRef = doc(database, "laptops", item.id);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            const productData = {
              id: productSnapshot.id,
              ...productSnapshot.data(),
              quantity: item.quantity,
            };

            return productData;
          } else {
            return null;
          }
        });

        const productsData = await Promise.all(productPromises);

        console.log("Danh sách id và số lượng sản phẩm:", productsData);
        setSelectedProducts(productsData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const orderRef = doc(database, "order", orderId);
      await deleteDoc(orderRef);
      console.log(`Đã xóa đơn hàng với ID: ${orderId}`);
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
    }
  };

  const handlePayment = () => {
    if (selectedOrder) {
      const orderId = selectedOrder.id;
      // Thêm orderId vào URL khi chuyển hướng đến trang Confirm
      return (
        <Link className={cx("text-link")} to={`/confirm/${orderId}`}>
          Thanh toán
        </Link>
      );
    }
  };

  // Tính tổng tiền sản phẩm
  const totalAmount = selectedProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

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
                <th>Order</th>
                <th>Mã đơn hàng</th>
                <th>Ngày tạo đơn hàng</th>
                <th>Thành tiền</th>
                <th>Xem chi tiết đơn hàng</th>
              </tr>
            </thead>
            <tbody className={cx("body-tb")}>
              {orders.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className={cx("cover-img")} src={logo} alt="" />
                  </td>
                  <td className={cx("break", "name-column")}>{item.id}</td>
                  <td>
                    {item.timestamp
                      ? new Intl.DateTimeFormat("vi-VN", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }).format(item.timestamp.toDate())
                      : "Không có dữ liệu thời gian"}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.total)}
                  </td>
                  <td>
                    <button
                      className="btn btn-success mg0"
                      onClick={() => handleViewDetail(item)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="btn btn-danger mg0"
                      onClick={() => handleDeleteOrder(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedOrder && (
          <>
            <div className={cx("section002")}>
              <table className={cx("table-cart")}>
                <thead className={cx("head-tb")}>
                  <tr>
                    <th>Laptop</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody className={cx("body-tb")}>
                  {selectedProducts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          className={cx("cover-img")}
                          src={item.imageLink}
                          alt=""
                        />
                      </td>
                      <td className={cx("break", "name-column")}>
                        {item.name}
                      </td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={cx("section003")}>
              <div className={cx("price")}>
                <div className={cx("l-price")}>
                  <p>Tổng tiền</p>
                </div>
                <div className={cx("r-price")}>
                  <p>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount)}
                  </p>
                </div>
              </div>
              <button className={cx("payment")}>{handlePayment()}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
