import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./Views/Home";
import Cart from "./Views/Cart";
import Confirm from "./Views/Confirm";
import Product from "./Views/Product";
import Login from "./Views/Login";
import NotFound from "./Views/NotFound";
import SignUp from "./Views/SignUp";
import Users from "./Views/Users";
import Storaged from "./Views/Test/Storaged";
import Admin from "./Views/Admin";
import SearchProduct from "./Views/SearchProduct";
import Order from "./Views/Order";
import HistoryOrder from "./Views/HistoryOrder";
import ListProduct from "./Views/ListProduct";
import EditProduct from "./Views/EditProduct";
import ListOrdered from "./Views/ListOrdered";
import EditOrder from "./Views/EditOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart/:id",
        element: <Cart />,
      },
      {
        path: "/confirm/:id",
        element: <Confirm />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/test/storaged",
        element: <Storaged />,
      },
      {
        path: "/search",
        element: <SearchProduct />,
      },
      {
        path: "/users/:id",
        element: <Users />,
      },
      {
        path: "/historyOrder/:id",
        element: <HistoryOrder />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/product",
        element: <ListProduct />,
      },
      {
        path: "/admin/product/:id/edit",
        element: <EditProduct />,
      },
      {
        path: "/admin/ordered",
        element: <ListOrdered />,
      },
      {
        path: "/admin/ordered/edit/:id",
        element: <EditOrder />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
