import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

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

function Users() {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    cccd: "",
    birthdate: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userRef = doc(database, "users", id);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserInfo(userData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    getUserInfo();
  }, [id]);

  const handleConfirm = async () => {
    try {
      const userRef = doc(database, "users", id);
      await updateDoc(userRef, {
        fullName: userInfo.fullName || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        cccd: userInfo.cccd || "",
        birthdate: userInfo.birthdate || "",
      });

      console.log("Thông tin người dùng đã được cập nhật");
    } catch (error) {
      // console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setNewPassword((prevNewPassword) => ({
      ...prevNewPassword,
      [name]: value,
    }));
  };

  const handleChangePasswordClick = () => {
    setShowChangePasswordForm(true);
  };

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (newPassword.password === newPassword.passwordConfirm) {
        const userRef = doc(database, "users", id);
        await updateDoc(userRef, {
          password: newPassword.password,
        });

        updatePassword(user, newPassword.password)
          .then(() => {})
          .catch((error) => {
            console.error("Lỗi khi cập nhật mật khẩu:", error);
          });

        console.log("Mật khẩu đã được cập nhật");
        setShowChangePasswordForm(false);
      } else {
        alert("Mật khẩu không trùng khớp");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <h3 className={cx("title")}>Thông tin cá nhân</h3>
        </div>
        <div
          className={`modal ${showChangePasswordForm ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: showChangePasswordForm ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thay đổi password</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowChangePasswordForm(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form để người dùng nhập thông tin */}
                <form>
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={newPassword.password}
                      onChange={handleChange2}
                      name="password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordConfirm"
                      value={newPassword.passwordConfirm}
                      onChange={handleChange2}
                      name="passwordConfirm"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowChangePasswordForm(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
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
              required
              value={userInfo.fullName}
              onChange={handleChange}
            />
            <br />
            <label className={cx("text-label")} htmlFor="birthdate">
              Ngày sinh
            </label>
            <input
              type="date"
              className={cx("text-input")}
              name="birthdate"
              value={userInfo.birthdate}
              onChange={handleChange}
            />
            <br />
            <label className={cx("text-label")} htmlFor="phone">
              Số điện thoại
            </label>
            <input
              className={cx("text-input")}
              placeholder="0123456789"
              name="phone"
              required
              value={userInfo.phone}
              onChange={handleChange}
            />
            <br />
            <label className={cx("text-label")} htmlFor="address">
              Địa chỉ
            </label>
            <input
              className={cx("text-input")}
              placeholder="Số nhà, đường, xóm, thôn, xã, huyện, thành phố"
              name="address"
              required
              value={userInfo.address}
              onChange={handleChange}
            />
            <br />
            <label className={cx("text-label")} htmlFor="cccd">
              CMND/CCCD
            </label>
            <input
              className={cx("text-input")}
              placeholder="001234567890"
              name="cccd"
              required
              value={userInfo.cccd}
              onChange={handleChange}
            />
            <br />
          </form>
        </div>

        <div className={cx("section003")}>
          <div className={cx("submit-btn")}>
            <button className={cx("confirm-btn")} onClick={handleConfirm}>
              Xác nhận
            </button>
            <button
              className={cx("confirm-btn")}
              onClick={handleChangePasswordClick}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
