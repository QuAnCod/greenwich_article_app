import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { API, LOCAL_STORAGE, ROLE } from "../../Utils/constanst/localConstanst";
import { useDispatch, useSelector } from "react-redux";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { getAllClosures } from "../../Redux/reducers/closuresReducer";
import { getAllAcademicYears } from "../../Redux/reducers/academicYearsReducer";
import {
  getArticlesByFacultyIdAndAcademicYearId,
  getArticlesByUserId,
} from "../../Redux/reducers/articleReducer";
import { changePasswordAction } from "../../Redux/reducers/userReducer";
import { useSearchParams } from "react-router-dom";
import {
  findDeadline,
  findFinalDeadline,
} from "../../Utils/function/helperFunc";
import { setChangeAvatarModalOpen } from "../../Redux/reducers/modalReducer";

export const getFaculty = (facultyId) => {
  switch (facultyId) {
    case 1:
      return "COMPUTER";
    case 2:
      return "BUSINESS";
    case 3:
      return "DESIGN";
    default:
      return "UNKNOWN";
  }
}

export const getAvatar = (avatar) => {
  if (avatar) {
    return `${API.GET_ARTICLE_IMAGE}/${avatar}`;
  }
  return require('../../assets/img/ava_icon.jpg');
}

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
    faculty_id: "",
    academic_year_id: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      faculty_id: filterOptions.faculty_id,
      academic_year_id: filterOptions.academic_year_id,
    });
    dispatch(getArticlesByFacultyIdAndAcademicYearId(filterOptions));
    navigate(`/students/${data?.id}`);
  };

  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER)));
  console.log(data);

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
            <div className="cursor-pointer" onClick={() => {
              dispatch(setChangeAvatarModalOpen(true));
            }}>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                src={getAvatar(data?.avatar || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.avatar)}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h6 className="text-black text-2xl font-bold text-uppercase">
              {data?.username || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.username}
            </h6>
            <h6 className="text-black text-xl">
              <span>Role: </span>
              <span>{data?.role?.name || "STUDENT"}</span>
            </h6>
            <h6 className="text-black text-xl">
              <span>Faculty: </span>
              <span>{getFaculty(data?.faculty?.id || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.faculty_id)}</span>
            </h6>
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
                {(() => {
                  const deadline = findDeadline(closures, data?.faculty?.id);
                  // Check Invalid Date
                  if (deadline == "Invalid Date") return "No deadline";
                  else return deadline.toDateString();
                })()}
              </small>
            </h4>
            <h4 className="flex justify-between">
              Final date{" "}
              <small className="font-light">
                {(() => {
                  const finalDeadline = findFinalDeadline(
                    closures,
                    data?.faculty?.id
                  );
                  // Check Invalid Date
                  if (finalDeadline == "Invalid Date") return "No deadline";
                  else return finalDeadline.toDateString();
                })()}
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
          <div className="text-center text-2xl font-normal mb-3">
            Your Articles
          </div>
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
              navigate(`/students/${data?.id}/your-article`);
            }}
          >
            <div className="form-group text-center">
              <button type="submit" className="btn btn-danger">
                View my articles
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
          <form className="form" onSubmit={handleSubmit}>
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
                <option value={0} selected>
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
                <option value={0} selected>
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
