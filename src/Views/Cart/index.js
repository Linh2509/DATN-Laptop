import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { app, database } from "../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  onSnapshot,
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

function Cart() {
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  const collectionCart = collection(database, "cart");
  const productQuery = query(collectionCart, where("userID", "==", id));

  console.log(id);

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

  // const clearCartByUserID = async (id) => {
  //   try {
  //     // Lấy danh sách các bản ghi thỏa mãn truy vấn
  //     const snapshot = await getDocs(productQuery);

  //     // Lặp qua từng bản ghi và xóa chúng
  //     snapshot.forEach(async (doc) => {
  //       const cartDocRef = doc(collectionCart, doc.id);
  //       await deleteDoc(cartDocRef);
  //       console.log(`Đã xóa cart với ID: ${doc.id}`);
  //     });

  //     console.log("Đã xóa dữ liệu của Cart thành công");
  //   } catch (error) {
  //     console.error("Lỗi khi xóa dữ liệu của Cart:", error);
  //   }
  // };

  // const clearCartUser = async (id) => {
  //   const firestore = getFirestore();
  //   const collectionRef = collection(firestore, "cart", id);

  //   const snapshot = await getDocs(collectionRef);

  //   snapshot.forEach((doc) => {
  //     deleteDoc(doc(collectionRef, doc.id))
  //       .then(() => {
  //         console.log(`Đã xóa tài liệu ${doc.id} thành công`);
  //       })
  //       .catch((error) => {
  //         console.error(`Lỗi khi xóa tài liệu ${doc.id}:`, error);
  //       });
  //   });
  // };

  const handlePayment = async () => {
    try {
      // Tạo một bản ghi mới trong bảng "order"
      const orderRef = await addDoc(collection(database, "order"), {
        userID: id,
        products: cart.map((item) => ({
          productID: item.laptopDetails.id,
          quantity: item.quantity,
          totalPrice: item.laptopDetails.price * item.quantity,
        })),
        timestamp: serverTimestamp(),
      });

      console.log("Đã tạo đơn hàng thành công:", orderRef.id);

      await clearCartUser(id);

      // Nếu cần, sau khi tạo đơn hàng, bạn có thể xóa các sản phẩm từ giỏ hàng
      // Chú ý: Bạn cần cập nhật lại giỏ hàng ở phía client để hiển thị đúng trạng thái
      setCart([]);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

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
