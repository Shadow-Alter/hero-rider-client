import React, { useState, useContext } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from 'react-icons/fc'
import { Link, useHistory, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/login.svg';
import './Login.css'
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [signInInfo, setaSignInInfo] = useState();
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault()
    const info = { ...signInInfo }
    info[e.target.name] = e.target.value
    setaSignInInfo(info)

  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if(signInInfo.email && signInInfo.password){
      try {
        await logIn(signInInfo.email, signInInfo.password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <section className="" style={{marginTop:"130px"}}>
    <div
      className="container"
    //    d-flex justify-content-center align-items-center
      style={{ minHeight: "100vh" }}
    >
      <div className="row">
        <div className="col-md-7 shadow-sm rounded-3 border p-4 d-flex flex-column justify-center align-items-center">
          <h3 className='text-brand'>Enter Your Credential</h3>
          <div className="w-75 py-2">
            <HiOutlineMail className="fs-4 my-2 text-brand" />
            <label htmlFor="email" className="px-1">
              Email
            </label>
            <input
              onChange={handleInput}
              name="email"
              type="email"
              className="custom-input d-block w-100 px-3 py-3 rounded"
              placeholder="John@Example.com"
      
            />
          </div>
          <div className="w-75 py-2">
            <RiLockPasswordLine className="fs-4 my-2 text-brand" />
            <label htmlFor="email" className="px-1">
              Password
            </label>
            <input
            onChange={handleInput}
            name="password"
              type="password"
              className="custom-input d-block w-100 px-3 py-3 rounded"
              placeholder="Must be at-least 6 Characters"
              
            />
          </div>
          <button onClick={handleSignIn} className="btn-brand-outline w-50 mt-2">Login</button>
         
          <div className="w-75 text-center py-3">
            <p>New to Hero Rider?</p>
            <div className="d-md-flex justify-content-evenly">
              <Link to="/register/rider">
                <button className="btn-brand-outline rounded-pill mb-2">
                  Register as Rider
                </button>
              </Link>
              <Link to="/register/learner">
                <button className="btn-brand-outline rounded-pill">
                  Register as Learner
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center py-5">
          <img className="img-fluid" src={login} alt="" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;