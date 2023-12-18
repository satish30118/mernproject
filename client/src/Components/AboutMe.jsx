import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './aboutme.css'
import userimg from './Image/login-bg.jpg'

export default function AboutMe() {
  const navigate = useNavigate();
  const [userdetail, setUserdetail] = useState({});
  const [rating, setRating] = useState("3");

  // const genRating = () =>{
  //   const Ranum = Math.ceil((Math.random()*10));
  //   setRating(Ranum)
  // }
  // console.log(genRating)
  
  

  const callAboutPage = async()=>{
    try {
      const res = await fetch("/about",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include',
      })

      const data = await res.json();
      console.log(data);
      setUserdetail(data);

      if(!res.status===200){
        const err = new Error(res.err)
        throw err
      }


    } catch (error) {
      console.log(error);
      // window.alert("LOGIN FIRST TO SEE YOUR DETAILS")
      navigate("/login")
      
    }
  }
  useEffect(()=>{
    callAboutPage();
    // genRating()
   
  },[])

  return (
    <>
      <div className="about-page">
        <div className="about-user">
          <form method='GET'>
          <div className="about-user-top">
            <div className="user-img">
              <img src={userimg} alt="user-img" />
            </div>
            <div className="user-data">
              <div>
              <p>{userdetail.name}</p>
              <p>{userdetail.work}</p>
              {/* <p>Rating {rating}/10</p> */}
              </div>
              <div>
              <NavLink to={"#about"}>About</NavLink>
              {/* <NavLink to={"#timeline"}>Time Line</NavLink> */}
              </div>
            </div>
          </div>
          <div className="about-user-bottom">
            <div>
             <p>User Id</p>
             <p>Name</p>
             <p>Email</p>
             <p>Phone</p>
             <p>Proffesion</p>
            </div>
            <div style={{color:'blue'}}>
              <p>{userdetail._id}</p>
              <p>{userdetail.name}</p>
              <p>{userdetail.email}</p>
              <p>+91 {userdetail.phone}</p>
              <p>{userdetail.work}</p>
            </div>

          </div>
          </form>
        </div>
      </div>
    </>
  )
}
