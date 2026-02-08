
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
//components
import List from "./components/List";
import Nav2 from "./components/Nav2";
import Bucket from "./components/Bucket";
import PrivacyPolicy from "./components/PrivacyPolicy";
//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";
import { ModalContextProvider } from "./contexts/ModalContext";

function App() {
  return (
    <>
  <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
      
            <Container>
              <div className="topNav">
                <Link to="/privacy-policy" className="privacy-link">Privacy Policy</Link>
              </div>
              <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>

              <Routes>
                <Route path="/" element={<Bucket />} />
                <Route path="/bucket" element={<Bucket />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>

              <Nav2></Nav2>
              <List />
            </Container>
          </BrowserRouter>
          <Outlet />
        </ModalContextProvider>
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>
    </>
  );
}

export default App;
