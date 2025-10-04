
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
//css
import "./styles/index.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
// I use this React Bootstrap for grid https://react-bootstrap.netlify.app/docs/layout/grid/
//bootstrap react components
import "bootstrap-icons/font/bootstrap-icons.css";
//components
import List from "./components/List";
import Nav from "./components/Nav2";
import Bucket from "./components/Bucket";
//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";

function App() {
  return (
    <>
      <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <BrowserRouter>
        
          <Container>
            <Link to="/">
              <h1 className="logoName mb-2">HopeBucket</h1>
            </Link>

            <Routes>
              <Route path="/" element={<Bucket />} />
              <Route path="/bucket" element={<Bucket />} />
              <Route path="/list" element={<List />} />
            </Routes>

            <Nav></Nav>
          </Container>
        </BrowserRouter>
        <Outlet />
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>
    </>
  );
}

export default App;
