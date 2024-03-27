import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewAcademicYear } from '../../Redux/reducers/academicYearsReducer';
import { DatePicker } from 'antd';
import { setModalCreateAcademicYearOpen } from '../../Redux/reducers/modalReducer';

export default function CreateNewAcademicYear(props) {

    const { modalCreateAcademicYearOpen } = useSelector((state) => state.modalReducer);

    const dispatch = useDispatch();

    const [newAcademicYear, setNewAcademicYear] = React.useState({
        year: '',
        current: 0,
    });

    const handleOnChange = (date, dateString) => {
        console.log(Number(dateString));
        setNewAcademicYear({
            ...newAcademicYear,
            year: Number(dateString),
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewAcademicYear(newAcademicYear));
    }

    return (
        modalCreateAcademicYearOpen ?
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
                    <h2 className='text-center'>Create New Academic Year</h2>

                    <form onSubmit={handleOnSubmit}>
                        <div className='form-group mb-3'>
                            <label htmlFor='year' className='form-label'>Year</label>
                            <DatePicker name='year' onChange={handleOnChange} picker="year" style={{
                                width: '100%'
                            }} />
                        </div>
                        <div className='form-group mb-3 text-end'>
                            <button type='submit' className='btn btn-primary'>Create</button>
                            <button type='button' className='btn btn-danger ml-2' onClick={() => dispatch(setModalCreateAcademicYearOpen(false))}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>) : null
    )
}
