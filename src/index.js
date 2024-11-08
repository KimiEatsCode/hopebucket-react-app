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
import TopMenu from "./components/TopMenu";

//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
  paddingTop: "20px",
};

ReactDOM.render(
  <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <BrowserRouter>
          <TopMenu></TopMenu>
          <Container style={containerStyles}>
            <Link to="/">
              <h1 className="logoName mb-2">HopeBucket</h1>
            </Link>

            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/bucket" element={<Bucket />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </Container>
          <Nav2></Nav2>
        </BrowserRouter>

        <Outlet />
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
