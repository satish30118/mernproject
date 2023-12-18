import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import './login.css'

export default function Login() {
  const navigate = useNavigate();
  const [showresult, setShowResult] = useState();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const emailDataHandle = (e) =>{
        console.log(e);
        setEmail(e.target.value);
    }
    const passDataHandle = (e) =>{
        console.log(e);
        setPassword(e.target.value)
    }

    //sending data
    const sendData = async(e) => {
        console.log(e);
        
        const res = await fetch("/login",{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({email,password})
        });
        const response = await res.json()
        console.log(response)

        if(response==="fill empty data"){
          setShowResult("Fill empty data");
          // setShowResult("")

        }else if(response==="Invalide Creational"){
          setShowResult("Invalide Creatinals");
        }else{
          window.alert("Login successful!!")
          navigate("/aboutme")
        }
    }
    
  return (
    <>
      <div className="login-page">
        <div className="login-form">
          <h1 className="login-form-heading">Account Login</h1>
          <div className="login-user-logo">
          <i class="fa-solid fa-user"></i>
          </div>
                <form method="POST" autoComplete="off">
                    <div className="form-row">
                        <i class="fa-solid fa-user"></i>
                        <input type="email" name="email" placeholder="Email Id" id="email" value={email} onChange={emailDataHandle} autoComplete="off"/>
                    </div>
                    <div className="form-row">
                    <i class="fa-solid fa-lock"></i>
                        <input type="password" name="password" placeholder="********"  id="password" value={password} 
                        onChange={passDataHandle} autoComplete="off"/>
                    </div>
                    <div className="login-btn">
                        <input type="button" value="Login" onClick={sendData} />
                    </div>
                    <div className="no-account">
                      <NavLink to={"/register"}>Don't have Account - Register</NavLink> 
                    </div> 
                    <div style={{color:"red", fontSize:"25px"}}>{showresult}</div>
                </form>
        </div>
      </div>
    </>
  );
}
