import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { API_URL } from '../config/baseurl';
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginPage() {
    //USESTATE FOR USERNAME AND PASSWORD
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    //HANDLE LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post(`${API_URL}/auth/login`, {
                email: email,
                password: password
            });
            if (!email || !password) {
                Swal.fire({
                    icon: 'error',
                    title: 'ALERT',
                    text: 'make sure to fill all the fields',
                    confirmButtonColor: '#dc3545',
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'WELCOME',
                    text: 'Login Success!',
                    confirmButtonColor: '#dc3545',
                })
                navigate('/dashboard')
            }
        }
        catch (err) {
            alert(err.toString())
            console.log(err)
        }
    }
    return (
        <>
            <section id='loginpage'>
                <div className='w-100 vh-100'>
                    <div className='container'>
                        <div className='row text-center login-text my-3'>
                            <h1>Login</h1>
                        </div>
                        <form method='post' className='row justify-content-center align-items-center'>
                            <div className='wrapper-login border border-dark'>
                                <div className='row align-items-center justify-content-center'>
                                    <input type="email" className="mb-2 form-control" id="email" aria-describedby="emailHelp" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="password" className="form-control" id="password" aria-describedby="PasswordHelp" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className='row align-items-center justify-content-center'>
                                        <button className='mt-4 btn btn-dark btn-login' type='button' onClick={handleSubmit}>Login</button>
                                    </div>
                                </div>
                            </div>
                            <div className='row text-center mt-3'>
                                <p>Don't have an account ? <NavLink to='/register'>Register</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage