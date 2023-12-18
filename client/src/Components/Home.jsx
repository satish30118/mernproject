import React, {useState, useEffect} from "react";
import './home.css'

export default function Home() {
  const [userdetail, setUserdetail] = useState({});
  const [msg, setMsg] = useState("");
  const callHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          // Accept:"application/json",
          "Content-Type": "application/json",
        },
        // credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserdetail(data);
      setMsg("Hello")

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <>
      <div className="home-page">
      <h1 id="dynamic">{msg} {userdetail.name}</h1> <br/>
        <h1 className="home-page-heading">WELCOME TO HOME PAGE</h1> 
        
      </div>
    </>
  );
}
