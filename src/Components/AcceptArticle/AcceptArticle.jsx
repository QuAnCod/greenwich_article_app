import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SignOutBtn from "../Buttons/SignOutBtn/SignOutBtn";
import { ROLE } from "../../Utils/constanst/localConstanst";
import { getArticles } from "../../Redux/reducers/articleReducer";
import ArticleDetail from "./ArticleDetail";

export default function AcceptArticle(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      if (
        data?.role?.id !== ROLE.MARKETING_CORDINATOR &&
        JSON.parse(localStorage.getItem("user"))?.role_id !==
        ROLE.MARKETING_CORDINATOR
      ) {
        alert("You dont have permission to access this page");
        navigate("/login");
      }
    }
  }, []);

  return (
    <div>
      <div className="bg-[#FF751F] p-10 px-20 flex justify-between">
        <div className="flex justify-start items-center">
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
            src={require("../../assets/img/ava_icon.jpg")}
            alt=""
          />
          <div className="text-start">
            <h6 className="text-white text-2xl font-bold">{data?.username}</h6>
            <h6 className="text-white text-lg">
              <span>Role: </span>
              <span className="uppercase">{data?.role.name}</span>
            </h6>
            <h6 className="text-white text-lg">
              <span>Faculty: </span>
              <span className="uppercase">{data?.faculty.name}</span>
            </h6>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <SignOutBtn />
        </div>
      </div>
      <ArticleDetail />
    </div>
  );
}
