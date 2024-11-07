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
import Nav2 from "./components/Nav2";
import Bucket from "./components/Bucket";
import App from "./App";
import { ListContextProvider } from "./ListContext";
import Newsletter from "./components/Newsletter";
import TopMenu from "./components/TopMenu";

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
            <Route path="/" element={<App />} />
            <Route path="/bucket" element={<Bucket />} />
            <Route path="/list" element={<List />} />
            <Route path="/newsletter" element={<Newsletter />} />
          </Routes>
          <Nav2></Nav2>
        </Container>
      </BrowserRouter>

      <Outlet />
    </ListContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
