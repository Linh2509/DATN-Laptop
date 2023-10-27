import classNames from "classnames/bind";
import styles from "./ListOrdered.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../firebaseConfig.js";

const cx = classNames.bind(styles);
function ListOrdered() {
  const [ordered, setOrdered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderedData = async () => {
      const orderStatusCollection = collection(database, "orderStatus");
      const orderStatusSnapshot = await getDocs(orderStatusCollection);
      const orderStatusList = orderStatusSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdered(orderStatusList);
    };

    fetchOrderedData();
  }, []);

  const handleEditClick = (id) => {
    // Chuyển người dùng đến trang sửa đơn hàng
    navigate(`/admin/ordered/edit/${id}`);
  };

  const handleDeleteClick = async (id) => {
    // Thực hiện xóa đơn hàng có ID là 'id'
    try {
      // Xóa sản phẩm từ Firestore
      const orderedRef = doc(database, "orderStatus", id);
      await deleteDoc(orderedRef);
      console.log(`Đã xóa sản phẩm với ID: ${id}`);

      // Cập nhật danh sách đơn hàng
      const updatedOrdered = ordered.filter((order) => order.id !== id);
      setOrdered(updatedOrdered);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <div className={cx("head")}>
        <h2>Danh sách đơn đặt hàng</h2>
        <Link to="/admin">Trang chủ admin</Link>
      </div>
      <table className="ordered-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>ID đơn hàng</th>
            <th>Tình trạng</th>
            <th>Thời gian đặt hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((order) => (
            <tr key={order.id}>
              <td>
                <img className={cx("cover-img")} src={Logo} alt="" />
              </td>
              <td>{order.id}</td>
              <td>{order.orderDescription}</td>
              <td>
                {new Date(order.timestamp.seconds * 1000).toLocaleString()}
              </td>
              <td>
                <button
                  className="btn-action btn-info"
                  onClick={() => handleEditClick(order.id)}
                >
                  Sửa
                </button>
                <button
                  className="btn-action btn-danger"
                  onClick={() => handleDeleteClick(order.id)}
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

export default ListOrdered;
