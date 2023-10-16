import React, {useState} from 'react'
import SignUP from './SignUP';
import '../App.css';

const headerStyle = {
    height: "8vh",
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "black",
}

const brand_logo = {
  width: "30%",
  paddingTop: "12px",
  color: "lightgreen",
  paddingLeft: "50px",
};

const header_list = {
    width: "60%",
    paddingTop:"15px",
}

const header_list_childs = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontSize: "17px",
  color: "lightblue",
  cursor: "pointer",
};

const signUpStyle = {
  width: "10%",
  paddingTop: "15px",
  display: "flex",
  justifyContent: "center",
};

export const playButtonStyle = {
  background: "lightgreen",
  border: "none",
  borderRadius: "2px",
  color: "black",
  padding: "5px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background 0.5s ease",
};

export default function Header() {

  return (
    <div style={headerStyle}>
      <div style={brand_logo}>
        <h3 style={{ fontFamily: "cursive" }}>LudoMania</h3>
      </div>
      <div style={header_list}>
        <ul className="header_list_li" style={header_list_childs}>
          <li>Home</li>
          <li>About</li>
          <li>FAQ</li>
          <li>Advertise with us</li>
          <li>Leaderboard</li>
          <li>Contact</li>
          <li className="playButtonStyle">
            <button style={playButtonStyle}>Play Now</button>
          </li>
        </ul>
      </div>
      <div style={signUpStyle}>
        <SignUP />
      </div>
    </div>
  );
}
