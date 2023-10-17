import React from "react";
import TriangleSVG from "./TriangleSVG";
const styleMain = {
  height: "630px",
  width: "650px",
  marginTop:'0 auto',
  border: "5px solid black",
};


export default function Main() {
  return (
    <div
      style={{
        marginTop:50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={styleMain}>
        <TriangleSVG />
      </div>
    </div>
  );
}
