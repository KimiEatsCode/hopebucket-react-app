
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
//components
import List from "./components/List";
import Nav from "./components/Nav";
import Bucket from "./components/Bucket";
import PrivacyPolicy from "./components/PrivacyPolicy";
import InstallBanner from "./components/InstallBanner";
import WelcomeModal from "./components/WelcomeModal";
//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { QuoteContextProvider } from "./contexts/QuoteContext";
import { useLocalStorage } from "./hooks/useLocalStorageReceipe";

const MAIN_ROUTES = new Set(["/", "/bucket"]);

function AppRoutes() {
  const location = useLocation();
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage("hasSeenWelcome", false);
  const path = location.pathname.replace(/\/$/, "") || "/";
  const showWelcome = MAIN_ROUTES.has(path) && !hasSeenWelcome;

  return (
    <Container id="app-container">
      <div className="topNav">
        <Link to="/privacy-policy" className="topNavLink">Privacy Policy</Link>
        <Link to="https://sarahkimirettig.com/contact" className="topNavLink">Contact</Link>
        <Link to="https://apps.apple.com/us/app/hopebucket/id6758913831" className="topNavLink">Iphone App</Link>
      </div>
      <InstallBanner />
      <Link to="/" style={{ textDecoration: "none"}}>
        <h1 className="logoName mb-4">HopeBucket</h1>
      </Link>

      <Routes>
        <Route path="/" element={<Bucket />} />
        <Route path="/bucket" element={<Bucket />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Nav />
      <List />
      <WelcomeModal show={showWelcome} onClose={() => setHasSeenWelcome(true)} />
    </Container>
  );
}

function App() {
  return (
    <>
  <React.StrictMode>
    <ExpContextProvider>
      <ListContextProvider>
        <ModalContextProvider>
          <QuoteContextProvider>
          <BrowserRouter>
            <AppRoutes />
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
