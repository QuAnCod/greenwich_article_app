import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import WriteModal from "../../Components/WriteModal/WriteModal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { downloadFile, getArticles } from "../../Redux/reducers/articleReducer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import ReachEnd from "../../Components/ReachEnd/ReachEnd";
import { API, DOMAIN } from "../../Utils/constanst/localConstanst";
import { type } from "@testing-library/user-event/dist/type";
import { Popconfirm } from "antd";

export default function Home(props) {
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 4,
    // autoplay: true,
    center: true,
    arrows: true,
  };

  const { page, limit, totalPages } = useSelector(
    (state) => state.articleReducer.pagination
  );

  const articleList = useInfiniteScroll();
  // console.log(articleList);

  useEffect(() => {
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
            console.log("click");
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
          <div key={index} className="my-2">
            <div
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div className="p-10">
                <div className="article-header flex justify-between">
                  <div className="avatar-zone flex justify-between items-stretch">
                    <img
                      src="https://i.pravatar.cc/300"
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <h5 className="m-0 font-bold">{article.user_name}</h5>
                      <p className="m-0">
                        {article.created_at.split("T").join(" ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Popconfirm
                      title="Want to download this file?"
                      onConfirm={() => {
                        dispatch(downloadFile(article.fileName));
                      }}
                      okText="Yes"
                      cancelText="No"
                      okType="text"
                      cancelButtonProps={{
                        type: "text",
                      }}
                    >
                      <button className="btn btn-warning">
                        <i className="fa fa-download" aria-hidden="true" />{" "}
                        Download
                      </button>
                    </Popconfirm>
                  </div>
                </div>
                <div className="article-body mt-5">
                  <h3 className="font-bold">{article.name}</h3>
                  <p className="mt-2">{article.description}</p>
                  <p className="mt-2 text-warning">
                    {
                      // split file name and get all the element from 4th element to the end
                      // remove the ***-***-***-***-****_ part from the file name
                      article.fileName
                        ?.split("-")
                        .slice(4)
                        .join("-")
                        .split("_")
                        .slice(1)
                        .join("_")
                    }
                  </p>
                </div>
                <div className="article-img mt-5 grid grid-cols-3 gap-3">
                  {article.product_images?.map((image, index) => {
                    return (
                      <div key={index} className="col-span-1">
                        {/* // use the API.GET_ARTICLE_IMAGE to get the image
                        // use the image.imageUrl to get the image name
                        // if the image is not available, use the placeholder image */}
                        <img
                          src={`${API.GET_ARTICLE_IMAGE}/${image?.imageUrl}`}
                          className="w-full h-full mx-auto"
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="article-comment p-10 mt-5 border-t-2 border-black">
                <div className="comment-header flex justify-start">
                  <img
                    src="https://i.pravatar.cc/300"
                    alt=""
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <div className="comment-content">
                    <h5 className="font-bold">
                      John Doe <span>15 March 2023</span>
                    </h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam nec purus nec sapien fermentum tincidunt. Integer
                      ut lacus fermentum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {page === totalPages - 1 && <ReachEnd />}
      {/* <div className="mt-2">
        <div
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="p-10">
            <div className="article-header flex justify-between">
              <div className="avatar-zone flex justify-between items-stretch">
                <img
                  src="https://i.pravatar.cc/300"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-3">
                  <h5 className="m-0 font-bold">John Doe</h5>
                  <p className="m-0">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="btn btn-warning">
                  <i className="fa fa-download" aria-hidden="true" /> Download
                </button>
              </div>
            </div>
            <div className="article-body mt-5">
              <h3 className="font-bold">Article Title</h3>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec purus nec sapien fermentum tincidunt. Integer ut lacus
                fermentum, ultricies nunc nec, ultricies nunc nec, ultricies
                nunc nec, ultricies nunc nec, ultricies nunc nec, ultricies nunc
                nec,
              </p>
            </div>
            <div className="article-img mt-5 slider-container">
              <Slider {...settings}>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/300"
                    className="w-9/12 mx-auto"
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </div>
          <div className="article-comment p-10 mt-5 border-t-2 border-black">
            <div className="comment-header flex justify-start">
              <img
                src="https://i.pravatar.cc/300"
                alt=""
                className="w-12 h-12 rounded-full mr-2"
              />
              <div className="comment-content">
                <h5 className="font-bold">
                  John Doe <span>15 March 2023</span>
                </h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam nec purus nec sapien fermentum tincidunt. Integer ut
                  lacus fermentum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <WriteModal />
    </div>
  );
}
