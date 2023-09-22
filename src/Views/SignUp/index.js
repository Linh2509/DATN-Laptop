import "./SignUp.css";
import { app, database } from "../../firebaseConfig.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const auth = getAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [id, setId] = useState({});
  const collectionRef = collection(database, "users");
  const ageQuery = query(collectionRef, where("age", "==", 23));

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    if (data.password === data.passwordConfirm) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          const user = response.user;
          setId(user.uid);
        })
        .catch((err) => {
          alert(err.message);
        });
      addDoc(collectionRef, {
        email: data.email.toLowerCase(),
        password: data.password,
        role: false,
      })
        .then(() => {
          alert("Data Added");
        })
        .catch((err) => {
          alert(err.message);
        });
      navigate("/login");
    } else {
      alert("Mật khẩu không trùng khớp");
    }
  };

  const getData = () => {
    // getDocs(collectionRef).then((data) => {
    //   console.log(
    //     data.docs.map((item) => {
    //       return { id: item.id, ...item.data() };
    //     })
    //   );
    // });

    onSnapshot(ageQuery, (data) => {
      console.log(
        data.docs.map((item) => {
          return { id: item.id, ...item.data() };
        })
      );
    });
  };

  // const updateData = () => {
  //   const docToUpdate = doc(database, "users", 'NQWKHq56bX3BzKkPY2RW');
  //   updateDoc(docToUpdate, {
  //     email: 'Viet',
  //     password: 12345678
  //   })
  //     .then(() => {
  //       alert('Data updated');
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //   })
  // }

  //   const deleteData = () => {
  //   const docToDelete = doc(database, "users", 'mkHba72IxxzgtTjE0j5U');
  //   deleteDoc(docToDelete)
  //     .then(() => {
  //       alert('Data deleted');
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //   })
  // }

  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Đăng ký miễn phí</h1>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={(event) => handleInput(event)}
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleInput(event)}
          />

          <input
            ref={passwordConfirmationRef}
            name="passwordConfirm"
            type="password"
            placeholder="Password Confirmation"
            onChange={(event) => handleInput(event)}
          />

          {/* <Link to="/login"> */}
          <button className="btn btn-block" onClick={handleSubmit}>
            SignUp
          </button>
          {/* </Link> */}
          <p className="message">
            Đã đăng ký? <Link to="/login">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
