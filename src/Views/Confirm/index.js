import classNames from "classnames/bind";
import styles from "./Confirm.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

function Confirm() {
  const { id } = useParams();
  const userCookie = Cookies.get("userId");
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orderID: id,
    fullName: "",
    phone: "",
    address: "",
    cccd: "",
    email: "",
    timestamp: serverTimestamp(),
  });

  const getUserInfo = async (userID) => {
    try {
      const userRef = doc(database, "users", userID);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData;
      } else {
        return null; // Trả về null nếu không tìm thấy người dùng
      }
    } catch (error) {
      // console.error("Lỗi khi lấy thông tin người dùng:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserInfo(userCookie);
      if (userData) {
        setUserInfo(userData);
        setFormData({
          ...formData,
          fullName: userData.fullName,
          phone: userData.phone,
          address: userData.address,
          cccd: userData.cccd,
          email: userData.email,
        });
      }
    };
    fetchData();
  }, [userCookie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addInfoToTable = async () => {
    try {
      const docRef = await addDoc(collection(database, "confirm"), {
        ...formData,
      });
      const historyRef = await addDoc(collection(database, "orderStatus"), {
        orderID: id,
        orderDescription: "Đang lấy hàng",
        userID: userCookie,
        timestamp: serverTimestamp(),
      });

      // Cập nhật trạng thái `display` của đơn hàng thành `false`
      const orderRef = doc(database, "order", id);
      await updateDoc(orderRef, {
        display: false,
      });

      console.log("Đã thêm thông tin vào bảng với ID: ", docRef.id);
      console.log("Đã thêm thông tin vào bảng với ID: ", historyRef.id);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi thêm thông tin vào bảng: ", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <h3 className={cx("title")}>Xác nhận thông tin khách hàng</h3>
        </div>

        <div className={cx("section002")}>
          <form className={cx("info-user")}>
            <label className={cx("text-label")} htmlFor="fullName">
              Họ và tên
            </label>
            <input
              className={cx("text-input")}
              placeholder="Nguyen Van A"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <br />
            <label className={cx("text-label")} htmlFor="phone">
              Số điện thoại
            </label>
            <input
              className={cx("text-input")}
              placeholder="0123456789"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <br />
            <label className={cx("text-label")} htmlFor="address">
              Địa chỉ
            </label>
            <input
              className={cx("text-input")}
              placeholder="Số nhà, đường, xóm, thôn, xã, huyện, thành phố"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <br />
            <label className={cx("text-label")} htmlFor="cccd">
              CMND/CCCD
            </label>
            <input
              className={cx("text-input")}
              placeholder="001234567890"
              name="cccd"
              value={formData.cccd}
              onChange={handleChange}
              required
            />
            <br />
            <label className={cx("text-label")} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={cx("text-input")}
              placeholder="google@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
          </form>
        </div>

        <div className={cx("section003")}>
          <div className={cx("submit-btn")}>
            <button className={cx("confirm-btn")} onClick={addInfoToTable}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
