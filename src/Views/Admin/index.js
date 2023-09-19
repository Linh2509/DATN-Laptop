import { app, database } from "../../firebaseConfig.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./Admin.css";

import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [update, setUpdate] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const auth = getAuth();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    age: "",
    role: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
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
  });

  useEffect(() => {
    GetData();
  }, []);

  const collectionRef = collection(database, "users");
  const collectionProduct = collection(database, "laptops");

  const GetData = () => {
    onSnapshot(collectionRef, (data) => {
      const listUser = data.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      setUsers(listUser);
      setLoading(false);
    });
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleAddUser = () => {
    // Thêm người dùng vào Firebase
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(() => {
        console.log("User added successfully!");
        setNewUser({ email: "", password: "", age: "", role: "" });
        setShowAddUserModal(false);
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
      });
    addDoc(collectionRef, {
      email: newUser.email.toLowerCase(),
      password: newUser.password,
      age: parseInt(newUser.age),
      role: false,
    })
      .then(() => {
        alert("Data Added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleAddProduct = () => {
    console.log(newProduct);

    addDoc(collectionProduct, {
      name: newProduct.name,
      price: parseInt(newProduct.price),
      oldPrice: parseInt(newProduct.oldPrice),
      brand: newProduct.brand,
      cpu: newProduct.cpu,
      desktop: newProduct.desktop,
      graphics: newProduct.graphics,
      hardware: newProduct.hardware,
      ram: newProduct.ram,
      battery: newProduct.battery,
      colorCoverage: newProduct.colorCoverage,
      keyTouch: newProduct.keyTouch,
      screenTouch: newProduct.screenTouch,
      memory: newProduct.memory,
      year: parseInt(newProduct.year),
      panel: newProduct.panel,
      sound: newProduct.sound,
      system: newProduct.system,
      weight: newProduct.weight,
      imageLink: newProduct.imageLink,
    })
      .then(() => {
        setShowAddProductModal(false);
        alert("Data Product Added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdate(user);
    console.log("ED");
  };

  const handleSaveClick = () => {
    // Update the user data in Firebase
    const { id, ...updatedUserData } = update;
    // console.log("SAVING1");
    console.log(update);
    const docToUpdate = doc(database, "users", update.id);
    updateDoc(docToUpdate, {
      email: update.email,
      age: update.age,
      role: update.role,
    })
      .then(() => {
        alert("Data updated");
      })
      .catch((err) => {
        alert(err.message);
      });
    // database.collection("users").doc(id).set(updatedUserData);
    setEditingUser(null);
    setUpdate(null);
    // console.log("SAVING2");
  };

  const deleteUser = (id) => {
    const docToDelete = doc(database, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleDeleteClick = (id) => {
    // Gọi hàm xóa với id của mục cần xóa
    deleteUser(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name]: value }));
    // console.log(e.target);
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <Link to="/admin">
            <h1 className="mb-4">Admin Page</h1>
          </Link>
          <button className="btn btn-success" onClick={handleAddUserClick}>
            Add User
          </button>
          <button className="btn btn-success" onClick={handleAddProductClick}>
            Add Product
          </button>
          {/* Modal để thêm người dùng */}
          <div
            className={`modal ${showAddUserModal ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showAddUserModal ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowAddUserModal(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Form để người dùng nhập thông tin */}
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={newUser.email}
                        onChange={handleInputChange1}
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={newUser.password}
                        onChange={handleInputChange1}
                        name="password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input
                        type="text"
                        className="form-control"
                        id="age"
                        value={newUser.age}
                        onChange={handleInputChange1}
                        name="age"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        id="role"
                        value={newUser.role}
                        onChange={handleInputChange1}
                        name="role"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddUser}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal để thêm sản phẩm */}
          <div
            className={`modal ${showAddProductModal ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showAddProductModal ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowAddProductModal(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Form để nhập thông tin sản phẩm */}
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        value={newProduct.name}
                        onChange={handleInputChange2}
                        name="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Price</label>
                      <input
                        type="price"
                        className="form-control"
                        id="price"
                        value={newProduct.price}
                        onChange={handleInputChange2}
                        name="price"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Old Price</label>
                      <input
                        type="oldPrice"
                        className="form-control"
                        id="oldPrice"
                        value={newProduct.oldPrice}
                        onChange={handleInputChange2}
                        name="oldPrice"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="brand">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange2}
                        name="brand"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpu">Cpu</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cpu"
                        value={newProduct.cpu}
                        onChange={handleInputChange2}
                        name="cpu"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="desktop">Desktop</label>
                      <input
                        type="text"
                        className="form-control"
                        id="desktop"
                        value={newProduct.desktop}
                        onChange={handleInputChange2}
                        name="desktop"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="graphics">Graphics</label>
                      <input
                        type="text"
                        className="form-control"
                        id="graphics"
                        value={newProduct.graphics}
                        onChange={handleInputChange2}
                        name="graphics"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hardware">Hardware</label>
                      <input
                        type="text"
                        className="form-control"
                        id="hardware"
                        value={newProduct.hardware}
                        onChange={handleInputChange2}
                        name="hardware"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ram">Ram</label>
                      <input
                        type="text"
                        className="form-control"
                        id="ram"
                        value={newProduct.ram}
                        onChange={handleInputChange2}
                        name="ram"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="battery">Battery</label>
                      <input
                        type="text"
                        className="form-control"
                        id="battery"
                        value={newProduct.battery}
                        onChange={handleInputChange2}
                        name="battery"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="colorCoverage">Color Coverage</label>
                      <input
                        type="text"
                        className="form-control"
                        id="colorCoverage"
                        value={newProduct.colorCoverage}
                        onChange={handleInputChange2}
                        name="colorCoverage"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="keyTouch">Key Touch</label>
                      <input
                        type="text"
                        className="form-control"
                        id="keyTouch"
                        value={newProduct.keyTouch}
                        onChange={handleInputChange2}
                        name="keyTouch"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="screenTouch">Screen Touch</label>
                      <input
                        type="text"
                        className="form-control"
                        id="screenTouch"
                        value={newProduct.screenTouch}
                        onChange={handleInputChange2}
                        name="screenTouch"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="memory">Memory</label>
                      <input
                        type="text"
                        className="form-control"
                        id="memory"
                        value={newProduct.memory}
                        onChange={handleInputChange2}
                        name="memory"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="year">Year</label>
                      <input
                        type="text"
                        className="form-control"
                        id="year"
                        value={newProduct.year}
                        onChange={handleInputChange2}
                        name="year"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="panel">Panel</label>
                      <input
                        type="text"
                        className="form-control"
                        id="panel"
                        value={newProduct.panel}
                        onChange={handleInputChange2}
                        name="panel"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sound">Sound</label>
                      <input
                        type="text"
                        className="form-control"
                        id="sound"
                        value={newProduct.sound}
                        onChange={handleInputChange2}
                        name="sound"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="system">System</label>
                      <input
                        type="text"
                        className="form-control"
                        id="system"
                        value={newProduct.system}
                        onChange={handleInputChange2}
                        name="system"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weight">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight"
                        value={newProduct.weight}
                        onChange={handleInputChange2}
                        name="weight"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="imageLink">Image Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="imageLink"
                        value={newProduct.imageLink}
                        onChange={handleInputChange2}
                        name="imageLink"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddProductModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddProduct}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="table font-custom">
            <thead>
              <tr>
                <th>Email</th>
                <th>Age</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  {!update && (
                    <>
                      <td className="w100">{item.email}</td>
                      <td className="w100">{item.age}</td>
                      <td className="w100">{item.role}</td>
                    </>
                  )}
                  <td>
                    {editingUser === item ? (
                      <>
                        <td className="w100">
                          <input
                            className="w100"
                            type="text"
                            name="email"
                            value={update.email}
                            onChange={handleInputChange}
                          />
                          <input
                            className="w100"
                            type="text"
                            name="age"
                            value={update.age}
                            onChange={handleInputChange}
                          />
                          <input
                            className="w100"
                            type="text"
                            name="role"
                            value={update.role}
                            onChange={handleInputChange}
                          />
                          <button
                            className="btn btn-success mg0"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : update ? (
                      ""
                    ) : (
                      <>
                        <button
                          className="btn btn-info btn-sm mr-2"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
