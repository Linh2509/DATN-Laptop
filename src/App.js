import { useEffect, useState } from "react";
import { app, database } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [array, setArray] = useState([]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();
  const dbInstance = collection(database, "users");

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSubmit = () => {
    addDoc(dbInstance, data)
      .then(() => {
        alert("Data sent");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getData = async () => {
    const data = await getDocs(dbInstance);
    setArray(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );
  };

  const updateData = (id) => {
    let dataToUpdate = doc(database, "users", id);
    updateDoc(dataToUpdate, {
      email: "cocolia@example.com",
      password: "serval123",
    })
      .then(() => {
        alert("Data Updated");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteData = (id) => {
    let dataToDelete = doc(database, "users", id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert("Data Deleted");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App-header">
      <input
        className="input-fields"
        placeholder="Email"
        name="email"
        type="email"
        onChange={(event) => handleInputs(event)}
      />
      <input
        className="input-fields"
        placeholder="Password"
        name="password"
        type="password"
        onChange={(event) => handleInputs(event)}
      />

      <button onClick={handleSubmit}>Sign Up</button>

      {array.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.email}</p>
            <p>{item.password}</p>

            <button onClick={() => updateData(item.id)}>Update</button>
            <button onClick={() => deleteData(item.id)}>Delete</button>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
