import { useState } from "react";
import { app, storage } from "../../firebaseConfig.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Storaged() {
  const [data, setData] = useState({});
  const storageRef = ref(storage, `images/${data.name}`);

  const handleSubmit = (event) => {
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );

    console.log(data);
  };

  return (
    <div className="App">
      <input type="file" onChange={(event) => setData(event.target.files[0])} />

      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Storaged;
