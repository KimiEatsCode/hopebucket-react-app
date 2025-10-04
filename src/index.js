import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
//css
import "./styles/index.css";
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

ReactDOM.render(
  <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <BrowserRouter>
          <TopMenu></TopMenu>

          <Container>
            <Link to="/">
              <h1 className="logoName mb-2">HopeBucket</h1>
            </Link>

            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/bucket" element={<Bucket />} />
              <Route path="/list" element={<List />} />
            </Routes>

            <Nav2></Nav2>
          </Container>
        </BrowserRouter>
        <Outlet />
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
