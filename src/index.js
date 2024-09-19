import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bucket from "./components/List";
import Nav2 from "./components/Nav2";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Level from "./components/Bucket";
import App from "./App";
import ListContext from "./ListContext";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
};

ReactDOM.render(
  <React.StrictMode>
    <ListContext>
      <BrowserRouter>
        <Container style={containerStyles}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bolder",
              marginTop: "20px",
            }}
          >
            <h1 className="logoName">Hope Bucket</h1>
          </h1>


          <Routes>
            <Route path="/" element={<App />} />
            <Route path="level" element={<Level />} />
            <Route path="list" element={<Bucket />} />
          </Routes>
          <Nav2></Nav2>
        </Container>
      </BrowserRouter>

      <Outlet />
    </ListContext>
  </React.StrictMode>,
  document.getElementById("root")
);
