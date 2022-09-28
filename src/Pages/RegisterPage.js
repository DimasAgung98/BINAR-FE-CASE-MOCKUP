import React from 'react';
import { NavLink } from 'react-router-dom';

function RegsiterPage() {
    return (
        <>
            <section id='registerpage'>
                <div className='w-100 vh-100'>
                    <div className='container'>
                        <div className='row text-center login-text my-3'>
                            <h1>Register</h1>
                        </div>
                        <div className='row justify-content-center align-items-center'>
                            <div className='wrapper-register border border-dark'>
                                <div className='row align-items-center justify-content-center'>
                                    <input type="text" className="form-control" id="exampleInputText" aria-describedby="TextHelp" placeholder='Text' />
                                    <input type="email" className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' />
                                    <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="PasswordHelp" placeholder='Password' />
                                    <div className='row align-items-center justify-content-center'>
                                        <button className='mt-4 btn btn-dark btn-login' type='button'>Register</button>
                                    </div>
                                </div>
                            </div>
                            <div className='row text-center mt-3'>
                                <p>Already have account ? <NavLink to='/'>Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegsiterPage