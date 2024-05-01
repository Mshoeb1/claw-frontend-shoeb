import React from "react";
import "./index.css";

function Pre(props) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;
