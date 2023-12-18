import React, { useState, useEffect } from "react";
import ContactBtn from "./ContactBtn";
import "./contact.css";

export default function Contact() {
  const [userdetail, setUserdetail] = useState({name:"",email:"", phone:"", message:""});

  const callContactPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserdetail({...userdetail, name:data.name, email:data.email, phone:data.phone});

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callContactPage();
  }, []);


  //handle data storing entered data 
  const handleData = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUserdetail({...userdetail,[name]:value})
  }

  
  //Send Data to backend

  const sendData = async (e) => {
    e.preventDefault();
    
    try{
      const { name, email, phone, message } = userdetail;

      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const response = await res.json();

      if (res.status === 201) {
        console.log("Message send sucessfully");
        window.alert("Message send sucessfully");
        setUserdetail({...userdetail, message:""});

      }else if(res.status === 422){
        console.log("User have't register");
        window.alert("You have not register, Register with us first");

      } else {
        console.log("Message not send");
        window.alert("Message not send");
      }
    }catch (err){console.log(err)}
  };

  return (
    <>
      <div className="contact-page">
        <div className="contact-btn">
          <a href="tel:7985017186">
          <ContactBtn name="Phone" value="+91 7985017186" logo="mobile" /></a>
          <a href="mailto:satish.cogni@gmail.com"><ContactBtn name="Email" value="satish.cogni@gmail.com" logo="envelope" /></a>
          <a href="https://wa.me/+917985017186" target="_blank">
          <ContactBtn name="Whatsapp" value="+91 7985017186" logo="whatsapp" /></a>
        </div>

        <div className="contact-form">
          <h1>CONTACT FORM</h1>
          <form method="POST">
            <div>
              <input
                type="text"
                id="name"
                value={userdetail.name}
                onChange={handleData}
                name="name"
                placeholder="Name"
                autoComplete="off"
                autoSave="off"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={userdetail.email}
                onChange={handleData}
              />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={userdetail.phone}
                onChange={handleData}
              />
            </div>
            <textarea
              name="message"
              id="message"
              cols="20"
              rows="5"
              onChange={handleData}
              value={userdetail.message}

              placeholder="Write your queries ...."
            ></textarea>

            <input id="contact-btn" type="button" value="Send Message" onClick={sendData}/>
          </form>
        </div>
      </div>
    </>
  );
}
