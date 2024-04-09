import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import WriteModal from "../../Components/WriteModal/WriteModal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  downloadFile,
  getArticles,
  getArticlesByUserId,
  setCurrentPage,
} from "../../Redux/reducers/articleReducer";
import {
  LOCAL_STORAGE,
  ROLE,
} from "../../Utils/constanst/localConstanst";

import { Pagination } from "antd";
import { useNavigate } from "react-router";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import { logOut } from "../../Redux/reducers/userReducer";
import ChangeAvatarModal from "../../Components/ChangeAvatarModal/ChangeAvatarModal";

export default function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { page, limit, totalPages } = useSelector(
    (state) => state.articleReducer.pagination
  );

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { articleList } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.role_id !==
      ROLE.STUDENT &&
      data?.role.id !== ROLE.STUDENT
    ) {
      alert("YOU ARE NOT ALLOWED TO ACCESS THIS PAGE! CONTACT YOUR ADMIN!");
      navigate("/login");
    }
    if (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.active === false &&
      data?.active === false
    ) {
      alert("YOU HAVE BEEN BAN BY ADMIN! CONTACT YOUR ADMIN TO UNBAN!");
      dispatch(logOut());
      navigate("/login");
    }
    if (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.userActive ===
      false &&
      data?.userActive === false
    ) {
      alert("YOU MUST CHANGE YOUR PASSWORD FIRST!");
      navigate("/change-password");
    }
    dispatch(getArticles({ page: 0, limit: 10 }));
  }, []);

  return (
    <div className="bg-[#235895]">
      <div className="bg-[#FF751F] p-10 px-20">
        <h5 className="text-4xl font-bold text-white">
          Write from inside your heart:
        </h5>
        <div
          id="articleSetPopup"
          className="form-control hover:bg-slate-200 cursor-pointer"
          onClick={() => {
            // console.log("click");
            dispatch(setModalOpen(true));
          }}
        >
          <span
            style={{
              lineHheight: "2rem",
              fontSize: "1.5rem",
            }}
          >
            Write something ...
          </span>
        </div>
      </div>
      {articleList?.map((article, index) => {
        return (
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            articleList={articleList}
          />
        );
      })}
      <Pagination
        hideOnSinglePage={true}
        defaultCurrent={1}
        total={totalPages * limit}
        onChange={(page, pageSize) => {
          console.log(page, pageSize);
          dispatch(getArticles({ page: page - 1, limit: 10 }));
          dispatch(setCurrentPage(page - 1));
        }}
      />
      <WriteModal />
      <ChangeAvatarModal />
    </div>
  );
}
