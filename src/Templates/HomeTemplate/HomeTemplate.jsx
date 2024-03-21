import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { LOCAL_STORAGE } from '../../Utils/constanst/localConstanst'
import { useSelector } from 'react-redux'

export default function HomeTemplate(props) {

    const navigate = useNavigate()

    const { data } = useSelector(state => state.userReducer.userLogin)

    useEffect(() => {
        if (!localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
            navigate('/login')
        }
    }, [])

    return (
        <div className=''>
            <div className='w-1/6 bg-[#235895] fixed h-screen'>
                <div className='bg-white py-5'>
                    <div className='flex justify-center items-center'>
                        <img style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                        }} src={require('../../assets/img/ava_icon.jpg')} alt="" />
                    </div>
                    <div className='text-center'>
                        <h6 className='text-black text-2xl font-bold text-uppercase'>student</h6>
                        <h6 className='text-black text-lg'>
                            <span>Role: </span>
                            <span>{data?.roleName}</span>
                        </h6>
                        <h6 className='text-black text-lg'>
                            <span>Faculty: </span>
                            <span>{data?.facultyName}</span>
                        </h6>
                        <button className='btn btn-danger' onClick={() => {
                            localStorage.removeItem(LOCAL_STORAGE.TOKEN)
                            navigate('/login')
                        }}>Sign-out</button>
                    </div>
                </div>
            </div>
            <div className='w-4/6' style={{
                left: '16.666666%',
                position: 'absolute',
            }}>
                <Outlet />
            </div>
            <div className='w-1/6 bg-[#235895] fixed h-screen' style={{
                right: 0,
                top: 0,
            }}>
            </div>
        </div>
    )
}
