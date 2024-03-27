import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LOCAL_STORAGE, ROLE } from "../../Utils/constanst/localConstanst";
import { useDispatch, useSelector } from "react-redux";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import WriteModal from "../../Components/WriteModal/WriteModal";
import { getAllClosures } from "../../Redux/reducers/closuresReducer";
import { getAllAcademicYears } from "../../Redux/reducers/academicYearsReducer";

const findDeadlineByFaculty = (closures, faculty_id) => {
  const closuresFound = closures.find((closure) => closure.faculty.id === faculty_id);
  return closuresFound?.finalDeadline.split("T").join(" ");
}

const findClosureByFaculty = (closures, faculty_id) => {
  const closuresFound = closures.find((closure) => closure.faculty.id === faculty_id);
  return closuresFound?.deadline.split("T").join(" ");
}

export default function HomeTemplate(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { closures } = useSelector((state) => state.closuresReducer);
  const { academicYears } = useSelector((state) => state.academicYearsReducer);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
      navigate("/login");
    }
    if (data?.role.id !== ROLE.STUDENT && data?.role.id !== ROLE.GUEST) {
      navigate("/login");
    }
    dispatch(getAllClosures())
    dispatch(getAllAcademicYears())
  }, []);

  return (
    <div className="">
      <div className="w-1/6 bg-[#235895] fixed h-screen">
        <div
          className="bg-white py-5"
          style={{
            border: "5px solid #235895",
          }}
        >
          <div className="flex justify-center items-center">
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              src={require("../../assets/img/ava_icon.jpg")}
              alt=""
            />
          </div>
          <div className="text-center">
            <h6 className="text-black text-2xl font-bold text-uppercase">
              {data?.username}
            </h6>
            <h6 className="text-black text-xl">
              <span>Role: </span>
              <span>{data?.role?.name}</span>
            </h6>
            {data?.role?.id === ROLE.STUDENT ? (<h6 className="text-black text-xl">
              <span>Faculty: </span>
              <span>{data?.falcuty?.name}</span>
            </h6>) : null}
            <SignOutBtn />
          </div>
        </div>
        <div
          className="bg-white py-5"
          style={{
            border: "5px solid #235895",
          }}
        >
          <div className="text-center text-2xl font-bold mb-3">
            Change Password
          </div>
          <form className="container">
            <div className="form-group mb-3">
              <label htmlFor="currentPassword" className="font-bold">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                name="current_password"
                placeholder="Current Password"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="newPassword" className="font-bold">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="new_password"
                placeholder="New Password"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  backgroundColor: "#235895",
                }}
                onClick={(e) =>
                  e.preventDefault(alert("Change password successfully"))
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="w-4/6"
        style={{
          left: "16.666666%",
          position: "absolute",
        }}
      >
        <Outlet />
      </div>
      <div
        className="w-1/6 bg-[#235895] fixed h-screen"
        style={{
          right: 0,
          top: 0,
        }}
      >
        <div
          className="bg-white p-3"
          style={{
            border: "5px solid #235895",
          }}
        >
          <div className="">
            <h4 className="mb-3 flex justify-between">
              Closure date
              <small className="font-light">{findClosureByFaculty(closures, data?.faculty?.id)}</small>
            </h4>
            <h4 className="flex justify-between">
              Final date <small className="font-light">{findDeadlineByFaculty(closures, data?.faculty?.id)}</small>
            </h4>
          </div>
        </div>
        <div
          className="bg-white p-3"
          style={{
            border: "5px solid #235895",
          }}
        >
          <div className="flex justify-between mb-3">
            <h4>Pending</h4>
            <h4 className="font-normal">100</h4>
          </div>
          <div className="flex justify-between mb-3">
            <h4>Accepted</h4>
            <h4 className="font-normal">200</h4>
          </div>
          <div className="flex justify-between mb-3">
            <h4>Rejected</h4>
            <h4 className="font-normal">100</h4>
          </div>
          <form className="form">
            <div className="form-group mb-3">
              <select
                style={{
                  lineHeight: "2rem",
                  fontSize: "1.5rem",
                }}
                className="form-select"
              >
                <option disabled selected>
                  Choose Status
                </option>
                <option>Pending</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-danger">Search</button>
            </div>
          </form>
        </div>
        <div
          className="bg-white p-3"
          style={{
            border: "5px solid #235895",
          }}
        >
          <form className="form">
            <div className="form-group mb-3">
              <select
                style={{
                  lineHeight: "2rem",
                  fontSize: "1.5rem",
                }}
                className="form-select"
              >
                <option disabled selected>
                  Choose Faculty
                </option>
                <option>IT</option>
                <option>Bussiness</option>
                <option>Design</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                style={{
                  lineHeight: "2rem",
                  fontSize: "1.5rem",
                }}
                onChange={(e) => console.log(e.target.value)}
                className="form-select"
              >
                <option disabled selected>
                  Choose Academic year
                </option>
                {academicYears?.map((academicYear, index) => {
                  return <option key={index} value={academicYear.id}>{academicYear.year}</option>
                })}
              </select>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-danger">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
