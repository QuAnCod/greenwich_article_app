import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../Redux/reducers/userReducer";
import { useNavigate } from "react-router";

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const [changePassword, setChangePassword] = useState({
    password: "",
    retype_password: "",
  });

  return (
    <div>
      <form
        className="bg-[#FF751F] "
        style={{
          padding: "10px 25%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (changePassword.password !== changePassword.retype_password) {
            alert("Password doesn't match");
            return;
          }
          const dataChangePassword = {
            id: data?.id,
            password: changePassword.password,
            retype_password: changePassword.retype_password,
          };
          dispatch(changePasswordAction(dataChangePassword));
          navigate("/");
        }}
      >
        <h5 className="text-4xl font-bold text-white">Change Password</h5>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-lable">
            New Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            onChange={(e) => {
              setChangePassword({
                ...changePassword,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="retype_password" className="form-lable">
            Retype Password
          </label>
          <input
            className="form-control"
            type="password"
            id="retype_password"
            name="retype_password"
            placeholder="Retype Password"
            onChange={(e) => {
              setChangePassword({
                ...changePassword,
                retype_password: e.target.value,
              });
            }}
          />
        </div>
        <button className="btn btn-success">Change Password</button>
      </form>
    </div>
  );
}
