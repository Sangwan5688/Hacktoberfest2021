import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "./comp-css/register.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Register = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("false");
    const [cred, setCred] = useState({ fname: "",lname: "",institution: "",course: "",email: "",password: "" });

    // saving the input value

    const onchange = (e) => {
        const { name, value } = e.target;
        setCred((cred1) => ({
            ...cred1,
            [name]: value,
        }));
    };

    ///API request to register the user

    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:3001/api/auth/register",
                {
                    name: cred.fname + " " + cred.lname,
                    email: cred.email,
                    password: cred.password,
                    institution: cred.institution,
                    userType: type ? "Teacher" : "student",
                    course: cred.course
                },
                config
            );
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setCred({fname: "",lname: "",email: "",institution: "",course: "",password: ""});
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="reg-wrap">
                <div data-aos="fade-up" className="outer_div">
                    <div className="profession">
                        <button className={type ? "prof-btn colr" : "prof-btn"} onClick={() => { setType(true) }}>TEACHER</button>
                        <button className={!type ? "prof-btn colr" : "prof-btn"} onClick={() => { setType(false) }}>STUDENT</button>

                    </div>
                    <div className="form-data" onSubmit={onsubmit}>
                        <form autoComplete='off'>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" placeholder='First Name' name='fname' value={cred.fname} onChange={onchange} />
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" placeholder='Last Name' name='lname' value={cred.lname} onChange={onchange} />
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Email' name="email" value={cred.email} onChange={onchange} />
                            <label htmlFor="institution">Institution</label>
                            <input type={'text'} placeholder='Institution' name="institution" value={cred.institution} onChange={onchange} />
                            <label htmlFor="course">Course</label>
                            <input type={'text'} placeholder='Course' name="course" value={cred.course} onChange={onchange} />
                            <label htmlFor="password">Password</label>
                            <input type={'password'} placeholder='Password' name="password" value={cred.password} onChange={onchange} />
                            <button className='reg-btn'>Register</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
