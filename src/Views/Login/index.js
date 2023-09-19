import "./Login.css";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { app, database } from "../../firebaseConfig.js";
import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

function Login(props) {
  const [data, setData] = useState({});
  const collectionRef = collection(database, "users");

  const navigate = useNavigate();
  const auth = getAuth();

  // const collectionRef = collection(database, "users");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        // console.log(response.user);
        Cookies.set("token", response.user.accessToken);
        Cookies.set("email", response.user.email);
        const userQuery = query(
          collectionRef,
          where("email", "==", response.user.email)
        );

        onSnapshot(userQuery, (data) => {
          const dataUser = data.docs.map((item) => {
            return { id: item.id, ...item.data() };
          });

          Cookies.set("accessAdmin", dataUser[0].role);
          Cookies.set("userId", dataUser[0].id);

          localStorage.setItem("accessAdmin", dataUser[0].role);
          const temp = localStorage.getItem("accessAdmin");
          if (temp == "true") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email"
            onChange={(event) => handleInput(event)}
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleInput(event)}
          />
          <button className="btn btn-block" onClick={handleSubmit}>
            Login
          </button>
          <p className="message">
            Not Registered? <Link to="/signUp">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
