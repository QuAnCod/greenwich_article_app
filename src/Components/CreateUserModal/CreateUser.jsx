import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { registerAction } from "../../Redux/reducers/userReducer";

export default function CreateUser(props) {
  const { modalOpen } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = React.useState({
    username: "",
    email: "",
    password: "",
    retype_password: "",
    role_id: "",
    faculty_id: "",
    // active: true,
  });

  const handleOnChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(newUser));
  };

  useEffect(() => {}, []);

  return modalOpen ? (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="create-user-modal"
    >
      <div
        className="p-5"
        style={{
          backgroundColor: "white",
          width: "500px",
          borderRadius: "10px",
        }}
        id="create-user-form"
      >
        <form onSubmit={handleOnSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="retype_password" className="">
              Retype Password
            </label>
            <input
              className="form-control"
              type="password"
              id="retype_password"
              placeholder="Enter your password again"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="role_id" className="">
              Set Role
            </label>
            <select
              className="form-select"
              id="role_id"
              defaultValue={1}
              onChange={handleOnChange}
            >
              <option value={1}>GUEST</option>
              <option value={2}>STUDENT</option>
              <option value={3}>MARKETING COORDINATE</option>
              <option value={4}>MARKETING MANAGER</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="faculty_id" className="">
              Set Faculty
            </label>
            <select
              className="form-select"
              id="faculty_id"
              defaultValue={0}
              onChange={handleOnChange}
            >
              <option value={0}>Choose Faculty</option>
              <option value={1}>Faculty of Computer</option>
              <option value={2}>Faculty of Business</option>
              <option value={3}>Faculty of Design</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary mr-3">Create</button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(setModalOpen(false))}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
