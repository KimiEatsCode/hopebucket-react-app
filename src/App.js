
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
//components
import List from "./components/List";
import Nav from "./components/Nav";
import Bucket from "./components/Bucket";
import PrivacyPolicy from "./components/PrivacyPolicy";
//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { QuoteContextProvider } from "./contexts/QuoteContext";

function App() {
  return (
    <>
  <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <ModalContextProvider>
          <QuoteContextProvider>
          <BrowserRouter>
      
            <Container>
              <div className="topNav">
                <Link to="/privacy-policy" className="topNavLink">Privacy Policy</Link>
                <Link to="https://sarahkimirettig.com/contact" className="topNavLink">Contact</Link>
                <Link to="https://chat.988lifeline.org/" className="topNavLink">Crisis Chat</Link>
              </div>
              <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>

              <Routes>
                <Route path="/" element={<Bucket />} />
                <Route path="/bucket" element={<Bucket />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>

              <Nav></Nav>
              <List />
            </Container>
          </BrowserRouter>
          <Outlet />
          </QuoteContextProvider>
        </ModalContextProvider>
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>
    </>
  );
}

export default App;
