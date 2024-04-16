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

export default function Guest(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { academicYears } = useSelector((state) => state.academicYearsReducer);

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
              <li className="nav-item" role="presentation">
                <button
                  onClick={(e) => {
                    setFilterOptions({
                      ...filterOptions,
                      faculty_id: 1,
                    });
                    dispatch(
                      getArticlesByFacultyIdAndAcademicYearId({
                        faculty_id: 1,
                        academic_year_id: 0,
                      })
                    );
                  }}
                  className="nav-link active"
                  id="computing-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#computing"
                  type="button"
                  role="tab"
                  aria-controls="computing"
                  aria-selected="true"
                >
                  Computing
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  onClick={(e) => {
                    setFilterOptions({
                      ...filterOptions,
                      faculty_id: 2,
                    });
                    dispatch(
                      getArticlesByFacultyIdAndAcademicYearId({
                        faculty_id: 2,
                        academic_year_id: 0,
                      })
                    );
                  }}
                  className="nav-link"
                  id="business-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#business"
                  type="button"
                  role="tab"
                  aria-controls="business"
                  aria-selected="false"
                >
                  Business
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  onClick={(e) => {
                    setFilterOptions({
                      ...filterOptions,
                      faculty_id: 3,
                    });
                    dispatch(
                      getArticlesByFacultyIdAndAcademicYearId({
                        faculty_id: 3,
                        academic_year_id: 0,
                      })
                    );
                  }}
                  className="nav-link"
                  id="design-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#design"
                  type="button"
                  role="tab"
                  aria-controls="design"
                  aria-selected="false"
                >
                  Design
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div
            className="bg-[#235895] tab-pane active"
            id="computing"
            role="tabpanel"
            aria-labelledby="computing-tab"
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
          <div
            className="bg-[#235895] tab-pane"
            id="business"
            role="tabpanel"
            aria-labelledby="business-tab"
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
          <div
            className="bg-[#235895] tab-pane"
            id="design"
            role="tabpanel"
            aria-labelledby="design-tab"
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
