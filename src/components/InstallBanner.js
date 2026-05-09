import { useState, useEffect } from "react";

const DISMISSED_KEY = "pwa-install-dismissed";

function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already running as installed PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // Don't show if user already dismissed it
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (isIos) {
      setShowIosHint(true);
      setVisible(true);
      return;
    }

    // Android / Chrome: capture the browser's install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="install-banner">
      <span className="install-banner-text">
        {showIosHint ? (
          <>
            Save to home screen: tap{" "}
            <i className="bi bi-box-arrow-up"></i> then{" "}
            <strong>Add to Home Screen</strong>
          </>
        ) : (
          <>
            <button
              className="install-banner-btn"
              onClick={handleInstall}
            >
              <i className="bi bi-download me-1"></i>Add to Home Screen
            </button>
          </>
        )}
      </span>
      <button
        className="install-banner-dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        <i className="bi bi-x"></i>
      </button>
    </div>
  );
}

export default InstallBanner;
