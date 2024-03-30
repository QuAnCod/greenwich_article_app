import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { LOCAL_STORAGE, ROLE } from "../../Utils/constanst/localConstanst";
import { useDispatch, useSelector } from "react-redux";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import WriteModal from "../../Components/WriteModal/WriteModal";
import { getAllClosures } from "../../Redux/reducers/closuresReducer";
import { getAllAcademicYears } from "../../Redux/reducers/academicYearsReducer";
import {
  getArticlesByFacultyIdAndAcademicYearId,
  getArticlesByUserId,
  setArticleList,
} from "../../Redux/reducers/articleReducer";
import { changePasswordAction } from "../../Redux/reducers/userReducer";

const findDeadlineByFaculty = (closures, faculty_id) => {
  const closuresFound = closures.find(
    (closure) => closure.faculty.id === faculty_id
  );
  const date = new Date(closuresFound?.finalDeadline).toDateString();
  return date;
};

const findClosureByFaculty = (closures, faculty_id) => {
  const closuresFound = closures.find(
    (closure) => closure.faculty.id === faculty_id
  );
  const date = new Date(closuresFound?.deadline).toDateString();
  return date;
};

export default function HomeTemplate(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { closures } = useSelector((state) => state.closuresReducer);
  const { academicYears } = useSelector((state) => state.academicYearsReducer);

  const { articleListByUserId } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
      navigate("/login");
    }
    if (data?.role.id !== ROLE.STUDENT && data?.role.id !== ROLE.GUEST) {
      navigate("/login");
    }
    dispatch(getAllClosures());
    dispatch(getAllAcademicYears());
    dispatch(getArticlesByUserId(data?.id));
  }, []);

  // console.log(articleListByUserId);
  const [changePassword, setChangePassword] = useState({
    password: "",
    retype_password: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    page: 0,
    limit: 10,
    faculty_id: "",
    academic_year_id: "",
  });

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
            {data?.role?.id === ROLE.STUDENT ? (
              <h6 className="text-black text-xl">
                <span>Faculty: </span>
                <span>{data?.falcuty?.name}</span>
              </h6>
            ) : null}
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
          <form
            className="container"
            onSubmit={(e) => {
              e.preventDefault();
              const userData = {
                id: data?.id,
                password: changePassword.password,
                retype_password: changePassword.retype_password,
              };
              dispatch(changePasswordAction(userData));
              setChangePassword({
                password: "",
                retype_password: "",
              });
            }}
          >
            <div className="form-group mb-3">
              <label htmlFor="password" className="font-bold">
                New Password
              </label>
              <input
                onChange={(e) => {
                  setChangePassword({
                    ...changePassword,
                    password: e.target.value,
                  });
                }}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="New Password"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="retype_password" className="font-bold">
                Confirm Password
              </label>
              <input
                onChange={(e) => {
                  setChangePassword({
                    ...changePassword,
                    retype_password: e.target.value,
                  });
                }}
                type="password"
                className="form-control"
                id="retype_password"
                name="retype_password"
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
              <small className="font-light">
                {findClosureByFaculty(closures, data?.faculty?.id)}
              </small>
            </h4>
            <h4 className="flex justify-between">
              Final date{" "}
              <small className="font-light">
                {findDeadlineByFaculty(closures, data?.faculty?.id)}
              </small>
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
            <h4 className="font-normal">
              {
                articleListByUserId.filter(
                  (article) => article.status === "pending"
                )?.length
              }
            </h4>
          </div>
          <div className="flex justify-between mb-3">
            <h4>Accepted</h4>
            <h4 className="font-normal">
              {
                articleListByUserId.filter(
                  (article) => article.status === "accepted"
                )?.length
              }
            </h4>
          </div>
          <div className="flex justify-between mb-3">
            <h4>Rejected</h4>
            <h4 className="font-normal">
              {
                articleListByUserId.filter(
                  (article) => article.status === "rejected"
                )?.length
              }
            </h4>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target[0].value);
              const filterStatus = e.target[0].value;
              const list = articleListByUserId.filter(
                (article) => article.status === filterStatus
              );
              dispatch(setArticleList(list));
            }}
          >
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
                <option value={"pending"}>Pending</option>
                <option value={"accepted"}>Accepted</option>
                <option value={"rejected"}>Rejected</option>
              </select>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-danger">
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          className="bg-white p-3"
          style={{
            border: "5px solid #235895",
          }}
        >
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(getArticlesByFacultyIdAndAcademicYearId(filterOptions));
            }}
          >
            <div className="form-group mb-3">
              <select
                style={{
                  lineHeight: "2rem",
                  fontSize: "1.5rem",
                }}
                className="form-select"
                onChange={(e) => {
                  setFilterOptions({
                    ...filterOptions,
                    faculty_id: e.target.value,
                  });
                }}
              >
                <option disabled selected>
                  Choose Faculty
                </option>
                <option value={1}>IT</option>
                <option value={2}>Bussiness</option>
                <option value={3}>Design</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                style={{
                  lineHeight: "2rem",
                  fontSize: "1.5rem",
                }}
                onChange={(e) => {
                  setFilterOptions({
                    ...filterOptions,
                    academic_year_id: e.target.value,
                  });
                }}
                className="form-select"
              >
                <option disabled selected>
                  Choose Academic year
                </option>
                {academicYears?.map((academicYear, index) => {
                  return (
                    <option key={index} value={academicYear.id}>
                      {academicYear.year}
                    </option>
                  );
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
