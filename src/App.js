import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let isfirstRender = true;
  useEffect(() => {
    if (isfirstRender) {
      isfirstRender = false;
      return;
    }
    const sendRequest = async () => {
      //send state as sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-http-133fa-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request to databse sucessfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request failed",
          type: "error",
        })
      );
    });
  }, [cart]);
  return (
    <div className="App">
      {/* {notification && (
        <Notification type={notification.type} message={notification.message} />
      )} */}
      {/* <Notification type={notification.type} message={notification.message} /> */}

      <Notification type={"success"} message={"hey buddy how its going on"} />

      {/* {isLoggedIn ? <Layout /> : <Auth />} */}
    </div>
  );
}

export default App;
