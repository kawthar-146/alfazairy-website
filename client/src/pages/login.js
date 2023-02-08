import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import image345 from '../components/assets/Trianglify.png';
import './login.css';

const Login = (props) => {
  useEffect(() => {
    props.setShowNavFoot(false);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    };

    let errorSent = false;
    try {
      const response = await fetch('/api/admin/login', requestOptions);

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        console.log(data);
        props.setAdminLoggedIn(true);
        navigate('/admin/dashboard');
      } else {
        if (response.status === 400) {
          setInvalidCredentialsMessage(data.message);
          errorSent = false;
        }
      }
    } catch (err) {
      //If invalid credentials
      if (!errorSent) {
        alert('Server is currently unavailable');
      }
    }
  };
  return (
    <Fragment>
      <div className='container-page'>
        <h1>Dashboard</h1>
        <div className='login-form'>
          <form
            className='login-form-container'
            action=''
            onSubmit={submitHandler}
          >
            {invalidCredentialsMessage && (
              <div className='invalid-credentials-div'>
                {invalidCredentialsMessage}
              </div>
            )}
            <div className='login-email-section'>
              <label htmlFor='Email'></label>
              <input
                className='login-input-one'
                required
                placeholder='Email@domain.com'
                type='email'
                id='Email'
                name='Email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='login-password-section'>
              <label htmlFor='Password'></label>
              <input
                className='login-input-two'
                required
                placeholder='Password'
                type='password'
                id='Password'
                name='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className='login-button' type='submit'>
              Log in
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
