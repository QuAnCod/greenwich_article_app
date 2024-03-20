import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ButtonsMod from '../../Components/Buttons/ButtonsMod'
import { validateConfirmPassword, validateEmail, validatePassword } from '../../Utils/function/helperFunc'
import { useDispatch, useSelector } from 'react-redux'
import { ROLE } from '../../Utils/constanst/localConstanst'
import { registerAction } from '../../Redux/reducers/userReducer'



function Register(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data } = useSelector(state => state.userReducer.userRegister)

    const [formRegis, setFormRegis] = React.useState({
        username: '',
        password: '',
        retype_password: '',
        role_id: ROLE.GUEST
    })

    const handleOnChange = (e) => {
        setFormRegis({
            ...formRegis,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(formRegis)
        // if (!validateEmail(formRegis.username) || !validatePassword(formRegis.password) || !validateConfirmPassword(formRegis.password, formRegis.confirmPassword)) return;
        // else {
        //     dispatch(registerAction(formRegis))
        // }

        dispatch(registerAction(formRegis))
        alert('Register success')
    }

    // useEffect(() => {
    //     if (!data?.error) {
    //         navigate('/login')
    //     }
    // }, [data])

    return (
        <div style={{
            backgroundImage: `url(${require('../../assets/img/Background_1.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: -1,
            }}></div>
            <div className='container' style={{
                maxWidth: '30%',
                minHeight: '70%',
                padding: '10% 5%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group mb-10">
                        <label htmlFor="username" className='font-bold text-2xl'>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name='username'
                            placeholder="Enter email"
                            onChange={handleOnChange}
                        />
                        <small className='text-red-500'>{formRegis.username && !validateEmail(formRegis.username) ? 'Invalid email' : ''}</small>
                    </div>
                    <div className="form-group mb-10">
                        <label htmlFor="password" className='font-bold text-2xl'>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            placeholder="Password"
                            onChange={handleOnChange}
                        />
                        <small className='text-red-500'>{formRegis.password && !validatePassword(formRegis.password) ? 'Password must be at least 6 characters' : ''}</small>
                    </div>
                    <div className="form-group mb-10">
                        <label htmlFor="confirmPassword" className='font-bold text-2xl'>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="retype_password"
                            name='retype_password'
                            placeholder="Confirm Password"
                            onChange={handleOnChange}
                        />
                        <small className='text-red-500'>{formRegis.confirmPassword && !validateConfirmPassword(formRegis.password, formRegis.confirmPassword) ? 'Password does not match' : ''}</small>
                    </div>
                    <div className="form-group mb-10 flex justify-center">
                        <ButtonsMod htmlContent='Sign-up' />
                    </div>
                </form>
                <div className='mt-3 flex justify-center'>
                    <span className='mr-1'>Already have account?</span>
                    <NavLink className='hover:text-[#5E5BFF] text-[#333] no-underline' to='/login'>Sign-in</NavLink>
                </div>
            </div>
        </div >
    )
}

export default Register