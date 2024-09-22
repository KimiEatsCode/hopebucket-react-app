import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Nav2 from "./components/Nav2";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Bucket from "./components/Bucket";
import App from "./App";
import ListContext from "./ListContext";
import Newsletter from "./components/Newsletter";
import TopMenu from "./components/TopMenu";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
};

ReactDOM.render(
  <React.StrictMode>
    <ListContext>
      <BrowserRouter>
        <TopMenu></TopMenu>
        <Container style={containerStyles}>
          <h1 className="logoName mb-2">Hope Bucket</h1>

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
    </ListContext>
  </React.StrictMode>,
  document.getElementById("root")
);
