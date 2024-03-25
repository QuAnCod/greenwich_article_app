import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Input, InputNumber, Popconfirm, Table, Typography, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserListAction, setUserEdit } from "../../Redux/reducers/userReducer";
import { useNavigate } from "react-router";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { ROLE } from "../../Utils/constanst/localConstanst";
import CreateUser from "../../Components/CreateUserModal/CreateUser";
import { setModalEditOpen, setModalOpen } from "../../Redux/reducers/modalReducer";
import EditUserModal from "../../Components/EditUserModal/EditUserModal";

export default function AdminDashboard(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data } = useSelector((state) => state.userReducer.userLogin);
    const { userList, loadingList } = useSelector((state) => state.userReducer);

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (_, record) => {
                return record.role.name.split("_").join(" ");
            },
        },
        {
            title: "Faculty",
            dataIndex: "faculty",
            key: "faculty",
            render: (_, record) => {
                return record.faculty?.name;
            },
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            render: (_, record) => {
                return record.active ? "Active" : "Inactive";
            },
        },
    ];

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        if (data?.role?.id !== ROLE.ADMIN) {
            alert("You dont have permission to access this page");
            navigate("/login");
        }
        dispatch(getUserListAction());
    }, []);

    return (
        <div>
            <CreateUser />
            <EditUserModal />
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
                        <h6 className="text-white text-2xl font-bold capitalize">{data?.username}</h6>
                        <h6 className="text-white text-lg">
                            <span>Role: </span>
                            <span>{data?.role?.name}</span>
                        </h6>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <SignOutBtn />
                </div>
            </div>
            <div className="">
                <div className="sidebar w-[120px] bg-[#235895] fixed h-screen">
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                        <li className="nav-item h-[120px]" role="presentation">
                            <button
                                className="nav-link w-full active h-full"
                                id="account-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#account"
                                type="button"
                                role="tab"
                                aria-controls="account"
                                aria-selected="true"
                            >
                                <i
                                    className="fa fa-user"
                                    style={{
                                        fontSize: "46px",
                                        color: "white",
                                    }}
                                />
                            </button>
                        </li>
                        <li className="nav-item h-[120px]" role="presentation">
                            <button
                                className="nav-link w-full h-full"
                                id="date-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#date"
                                type="button"
                                role="tab"
                                aria-controls="date"
                                aria-selected="false"
                            >
                                <i
                                    className="fa fa-calendar"
                                    style={{
                                        fontSize: "46px",
                                        color: "white",
                                    }}
                                />
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Tab panes */}
                <div className="tab-content position-absolute left-[120px] p-5 w-11/12">
                    <div
                        className="tab-pane text-black active"
                        id="account"
                        role="tabpanel"
                        aria-labelledby="account-tab"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-2xl font-bold">All Account</h3>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    // navigate("/register");
                                    dispatch(setModalOpen(true));
                                }}
                            >
                                Add User
                            </button>
                        </div>
                        <Table
                            rowKey={(record) => record.id}
                            loading={loadingList}
                            dataSource={userList.filter(
                                (user) => user.role?.id !== ROLE.ADMIN
                            )}
                            columns={columns}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        console.log(record);
                                        dispatch(setModalEditOpen(true));
                                        dispatch(setUserEdit(record))
                                    },
                                }
                            }}
                            bordered
                        />
                    </div>
                    <div
                        className="tab-pane text-black"
                        id="date"
                        role="tabpanel"
                        aria-labelledby="date-tab"
                    >
                        date
                    </div>
                </div>
            </div>
        </div>
    );
}
