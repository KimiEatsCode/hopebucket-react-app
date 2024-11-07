import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
//css
import "./index.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
//components
import List from "./components/List";

import Bucket from "./components/Bucket";
import App from "./App";
import TopMenu from "./components/TopMenu";
import Intro from "./components/Intro";

//context
import { ListContextProvider } from "./ListContext";


const containerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
  paddingTop:"20px"
};

ReactDOM.render(
  <React.StrictMode>
    <ListContextProvider>
      <BrowserRouter>
        <TopMenu></TopMenu>
        <Container style={containerStyles}>
        <Link  to="/"><h1 className="logoName mb-2">HopeBucket</h1></Link>

          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/bucket" element={<Bucket />} />
            <Route path="/list" element={<List />} />

          </Routes>

        </Container>
      </BrowserRouter>

      <Outlet />
    </ListContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
