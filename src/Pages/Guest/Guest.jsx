import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { LOCAL_STORAGE, ROLE } from "../../Utils/constanst/localConstanst";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getArticlesByFacultyIdAndAcademicYearId,
  getArticlesByUserId,
} from "../../Redux/reducers/articleReducer";
import { changePasswordAction, logOut } from "../../Redux/reducers/userReducer";
import { getAllAcademicYears } from "../../Redux/reducers/academicYearsReducer";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import { getAllFaculties } from "../../Redux/reducers/facultiesReducer";

export default function Guest(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { academicYears } = useSelector((state) => state.academicYearsReducer);

  const { faculties } = useSelector((state) => state.facultiesReducer);

  const [changePassword, setChangePassword] = useState({
    password: "",
    retype_password: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    faculty_id: 1,
    academic_year_id: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      faculty_id: filterOptions.faculty_id,
      academic_year_id: filterOptions.academic_year_id,
    });
    dispatch(getArticlesByFacultyIdAndAcademicYearId(filterOptions));
  };

  const { articleList } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
      navigate("/login");
    } else {
      if (
        data?.role.id !== ROLE.GUEST &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.role_id !==
          ROLE.GUEST
      ) {
        navigate("/login");
      }
      if (
        data?.active === false &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.active === false
      ) {
        alert("YOU HAVE BEEN BAN BY ADMIN! CONTACT YOUR ADMIN TO UNBAN!");
        dispatch(logOut());
        navigate("/login");
      }
      if (
        data?.userActive === false &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.userActive ===
          false
      ) {
        alert("YOU HAVE TO CHANGE YOUR PASSWORD FIRST!");
        navigate("/change-password");
      }
    }
    dispatch(getAllAcademicYears());
    dispatch(getArticlesByFacultyIdAndAcademicYearId(filterOptions));
    dispatch(getAllFaculties());
  }, []);

  return (
    <div>
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
                <span>{data?.faculty?.name}</span>
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
          backgroundColor: "#235895",
        }}
      >
        <div className="bg-[#FF751F] p-10 px-20">
          <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {faculties?.map((faculty, index) => {
                return (
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={(e) => {
                        setFilterOptions({
                          ...filterOptions,
                          faculty_id: faculty.id,
                        });
                        dispatch(
                          getArticlesByFacultyIdAndAcademicYearId({
                            faculty_id: faculty.id,
                            academic_year_id: 0,
                          })
                        );
                      }}
                      className="nav-link"
                      id={`${faculty.name.toLowerCase()}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${faculty.name.toLowerCase()}`}
                      type="button"
                      role="tab"
                      aria-controls={`${faculty.name.toLowerCase()}`}
                      aria-selected="true"
                    >
                      {faculty.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          {faculties?.map((faculty, index) => {
            return (
              <div
                className="bg-[#235895] tab-pane active"
                id={faculty.name.toLowerCase()}
                role="tabpanel"
                aria-labelledby={`${faculty.name.toLowerCase()}-tab`}
              >
                {articleList
                  ?.filter((article) => article.publish === true)
                  .map((article, index) => {
                    return (
                      <ArticleCard
                        article={article}
                        index={index}
                        articleList={articleList}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
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
                {faculties?.map((faculty, index) => {
                  return (
                    <option key={index} value={faculty.id}>
                      {faculty.name}
                    </option>
                  );
                })}
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
