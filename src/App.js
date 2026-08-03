
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
//components
import List from "./components/List";
import Nav from "./components/Nav";
import Bucket from "./components/Bucket";
import PrivacyPolicy from "./components/PrivacyPolicy";
import WelcomeModal from "./components/WelcomeModal";
import PrivacyPolicyAckModal from "./components/PrivacyPolicyAckModal";
//context
import { ListContextProvider } from "./contexts/ListContext";
import { usePrivacyPolicyAck } from "./hooks/usePrivacyPolicyAck";
import { ExpContextProvider } from "./contexts/ExpContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { QuoteContextProvider } from "./contexts/QuoteContext";
import { ValuesContextProvider } from "./contexts/ValuesContext";
import { useLocalStorage } from "./hooks/useLocalStorageReceipe";

const MAIN_ROUTES = new Set(["/", "/bucket"]);

function AppRoutes() {
  const location = useLocation();
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage("hasSeenWelcome", false);
  const { needsAck, metaLoaded, effectiveDate, acknowledge } = usePrivacyPolicyAck();
  const path = location.pathname.replace(/\/$/, "") || "/";
  const onPrivacyPolicyPage = path === "/privacy-policy";
  const showWelcome = MAIN_ROUTES.has(path) && !hasSeenWelcome;
  // Show welcome first for new users; then require privacy acknowledgment.
  const showPrivacyAck =
    metaLoaded && needsAck && !onPrivacyPolicyPage && hasSeenWelcome;

  return (
    <Container id="app-container">
      <div className="topNav">
        <Link to="/privacy-policy" className="topNavLink">Privacy Policy</Link>
        <Link to="https://sarahkimirettig.com/contact" className="topNavLink">Contact</Link>
        <Link to="https://apps.apple.com/us/app/hopebucket/id6758913831" className="topNavLink">Iphone App</Link>
      </div>
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
      <PrivacyPolicyAckModal
        show={showPrivacyAck}
        effectiveDate={effectiveDate}
        onAcknowledge={acknowledge}
      />
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
          <ValuesContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Outlet />
          </ValuesContextProvider>
          </QuoteContextProvider>
        </ModalContextProvider>
      </ListContextProvider>
    </ExpContextProvider>
  </React.StrictMode>
    </>
  );
}

export default App;
