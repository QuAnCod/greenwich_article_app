import React, { useEffect, useState } from "react";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ROLE } from "../../Utils/constanst/localConstanst";
import {
  getArticles,
  setArticleDetail,
  setCurrentPage,
} from "../../Redux/reducers/articleReducer";
import { Table } from "antd";

const filterByStatus = (articles, status) => {
  return articles.filter((article) => article.status === status);
};

const columns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    width: "25%",
    render: (text, record) => new Date(text).toDateString(),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "25%",
  },
];

export default function MarketingCordinator(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { articleList, loading } = useSelector((state) => state.articleReducer);

  const { page, limit, totalPages } = useSelector(
    (state) => state.articleReducer.pagination
  );

  // console.log(articleList);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (data?.role?.id !== ROLE.MARKETING_CORDINATOR) {
      alert("You dont have permission to access this page");
      navigate("/login");
    }
    dispatch(getArticles({ page, limit }));
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
              <span className="uppercase">{data?.roleName}</span>
            </h6>
            <h6 className="text-white text-lg">
              <span>Faculty: </span>
              <span className="uppercase">{data?.facultyName}</span>
            </h6>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <SignOutBtn />
        </div>
      </div>
      <div className="">
        <div className="bg-[#235895]">
          {/* Nav tabs */}
          <ul className="nav nav-tabs h-[50px]" id="myTab" role="tablist">
            <li
              style={{
                width: "33.333333%",
                display: "flex",
                justifyContent: "center",
              }}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link w-full active"
                id="accepted-tab"
                data-bs-toggle="tab"
                data-bs-target="#accepted"
                type="button"
                role="tab"
                aria-controls="accepted"
                aria-selected="true"
              >
                Accepted
              </button>
            </li>
            <li
              style={{
                width: "33.333333%",
                display: "flex",
                justifyContent: "center",
              }}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link w-full"
                id="pending-tab"
                data-bs-toggle="tab"
                data-bs-target="#pending"
                type="button"
                role="tab"
                aria-controls="pending"
                aria-selected="false"
              >
                Pending
              </button>
            </li>
            <li
              style={{
                width: "33.333333%",
                display: "flex",
                justifyContent: "center",
              }}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link w-full"
                id="rejected-tab"
                data-bs-toggle="tab"
                data-bs-target="#rejected"
                type="button"
                role="tab"
                aria-controls="rejected"
                aria-selected="false"
              >
                Rejected
              </button>
            </li>
          </ul>
        </div>
        {/* Tab panes */}
        <div className="tab-content">
          <div
            className="tab-pane active"
            id="accepted"
            role="tabpanel"
            aria-labelledby="accepted-tab"
          >
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={filterByStatus(articleList, "accepted")}
              loading={loading}
              pagination={{
                current: page + 1,
                total: totalPages * limit,
                onChange: (page, pageSize) => {
                  // when user click on pagination
                  // we will dispatch getArticles action
                  console.log(page);
                  dispatch(getArticles({ page: page - 1, limit }));
                  dispatch(setCurrentPage(page - 1));
                },
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    // when user click on row
                    // we will navigate to article detail page
                    dispatch(setArticleDetail(record));
                    navigate(`/accept-article/${record.id}`);
                  },
                };
              }}
            />
          </div>
          <div
            className="tab-pane"
            id="pending"
            role="tabpanel"
            aria-labelledby="pending-tab"
          >
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={filterByStatus(articleList, "pending")}
              loading={loading}
              pagination={{
                current: page + 1,
                total: totalPages * limit,
                onChange: (page, pageSize) => {
                  // when user click on pagination
                  // we will dispatch getArticles action
                  console.log(page);
                  dispatch(getArticles({ page: page - 1, limit }));
                  dispatch(setCurrentPage(page - 1));
                },
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    // when user click on row
                    // we will navigate to article detail page
                    dispatch(setArticleDetail(record));
                    navigate(`/accept-article/${record.id}`);
                  },
                };
              }}
            />
          </div>
          <div
            className="tab-pane"
            id="rejected"
            role="tabpanel"
            aria-labelledby="rejected-tab"
          >
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={filterByStatus(articleList, "rejected")}
              loading={loading}
              pagination={{
                current: page + 1,
                total: totalPages * limit,
                onChange: (page, pageSize) => {
                  // when user click on pagination
                  // we will dispatch getArticles action
                  console.log(page);
                  dispatch(getArticles({ page: page - 1, limit }));
                  dispatch(setCurrentPage(page - 1));
                },
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    // when user click on row
                    // we will navigate to article detail page
                    dispatch(setArticleDetail(record));
                    navigate(`/accept-article/${record.id}`);
                  },
                };
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
