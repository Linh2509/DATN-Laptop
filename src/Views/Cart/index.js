import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

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

function Cart() {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const collectionCart = collection(database, "cart");
  const productQuery = query(collectionCart, where("userID", "==", id));

  // console.log(id);

  useEffect(() => {
    GetData();
  }, []);

  const getLaptopDetails = async (productID) => {
    const laptopRef = doc(collection(database, "laptops"), productID);
    const laptopSnapshot = await getDoc(laptopRef);

    if (laptopSnapshot.exists()) {
      return { id: laptopSnapshot.id, ...laptopSnapshot.data() };
    } else {
      return null; // Trường hợp không tìm thấy sản phẩm
    }
  };

  const GetData = async () => {
    try {
      const snapshot = await getDocs(productQuery);
      const detailCart = snapshot.docs.map(async (item) => {
        const cartData = { id: item.id, ...item.data() };
        const laptopDetails = await getLaptopDetails(cartData.productID);
        return { ...cartData, laptopDetails };
      });

      const resolvedDetailCart = await Promise.all(detailCart);

      console.log(resolvedDetailCart);
      setCart(resolvedDetailCart);
    } catch (err) {
      console.error("Error getting documents: ", err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: parseInt(newQuantity, 10), // Đảm bảo là số nguyên
        };
      }
      return item;
    });
    setCart(updatedCart);

    try {
      const cartRef = doc(database, "cart", productId);
      await updateDoc(cartRef, { quantity: parseInt(newQuantity, 10) });
      console.log("Đã cập nhật số lượng trong giỏ hàng lên Firebase");
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng trong giỏ hàng: ", error);
    }
  };

  const totalAmount = cart.reduce((acc, item) => {
    const itemTotal = item.laptopDetails.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const getDocumentIdsByUserID = async () => {
    const productQuery = query(collectionCart, where("userID", "==", id));

    try {
      const snapshot = await getDocs(productQuery);
      const documentIds = snapshot.docs.map((doc) => doc.id);
      return documentIds;
    } catch (err) {
      console.error("Error getting documents: ", err);
      return [];
    }
  };

  const clearCartByDocumentIds = async (documentIds) => {
    try {
      documentIds.forEach(async (docId) => {
        const cartDocRef = doc(collectionCart, docId);
        await deleteDoc(cartDocRef);
        console.log(`Đã xóa cart với ID: ${doc.id}`);
      });

      console.log(`Đã xóa cart với ID: ${doc.id}`);
      console.log("Đã xóa các tài liệu trong giỏ hàng thành công");
    } catch (error) {
      console.error("Lỗi khi xóa tài liệu trong giỏ hàng:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const documentIds = await getDocumentIdsByUserID();
      // Tạo một bản ghi mới trong bảng "order"
      const orderRef = await addDoc(collection(firestore, "order"), {
        userID: id,
        products: cart.map((item) => ({
          productID: item.laptopDetails.id,
          quantity: item.quantity,
          totalPrice: item.laptopDetails.price * item.quantity,
        })),
        total: totalAmount,
        timestamp: serverTimestamp(),
      });

      console.log("Đã tạo đơn hàng thành công:", orderRef.id);

      // Xóa giỏ hàng sau khi thanh toán
      await clearCartByDocumentIds(documentIds);

      // Cập nhật lại giỏ hàng ở phía client để hiển thị đúng trạng thái
      setCart([]);
      navigate(`/confirm/${orderRef.id}`);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  if (cart.length < 1) {
    return (
      <div className={cx("wrapper")}>
        <p>Giỏ hàng của bạn đang trống</p>

        <Link to="/">
          <p>Quay lại mua hàng</p>
        </Link>
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <h3 className={cx("title")}>Giỏ hàng</h3>
        </div>
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
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      className={cx("cover-img")}
                      src={item.laptopDetails.imageLink}
                      alt=""
                    />
                  </td>
                  <td className={cx("break", "name-column")}>
                    {item.laptopDetails.name}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.laptopDetails.price)}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.laptopDetails.price * item.quantity)}
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
          <button className={cx("payment")} onClick={handlePayment}>
            {/* <Link className={cx("text-link")} to="/confirm"> */}
            <strong>Thanh toán</strong>
            {/* </Link> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
