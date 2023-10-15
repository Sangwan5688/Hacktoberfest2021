import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./comp-css/register.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Signin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({email: "",password: ""});

  //Aos config
  
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  //to set the input value

  const onchange = (e) => {
    const { name, value } = e.target;
    setCred((cred1) => ({
      ...cred1,
      [name]: value,
    }));
  };

  //function to Handle the Api request to Signin


  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email: cred.email,
          password: cred.password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setCred({ email: "", password: ""});
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <>
      <div className="reg-wrap">
        <div data-aos="fade-up" className="outer_div" style={{ height: 'auto' }}>
          <div className="form-data" onSubmit={onsubmit}>
            <h2 style={{ textAlign: 'center', marginBottom: '5%' }}>Sign In</h2>
            <form autoComplete='off'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Email' name="email" value={cred.email} onChange={onchange} />
              <label htmlFor="password">Password</label>
              <input type={'password'} placeholder='Password' name="password" value={cred.password} onChange={onchange} />
              <button className='reg-btn'>Sign In</button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
