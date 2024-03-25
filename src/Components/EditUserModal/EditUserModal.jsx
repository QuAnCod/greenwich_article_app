import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserEdit, updateUserForAdminAction } from '../../Redux/reducers/userReducer';
import { setModalEditOpen, setModalOpen } from '../../Redux/reducers/modalReducer';

export default function EditUserModal(props) {

    const { modalEditOpen } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const { userEdit } = useSelector((state) => state.userReducer);

    const handleOnChange = (e) => {
        console.log(e.target.value)
        console.log(e.target.id)
        dispatch(setUserEdit({
            ...userEdit,
            [e.target.id]: Number(e.target.value),
        }));
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserForAdminAction(userEdit));
    }

    useEffect(() => {

    }, [userEdit])


    return (
        modalEditOpen ?
            (<div className='w-full h-full' style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} id='create-user-modal'>
                <div className='p-5' style={{
                    backgroundColor: 'white',
                    width: '500px',
                    borderRadius: '10px'
                }} id='create-user-form'>
                    <form onSubmit={handleOnSubmit}>
                        <div className='form-group mb-3'>
                            <label htmlFor='username' className=''>Username</label>
                            <input
                                className='form-control'
                                type='text'
                                id='username'
                                placeholder='Enter your username'
                                value={userEdit.username}
                                disabled
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='email' className=''>Email</label>
                            <input
                                className='form-control'
                                type='text'
                                id='email'
                                placeholder='Enter your email'
                                value={userEdit.email ? userEdit.email : ''}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='role_id' className=''>Set Role</label>
                            <select
                                className='form-select'
                                id='role_id'
                                defaultValue={userEdit.role?.id}
                                onChange={handleOnChange}
                            >
                                <option value={1}>GUEST</option>
                                <option value={2}>STUDENT</option>
                                <option value={3}>MARKETING COORDINATE</option>
                                <option value={4}>MARKETING MANAGER</option>
                            </select>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='faculty_id' className=''>Set Faculty</label>
                            <select
                                className='form-select'
                                id='faculty_id'
                                defaultValue={userEdit.faculty?.id}
                                onChange={handleOnChange}
                            >
                                <option value={0}>Choose Faculty</option>
                                <option value={1}>Faculty of Computer</option>
                                <option value={2}>Faculty of Business</option>
                                <option value={3}>Faculty of Design</option>
                            </select>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='is_active' className=''>Set Active</label>
                            <select
                                className='form-select'
                                id='is_active'
                                defaultValue={userEdit.active ? 1 : 0}
                                onChange={handleOnChange}
                            >
                                <option value={0}>Inactive</option>
                                <option value={1}>Active</option>
                            </select>
                        </div>
                        <div className='flex justify-end'>
                            <button className='btn btn-primary mr-3'>Edit</button>
                            <button type='button' className='btn btn-danger' onClick={() => {
                                const action = {
                                    type: "userReducer/setUserEdit",
                                    payload: {
                                        username: "",
                                        email: "",
                                        role: "",
                                        faculty: "",
                                        active: ""
                                    }
                                }
                                dispatch(action)
                                dispatch(setModalEditOpen(false))
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>) : null
    )
}
