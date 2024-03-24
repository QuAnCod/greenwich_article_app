import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserListAction } from "../../Redux/reducers/userReducer";
import { useNavigate } from "react-router";
import SignOutBtn from "../../Components/Buttons/SignOutBtn/SignOutBtn";
import { ROLE } from "../../Utils/constanst/localConstanst";
import CreateUser from "../../Components/CreateUserModal/CreateUser";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { Form } from "react-router-dom";

const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}



export default function AdminDashboard(props) {

    // Editable Table props
    const [form] = Form.useForm();
    const [dataEditTable, setDataEditTable] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataEditTable];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setDataEditTable(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setDataEditTable(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columnsEditTable = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>

                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


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
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (_, record) => {
                return record.role.name;
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
