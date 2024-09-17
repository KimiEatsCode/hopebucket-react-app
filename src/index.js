import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bucket from "./routes/List";
import Nav2 from "./Nav2";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Level from "./routes/Bucket";
import App from "./App";
import ListContext from "./ListContext";
import Newsletter from "./routes/Newsletter";

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
            <Link to="/">Hope Bucket</Link>
          </h1>
          <hr />

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="level" element={<Level />} />
            <Route path="list" element={<Bucket />} />
            <Route path="newsletter" element={<Newsletter />} />
          </Routes>
          <Nav2></Nav2>
        </Container>
      </BrowserRouter>

      <Outlet />
    </ListContext>
  </React.StrictMode>,
  document.getElementById("root")
);


