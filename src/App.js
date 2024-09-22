import * as React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router-dom";
// import TopMenu from "./components/TopMenu";
// import Container from "react-bootstrap/Container";
import Nav2 from "./components/Nav2";


import TopMenu from "./components/TopMenu";
import Container from "react-bootstrap/Container";



// const containerStyles = {
//   display: "flex",
//   flexDirection: "column",
//   minHeight: "80vh",
// };


function App() {

  return (
    <>
  <h1 className="logoName mb-4">Hope Bucket</h1>


<TopMenu></TopMenu>
      {/* <Container style={containerStyles}> */}
<Container>
    <App />

    <Outlet />
            <Nav2></Nav2>
            </Container>



    </>
  );
}

export default App;
