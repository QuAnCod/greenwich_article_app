import React from "react";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE } from "../../../Utils/constanst/localConstanst";
import { logOut } from "../../../Redux/reducers/userReducer";
import { useDispatch } from "react-redux";

export default function SignOutBtn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        dispatch(logOut());
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        navigate("/login");
      }}
      style={{
        fontSize: "1.5rem",
        lineHeight: "2rem",
      }}
    >
      Sign-out
    </button>
  );
}
