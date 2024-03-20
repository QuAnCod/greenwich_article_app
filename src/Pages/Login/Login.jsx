import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ButtonsMod from '../../Components/Buttons/ButtonsMod'
import { validateConfirmPassword, validateEmail, validatePassword } from '../../Utils/function/helperFunc'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../Redux/reducers/userReducer'
import { ROLE } from '../../Utils/constanst/localConstanst'

function Login(props) {

    const { data } = useSelector(state => state.userReducer.userLogin)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formLogin, setFormLogin] = React.useState({
        username: '',
        password: '',
    })

    const handleOnChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.id]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(formLogin)
        if (!validateEmail(formLogin.username) || !validatePassword(formLogin.password)) return;
        else {
            dispatch(loginAction(formLogin))
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            switch (data?.roleId) {
                case ROLE.ADMIN:
                    navigate('/admin')
                    break;
                case ROLE.STUDENT:
                    navigate(`/home/${data.id}`)
                    break;
                case ROLE.MARKETING_CORDINATOR:
                    navigate('/coordinator')
                    break;
                case ROLE.MARKETING_MANAGER:
                    navigate('/manager')
                    break;
                case ROLE.GUEST:
                    navigate('/guest')
                    break;
                default:
                    break;
            }
        }
    }, [data])

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
                    <div className="form-group mb-16">
                        <label htmlFor="email" className='font-bold text-2xl'>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter email"
                            onChange={handleOnChange}
                        />
                        <small className='text-red-500'>{formLogin.username && !validateEmail(formLogin.username) ? 'Invalid email' : ''}</small>
                    </div>
                    <div className="form-group mb-16">
                        <label htmlFor="password" className='font-bold text-2xl'>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={handleOnChange}
                        />
                        <small className='text-red-500'>{formLogin.password && !validatePassword(formLogin.password) ? 'Password must be at least 8 characters' : ''}</small>
                    </div>
                    <div className="form-group mb-10 flex justify-center">
                        <ButtonsMod htmlContent='Sign-in' />
                    </div>
                </form>
                <div className='mt-3 flex justify-center'>
                    <span className='mr-1'>Don't have an account?</span>
                    <NavLink className='hover:text-[#5E5BFF] text-[#333] no-underline' to='/register'>Sign-up</NavLink>
                </div>
            </div>
        </div >
    )
}

export default Login