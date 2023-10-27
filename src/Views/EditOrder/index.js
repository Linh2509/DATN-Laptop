import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig.js";

function EditOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(database, "orderStatus", id);
        const orderDoc = await getDoc(orderRef);
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          console.log("Đơn hàng không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSaveClick = async () => {
    try {
      const orderRef = doc(database, "orderStatus", id);
      await updateDoc(orderRef, { orderDescription: order.orderDescription });
      console.log("Đã cập nhật thông tin đơn hàng");
      navigate("/admin/ordered"); // Điều hướng về danh sách đơn hàng sau khi lưu
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Chỉnh sửa đơn hàng</h2>
      <label>
        Tình trạng:
        <input
          type="text"
          value={order.orderDescription}
          onChange={(e) =>
            setOrder({ ...order, orderDescription: e.target.value })
          }
        />
      </label>
      <button className="btn btn-success mg0" onClick={handleSaveClick}>
        Lưu
      </button>
    </div>
  );
}

export default EditOrder;
