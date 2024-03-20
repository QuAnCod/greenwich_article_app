import React from 'react'
import { Outlet } from 'react-router'

export default function HomeTemplate(props) {
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
                        <h6 className='text-black text-2xl font-bold'>User 1</h6>
                        <h6 className='text-black text-lg'>
                            <span>Role: </span>
                            <span>Student</span>
                        </h6>
                        <h6 className='text-black text-lg'>
                            <span>Faculty: </span>
                            <span>IT</span>
                        </h6>
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
