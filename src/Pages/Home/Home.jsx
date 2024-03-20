import React from 'react'

export default function Home(props) {
    return (
        <div className='bg-[#FF751F] p-10 px-20'>
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="name" className='font-bold text-2xl'>Name</label>
                    <input
                        type="name"
                        className="form-control"
                        id="name"
                        placeholder="Enter article name"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description" className='font-bold text-2xl'>Description</label>
                    <textarea
                        type="description"
                        className="form-control"
                        id="description"
                        placeholder="Enter article description"
                        rows={4}
                        style={{
                            resize: 'none'
                        }}
                    />
                </div>
                <div className='flex justify-end items-center'>
                    <input style={{
                        width: '1.25rem',
                        height: '1.25rem',
                    }} className='form-check-input mr-2' type='checkbox' name='term' id='term' /> <label htmlFor="term" className='font-normal text-2xl'>Term of Conditions</label>
                </div>
                <div className='flex justify-between mt-4'>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        <div className="">
                            <button style={{ width: '100px', marginBottom: '5px', marginRight: '5px' }} type='button' className='bg-[#235895] text-white px-10 py-3 rounded-lg font-bold'>Browse</button>
                            <span>No file choosen</span>
                        </div>
                        <button style={{ width: '100px' }} type='button' className='bg-[#235895] text-white px-10 py-3 rounded-lg font-bold'>Pictures</button>
                    </div>
                    <div className=''>
                        <button type='button' className='bg-[#235895] text-white px-10 py-3 rounded-lg font-bold'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
