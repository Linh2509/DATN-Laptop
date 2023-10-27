import { app, database } from "../../firebaseConfig.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./ListProduct.css";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";

import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const cx = classNames.bind(styles);

function ListProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Lấy danh sách sản phẩm từ Firestore
    const fetchProducts = async () => {
      const productCollection = collection(database, "laptops");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  let temp1 = localStorage.getItem("accessAdmin");

  useEffect(() => {
    if (temp1 == "admin") {
      navigate("/admin/product");
    } else {
      navigate("/");
    }
  }, []);

  const handleEditProduct = (productId) => {
    // Chuyển hướng đến trang sửa sản phẩm
    navigate(`/admin/product/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Xóa sản phẩm từ Firestore
      const productRef = doc(database, "laptops", productId);
      await deleteDoc(productRef);
      console.log(`Đã xóa sản phẩm với ID: ${productId}`);

      // Cập nhật danh sách sản phẩm
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="list-product">
      <div className={cx("head")}>
        <h2>Danh sách sản phẩm</h2>
        <Link to="/admin">Trang chủ admin</Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  className={cx("cover-img")}
                  src={product.imageLink}
                  alt=""
                />
              </td>
              <td>{product.name}</td>
              <td>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </td>
              <td>
                <Link to={`/admin/product/${product.id}`}>Xem chi tiết</Link>
                <button
                  className="btn-action btn-info"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Sửa
                </button>
                <button
                  className="btn-action btn-danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduct;
