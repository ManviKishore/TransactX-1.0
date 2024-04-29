import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import UserContext from './Auth/UseContext';
import { Typography } from '@mui/material';

const Login = () => {
    
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { setUser } = useContext(UserContext);

  const [successMessage, setSuccessMessage] = useState(null);

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  //Handling form validation
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: data.username,
              email:data.email,
              password: data.password
          })
      });

      if(response.ok){
        const { token } = await response.json();
        localStorage.setItem('token', token); 
        // setUser(data.username, stayLoggedIn);
        setUser(data.username.charAt(0).toUpperCase() + data.username.slice(1), stayLoggedIn);
        setSuccessMessage("Logged in successfully!");
        setData({
          username: '',
          password: '',
        });
        setTimeout(() => {
          navigate(from?.pathname || "/home", { replace: true });
        }, 1000);
      
      }else{
      const errorData = await response.json();
      console.error('Login failed:', errorData.error);
      }
    } catch(error){
      console.error('Login error:', error);
      }
      
  };


  return (
    <>
      <main className="login-container">   
        <div className='form-container'>
          
          <form className="form" onSubmit={handleSubmit} autoComplete="new-password">
            <div className='form-title'>
              TransactX Login
            </div>
            <div className="">
              <label className="form-label" >
                Username
                <input type="text" 
                name="username" 
                className='form-group' 
                placeholder='Enter Your Username'
                autoComplete="new-password"
                value={data.username}
                onChange={handleChange}
                />
                </label>
              </div>
              
              <div className="">
                <label htmlFor="password" className='form-label'>Password
                <input type="password" 
                placeholder="Enter Your Password" 
                autoComplete="new-password"
                id="password" 
                name="password" 
                className='form-group' 
                value={data.password}
                onChange={handleChange}
                />
                
               
                </label>
              </div>
              
              <div className="input-control">
                <label htmlFor="stayLoggedIn" className=''>Stay Logged In? 
                <input type="checkbox" 
                  id="stayLoggedIn" 
                  name="stayLoggedIn" 
                  className='' 
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                />
                </label>
              </div>
              <div className='button-section'>
                <button className='button' type='submit'>
                  <span>Login</span>
                </button>
              </div>
            </form>
            <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
              {successMessage}
            </Typography>
            
          </div>
        </main> 
    </>
  );
};


export default Login;
