/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style/Login.css";
import { v4 as uuidv4 } from "uuid";


import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function Signup() {
  const navigate = useNavigate();

  const [hideAsideMenu, setHideAsideMenu] = useState(
    window.localStorage.getItem("AsideMenuVisibility") || "show"
  );
  // update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  window.addEventListener("storage", () => {
    setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"));
  });

  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [formInputClicked, setFormInputClicked] = useState({
    fName: false,
    lName: false,
    email: false,
    password: false,
  });

  const handleSignUp = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post('https://frantic-slug-lab-coat.cyclic.app/auth/register', user, {
        headers: {
            'Content-Type': 'application/json'
        }});
        console.log(response.data); // Handle success
        localStorage.setItem('token', response.data.token);

        navigate('/')
        window.location.reload()

    } catch (error) {
      console.error(error); // Handle error
    }


  };



  return (
    <>
      <div className={`login-element-container ${
        hideAsideMenu === "show"
          ? "movie-details-minus-200px-width"
          : "movie-details-minus-50px-width"
      } `}>
        <div className={`under-login-element-container ${
        hideAsideMenu === "show"
          ? "movie-details-minus-200px-width"
          : "movie-details-minus-50px-width"
      } `}>
          <div className="under-under-login-element-container">
            <div className="login-titles-div">
              <h4 style={{margin: '0', color: 'gray'}}>START FOR FREE</h4>
              <h1 style={{fontWeight: 'bolder', fontSize: '50px', margin: '0'}}>Create new account<span style={{ color: 'red', fontSize: '70px', margin: '0' }}>.</span></h1>
              <p style={{marginBottom: '30px'}}>
                Already A Member? <Link style={{ color: 'red', textDecoration: 'none', marginLeft: '2px' }} to={"/login"}>Log In</Link>
              </p>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="name-sec">
                <div className="input-div">
                  <input
                    onChange={(e) => {setUser({...user, fName: e.target.value});}}
                    onFocus={() => setFormInputClicked({ ...user, fName: true })}
                    onBlur={(e) => e.target.value === '' ? setFormInputClicked({ ...user, fName: false }) : ''}
                    type="text"
                    className="names"
                    id="textFNameInput"
                  />
                  <label
                    className={
                      formInputClicked.fName
                        ? "input-div-label-up"
                        : "input-div-label-down"
                    }
                    htmlFor="textFNameInput"
                  >
                    First name
                  </label>
                  <PersonIcon style={
                    formInputClicked.fName
                    ? { position: 'absolute', color: 'red', right: '5px', top: '25%', fontSize: '29px' }
                    : { position: 'absolute', color: 'white', right: '5px', top: '25%', fontSize: '29px' }
                  }/>
                </div>
                <div className="input-div">
                  <input
                    onChange={(e) => {setUser({...user, lName: e.target.value});}}
                    onFocus={() => setFormInputClicked({ ...user, lName: true })}
                    onBlur={(e) => e.target.value === '' ? setFormInputClicked({ ...user, lName: false }) : ''}
                    type="text"
                    className="names"
                    id="textLNameInput"
                  />
                  <label
                    className={
                      formInputClicked.lName
                        ? "input-div-label-up"
                        : "input-div-label-down"
                    }
                    htmlFor="textLNameInput"
                  >
                    Last name
                  </label>
                  <PersonIcon style={
                    formInputClicked.lName
                    ? { position: 'absolute', color: 'red', right: '5px', top: '25%', fontSize: '29px' }
                    : { position: 'absolute', color: 'white', right: '5px', top: '25%', fontSize: '29px' }
                  }/>
                </div>
              </div>
              <div className="input-div">
                <input
                  onChange={(e) => {setUser({...user, email: e.target.value});}}
                  onFocus={() => setFormInputClicked({ ...user, email: true })}
                  onBlur={(e) => e.target.value === '' ? setFormInputClicked({ ...user, email: false }) : ''}
                  type="email"
                  id="textEmailInput"
                />
                <label
                  className={
                    formInputClicked.email
                      ? "input-div-label-up"
                      : "input-div-label-down"
                  }
                  htmlFor="textEmailInput"
                >
                  Email
                </label>
                <EmailIcon style={
                    formInputClicked.email
                    ? { position: 'absolute', color: 'red', right: '5px', top: '25%', fontSize: '29px' }
                    : { position: 'absolute', color: 'white', right: '5px', top: '25%', fontSize: '29px' }
                  }/>
              </div>
              <div className="input-div">
                <input
                  onChange={(e) => {setUser({...user, password: e.target.value});}}
                  onFocus={() => setFormInputClicked({ ...user, password: true })}
                  onBlur={(e) => e.target.value === '' ? setFormInputClicked({ ...user, password: false }) : ''}
                  type={passwordVisibility ? 'password' : 'text'}
                  id="textPasswordInput"
                />
                <label
                  className={
                    formInputClicked.password
                      ? "input-div-label-up"
                      : "input-div-label-down"
                  }
                  htmlFor="textPasswordInput"
                >
                  Password
                </label>
                {
                  !passwordVisibility
                  ? <VisibilityOffIcon onClick={() => setPasswordVisibility(!passwordVisibility)} style={
                    formInputClicked.password
                    ? { position: 'absolute', color: 'red', right: '5px', top: '25%', fontSize: '29px' }
                    : { position: 'absolute', color: 'white', right: '5px', top: '25%', fontSize: '29px' }
                  }/>
                  : <VisibilityIcon onClick={() => setPasswordVisibility(!passwordVisibility)} style={
                    formInputClicked.password
                    ? { position: 'absolute', color: 'red', right: '5px', top: '25%', fontSize: '29px' }
                    : { position: 'absolute', color: 'white', right: '5px', top: '25%', fontSize: '29px' }
                  }/>
                }
                </div>
                <div className="signup-buttons-submit">
                  <p className="signup-buttons-submit-1st-btn">Change method</p>
                  <p onClick={handleSignUp} className="signup-buttons-submit-2nd-btn">Create account</p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

// <form className="login-form-container" onSubmit={() => console.log('submitted')}>
//               <div>
//                 <label className="titleLabel-login">Email address</label>
//                 <input className="input-form-login" onChange={(e) => {setUser({...user, email: e.target.value});}} type="email"/>
//               </div>
//               <div>
//                 <label className="titleLabel-login">Password</label>
//                 <input className="input-form-login" onChange={(e) => {setUser({...user, password: e.target.value});}} type="password"/>
//               </div>
//               <Link className="DonthaveAccountSignUp" to="/signup">Don't have Account, Sign Up</Link>
//               <br/>
//               <div>
//                 <input className="login-submit-btn" onClick={signupUser} type={"submit"}/>
//               </div>
//               <br/>
//               <p>Or continue with</p>
//               <div className="login-socialmedia-btns">
//                 <div  className="login-socialmedia-btn-btn">
//                   <FacebookRounded/>
//                 </div>
//                 <div  className="login-socialmedia-btn-btn">
//                   <Google/>
//                 </div>
//                 <div className="login-socialmedia-btn-btn">
//                   <Apple/>
//                 </div>
//               </div>
//             </form>
