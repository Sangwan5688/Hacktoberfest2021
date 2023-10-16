import React, { useState } from "react";
import { playButtonStyle } from "./Header";
import axios from "axios";
import Cookies from "universal-cookie";

const LoginSignUpStyle = {
  display: "flex",
  flexDirection: "column",
}


const LoginSignup = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    username: "",
    email:"",
    password: "", 
  });

  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: "",
  })

//   const [user, setUser] = useState(null);

  const handleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  const handleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const dataSignUp = ()=>{
    const cookies = new Cookies();

    axios.post("http://localhost:3001", userSignUpInfo).then((res) => {
      const { token, userId, username, email, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("email", email);
      cookies.set("hashedPassword", hashedPassword);
    });
  }

  const dataLogIn = ()=>{
    const cookies = new Cookies();

    axios.post("http://localhost:3001", userLoginInfo).then((res) => {
      const { token, userId, username, email, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("email", email);
      cookies.set("hashedPassword", hashedPassword);
    });
  }

  console.log(userLoginInfo);

  return (
    <div>
      <button style={playButtonStyle} onClick={handleLogin}>
        Login
      </button>
      {(showLogin || showSignup) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            margin: "auto",
          }}
        >
          <div
            style={{
              padding: 20,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
            }}
          >
            {showLogin && (
              <div style={LoginSignUpStyle}>
                <h2 style={{ color: "white" }}>Login</h2>
                <input type="text" placeholder="Username" onChange={(e)=>setUserLoginInfo({...userLoginInfo, username:e.target.value})}/>
                <input type="password" placeholder="Password" onChange={(e)=>setUserLoginInfo({...userLoginInfo, password:e.target.value})}/>
                <button onClick={dataLogIn}>Submit</button>
                <button onClick={handleSignup}>Signup</button>
                <button onClick={handleLogin}>X</button>
              </div>
            )}
            {showSignup && (
              <div style={LoginSignUpStyle}>
                <h1 style={{ color: "white" }}>Sign Up</h1>
                <input type="text" placeholder="Username" style={{margin:"10px"}} onChange={(e)=>setUserSignUpInfo({...userSignUpInfo, username:e.target.value})}/>
                <input type="email" placeholder="Email" style={{margin:"10px"}} onChange={(e)=>setUserSignUpInfo({...userSignUpInfo, email:e.target.value})}/>
                <input type="password" placeholder="Password" style={{margin:"10px"}} onChange={(e)=>setUserSignUpInfo({...userSignUpInfo, password:e.target.value})}/>
                <button onClick={dataSignUp}>Submit</button>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>X</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
