import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../config/baseurl';
import Swal from 'sweetalert2';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //HANDLE ON REGISTER
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            axios.post(`${API_URL}/auth/signup`, {
                name: name,
                email: email,
                password: password
            });
            Swal.fire({
                icon: 'success',
                title: 'REGISTER SUCCESSFULLY',
                confirmButtonColor: '#dc3545',
            })
        }
        catch (err) {
            alert(err.toString())
            console.log(err)
        }
    }

    return (
        <>
            <section id='registerpage'>
                <div className='w-100 vh-100'>
                    <div className='container'>
                        <div className='row text-center login-text my-3'>
                            <h1>Register</h1>
                        </div>
                        <form method='post' className='row justify-content-center align-items-center' onSubmit={handleRegister}>
                            <div className='wrapper-register border border-dark'>
                                <div className='row align-items-center justify-content-center'>
                                    <input type="text" className="form-control" id="exampleInputText" aria-describedby="TextHelp" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                                    <input type="email" className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                    <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="PasswordHelp" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                    <div className='row align-items-center justify-content-center'>
                                        <button className='mt-4 btn btn-dark btn-login' type='submit'>Register</button>
                                    </div>
                                </div>
                            </div>
                            <div className='row text-center mt-3'>
                                <p>Already have account ? <NavLink to='/'>Login</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;