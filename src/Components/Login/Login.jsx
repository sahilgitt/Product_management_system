import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const loginApi = "https://textile.torcdeveloper.com/api/v1/login";

  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [errormsg, seterrormsg] = useState(false)
  const [loading, setLoading] = useState(false);

  const getInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();
    setLoading(true); 

    axios.post(loginApi, input)
      .then((response) => {
        setLoading(false); 
        navigate('/Home');
      }) 
      .catch((err) => {
        setLoading(false); 
        // alert(err.response.data.message);
        seterrormsg("password is incorrect")
      });
  };

  return (
    <div className='form'>
    <div className='cover'>
      <h1 style={{ color: "gray",marginTop:"10px" }}>Login Page</h1>
      <form onSubmit={submitData}>
        <input className='input-set' type="email" placeholder='Email address' onChange={getInput} name="email" />
        <input className='input-set' type="text" placeholder='Password' onChange={getInput} name="password" />
        {errormsg && (<p className='error'style={{color:"red"}}>{errormsg}</p>)}
        {loading ? (
          <button class="btn btn-primary" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        ) : (
          <button className='login-btn' type='submit'>Submit</button>
        )}
      </form>
    </div>
    </div>
  );
}

export default Login;

