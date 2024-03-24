import React, { useEffect } from "react";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ROLE } from "../../Utils/constanst/localConstanst";

export default function MarketingCordinator(props) {
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (data?.roleId !== ROLE.MARKETING_CORDINATOR) {
      navigate("/login");
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
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Approved
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
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
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
                id="messages-tab"
                data-bs-toggle="tab"
                data-bs-target="#messages"
                type="button"
                role="tab"
                aria-controls="messages"
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
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            Approved
          </div>
          <div
            className="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            Pending
          </div>
          <div
            className="tab-pane"
            id="messages"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            Rejected
          </div>
        </div>
      </div>
    </div>
  );
}
