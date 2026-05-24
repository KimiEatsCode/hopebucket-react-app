import { useEffect } from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyAckModal({ show, effectiveDate, onAcknowledge }) {
  useEffect(() => {
    if (!show) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="privacy-ack-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-ack-title"
    >
      <div className="privacy-ack-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-modal-handle" aria-hidden="true" />

        <header className="welcome-modal-header">
          <div className="welcome-modal-header-text">
            <h2 id="privacy-ack-title" className="welcome-modal-title">
              Privacy policy updated
            </h2>
            <p className="welcome-modal-subtitle">
              {effectiveDate
                ? `Effective ${effectiveDate}. Please review our updated Privacy Policy before continuing.`
                : "Please review our updated Privacy Policy before continuing."}
            </p>
          </div>
        </header>

        <div className="welcome-modal-divider" aria-hidden="true" />

        <p className="privacy-ack-body">
          HopeBucket stores your hope list on your device only. We updated how
          sharing and other features are described so the policy matches the app.
        </p>

        <Link
          to="/privacy-policy"
          className="privacy-ack-policy-link"
        >
          Read full Privacy Policy
        </Link>

        <button
          type="button"
          className="welcome-modal-cta"
          onClick={onAcknowledge}
        >
          I acknowledge
        </button>
      </div>
    </div>
  );
}

export default PrivacyPolicyAckModal;
