import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig.js";
import classNames from "classnames/bind";
import styles from "./EditProduct.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const EditProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    // Khởi tạo state formData với các trường tương ứng
    name: "",
    price: 0,
    oldPrice: "",
    brand: "",
    cpu: "",
    desktop: "",
    graphics: "",
    hardware: "",
    ram: "",
    battery: "",
    colorCoverage: "",
    keyTouch: "",
    screenTouch: "",
    memory: "",
    year: "",
    panel: "",
    sound: "",
    system: "",
    weight: "",
    imageLink: "",
    display: 1,
    // ...
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(database, "laptops", id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProduct(productData);

          // Khởi tạo giá trị ban đầu cho formData
          setFormData({
            name: productData.name,
            price: productData.price,
            oldPrice: productData.oldPrice,
            brand: productData.brand,
            cpu: productData.cpu,
            desktop: productData.desktop,
            graphics: productData.graphics,
            hardware: productData.hardware,
            ram: productData.ram,
            battery: productData.battery,
            colorCoverage: productData.colorCoverage,
            keyTouch: productData.keyTouch,
            screenTouch: productData.screenTouch,
            memory: productData.memory,
            year: productData.year,
            panel: productData.panel,
            sound: productData.sound,
            system: productData.system,
            weight: productData.weight,
            imageLink: productData.imageLink,
          });
        } else {
          console.log("Không tìm thấy sản phẩm");
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const productRef = doc(database, "laptops", id);
      await updateDoc(productRef, formData);
      console.log("Sản phẩm đã được cập nhật");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {" "}
        {product ? (
          <>
            <h1>Sửa sản phẩm</h1>
            <form>
              <div>
                <label>Tên sản phẩm:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Giá hiện tại:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Giá cũ:</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Hãng:</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Bộ xử lý:</label>
                <input
                  type="text"
                  name="cpu"
                  value={formData.cpu}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Màn hình:</label>
                <input
                  type="text"
                  name="desktop"
                  value={formData.desktop}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Đồ họa:</label>
                <input
                  type="text"
                  name="graphics"
                  value={formData.graphics}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Ổ cứng:</label>
                <input
                  type="text"
                  name="hardware"
                  value={formData.hardware}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Bộ nhớ tạm:</label>
                <input
                  type="text"
                  name="ram"
                  value={formData.ram}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Pin:</label>
                <input
                  type="text"
                  name="battery"
                  value={formData.battery}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Độ phủ màu:</label>
                <input
                  type="text"
                  name="colorCoverage"
                  value={formData.colorCoverage}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Phím bấm:</label>
                <input
                  type="text"
                  name="keyTouch"
                  value={formData.keyTouch}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Cảm ứng màn hình:</label>
                <input
                  type="text"
                  name="screenTouch"
                  value={formData.screenTouch}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Ổ cắm:</label>
                <input
                  type="text"
                  name="memory"
                  value={formData.memory}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Năm:</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Tấm nền:</label>
                <input
                  type="text"
                  name="panel"
                  value={formData.panel}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Âm thanh:</label>
                <input
                  type="text"
                  name="sound"
                  value={formData.sound}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Hệ thống:</label>
                <input
                  type="text"
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Cân nặng:</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Đường dẫn ảnh sản phẩm:</label>
                <input
                  type="text"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <Link to="../../admin/product">
              <button className="btn btn-success" onClick={handleSaveChanges}>
                Lưu thay đổi
              </button>
            </Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
