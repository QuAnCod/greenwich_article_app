import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordAction } from "../../Redux/reducers/userReducer";
import { LOCAL_STORAGE } from "../../Utils/constanst/localConstanst";
import { useNavigate } from "react-router";

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password";
    if (!localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${require("../../assets/img/Background_1.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: -1,
        }}
      ></div>
      <div
        className="container"
        style={{
          maxWidth: "30%",
          minHeight: "70%",
          padding: "10% 5%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              forgotPasswordAction({ username: e.target.username.value })
            );
          }}
        >
          <div className="form-group mb-10">
            <label htmlFor="username" className="form-label font-bold text-2xl">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              placeholder="Enter your Username"
            />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary">Send Email</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
