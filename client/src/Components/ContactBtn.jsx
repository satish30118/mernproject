import React from "react";
import "./contactbtn.css";

export default function ContactBtn(props) {
  return (
    <>
      <div className="c-btn">
        <i className={`fa-solid fa-${props.logo}`}></i>
        <div>
          <p style={{ paddingLeft: "10px", fontWeight: "600" }}>
            {props.name}
          </p>
          <p style={{ color: "gray" }}>{props.value}</p>
        </div>
      </div>
    </>
  );
}
