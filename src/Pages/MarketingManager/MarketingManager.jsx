import React from 'react'

export default function MarketingManager() {
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
            <div className='bg-[#235895] h-[50px] flex items-center'>
                <div className='w-full'>
                    <form className='flex justify-around'>
                        <select className="w-1/4 rounded-xl" aria-label="Default select example">
                            <option selected>Choose Faculty</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <button className='btn btn-warning'><i class="fa fa-download" aria-hidden="true"></i> Download ZIP</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
