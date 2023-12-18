import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import regside from './Image/register-side.jpg'

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleData = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const sendData = async (e) => {
    // console.log(e);
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = data;
    const res = await fetch("/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });
    const response = await res.json();
    console.log(res.status)  //give status code
    if(response === "Empty field check properly"){
      window.alert("Invalid Registration, FILL ALL FIELD PROPERLY");
      // console.log("Invalid Registration");
    }else if(response === "Email Already Exist"){
      window.alert("Email Already Exist");
    }
    else if(response === "Password and confirm password not match"){
      window.alert("Password and confirm password not match");
    }
    else{
      window.alert("Registration Success");
      // console.log("Registration success");
      navigate("/login")
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-form">
          <div className="register-user-logo">
            <img src={regside} alt="Register Image" />
            <NavLink to={"/login"}>Have a account - Login</NavLink>
          </div>
          <div className="reg-form-wrapper">
          <form method="POST">
            <h1 className="reg-form-heading">Register Form</h1>
            <div className="reg-form-row">
              <div className="reg-form-icon">
            <i class="fa-solid fa-user"></i>
            </div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                autoComplete="off"
                value={data.name}
                onChange={handleData}
                name="name"
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-envelope"></i>
            </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abcd1234@gmail.com"
                autoComplete="off"
                value={data.email}
                onChange={handleData}
              />
            </div>
            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-briefcase"></i>
            </div>
              <input
                type="text"
                name="work"
                id="work"
                placeholder="Proffesion"
                autoComplete="off"
                value={data.work}
                onChange={handleData}
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-phone"></i>
            </div>
              <input
                type="number"
                name="phone"
                id="mobile"
                placeholder="1234567890"
                autoComplete="off"
                value={data.phone}
                onChange={handleData}
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-lock"></i>
            </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                autoComplete="off"
                value={data.password}
                onChange={handleData}
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-lock"></i>
            </div>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="********"
                autoComplete="off"
                value={data.cpassword}
                onChange={handleData}
              />
            </div>

            <div className="reg-form-btn">
              <input
                type="button"
                className="btn register_btn"
                value="Register"
                onClick={sendData}
              />
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}
