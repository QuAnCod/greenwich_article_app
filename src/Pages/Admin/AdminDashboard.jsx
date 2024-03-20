import React, { useEffect } from 'react'
import "./AdminDashboard.css"
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserListAction } from '../../Redux/reducers/userReducer';

export default function AdminDashboard(props) {

    const dispatch = useDispatch()

    const { userList, loadingList } = useSelector(state => state.userReducer)

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, record) => {
                return record.role.name
            }
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
            render: (_, record) => {
                return record.faculty?.name
            }
        },
    ];

    useEffect(() => {
        dispatch(getUserListAction())
    }, [])

    return (
        <div>
            <div className='bg-[#FF751F] p-10 px-20'>
                <div className='flex justify-start items-center'>
                    <img style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        marginRight: '20px',
                    }} src={require('../../assets/img/ava_icon.jpg')} alt="" />
                    <div className='text-start'>
                        <h6 className='text-white text-2xl font-bold'>Admin</h6>
                        <h6 className='text-white text-lg'>
                            <span>Role: </span>
                            <span>Admin</span>
                        </h6>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='sidebar w-[120px] bg-[#235895] fixed h-screen'>
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                        <li className="nav-item h-[120px]" role="presentation">
                            <button className="nav-link w-full active h-full" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                                <i className="fa fa-user" style={{
                                    fontSize: '46px',
                                    color: 'white'
                                }} />
                            </button>
                        </li>
                        <li className="nav-item h-[120px]" role="presentation">
                            <button className="nav-link w-full h-full" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                                <i className="fa fa-calendar" style={{
                                    fontSize: '46px',
                                    color: 'white'
                                }} />
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Tab panes */}
                <div className="tab-content position-absolute left-[120px] p-5 w-11/12">
                    <div className="tab-pane text-black active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <Table loading={loadingList} dataSource={userList} columns={columns} />
                    </div>
                    <div className="tab-pane text-black" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        profile
                    </div>
                </div>
            </div>
        </div>
    )
}
