import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useStateContext } from "../../Contexts/ContextProvider";
import Header from "../Header";
import Footer from "../Footer";
import HeaderUser from "../HeaderUser";
import { useNavigate } from "react-router-dom";

function DefaultLayout() {
  const [token, setToken] = useState(null);
  const [flag, setFlag] = useState(null);

  const navigate = useNavigate();

  // let temp = localStorage.getItem("accessAdmin");
  // if (temp == "true") {
  //   temp = "true";
  // } else {
  //   temp = null;
  // }

  let temp1 = localStorage.getItem("accessAdmin");

  useEffect(() => {
    // Check if the 'user' cookie exists
    const userCookie = Cookies.get("token");

    if (userCookie) {
      // Parse the JSON data from the cookie
      const userToken = userCookie;

      // Set the user state with the retrieved data
      setToken(userToken);
    }

    const temp = setInterval(checkLogin, 100);
    setFlag(temp);
  }, [token]);

  const checkLogin = () => {
    // Reset the user state
    const userCookie = Cookies.get("token");
    setToken(userCookie);
  };

  const handleLogout = () => {
    // Clear the 'user' cookie
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("accessAdmin");
    Cookies.remove("userId");
    // Reset the user state
    setToken(null);
    // console.log(token);
    clearInterval(flag);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {!token && <Header />}
      {token && <HeaderUser logout={handleLogout} />}
      <Outlet />
      {!temp1 && <Footer />}
      {/* <Footer /> */}
    </div>
  );
}

export default DefaultLayout;
