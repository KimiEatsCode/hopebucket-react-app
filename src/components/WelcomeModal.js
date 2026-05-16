import { useEffect } from "react";

const STEPS = [
  {
    icon: "bi-heart",
    step: "STEP 1",
    title: "Add what gives you hope",
    description:
      "Tap Hope in the bar below and write up to 3 things that give you hope today — big or small.",
    iconLight: true,
  },
  {
    icon: "bi-droplet",
    step: "STEP 2",
    title: "Watch your bucket fill",
    description:
      "Each item fills your HopeBucket. Come back tomorrow to start fresh with a new list.",
    iconLight: false,
  },
  {
    icon: "bi-chat-heart",
    step: "STEP 3",
    title: "Add inspiring quotes",
    description:
      "Tap Quotes in the bar below to save up to 3 personal quotes that inspire you — they'll appear in your bucket.",
    iconLight: false,
  },
];

function WelcomeModal({ show, onClose }) {
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
      className="welcome-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <button
        type="button"
        className="welcome-modal-dismiss-area"
        onClick={onClose}
        aria-label="Close welcome guide"
      />

      <div
        className="welcome-modal-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="welcome-modal-handle" aria-hidden="true" />

        <header className="welcome-modal-header">
          <div className="welcome-modal-header-text">
            <h2 id="welcome-modal-title" className="welcome-modal-title">
              Welcome to HopeBucket
            </h2>
            <p className="welcome-modal-subtitle">
              Fill your bucket with hope, one thought at a time.
            </p>
          </div>
          <button
            type="button"
            className="welcome-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </header>

        <div className="welcome-modal-divider" aria-hidden="true" />

        <div className="welcome-modal-steps">
          {STEPS.map((item) => (
            <article key={item.step} className="welcome-modal-step-card">
              <div
                className={`welcome-modal-icon-circle${
                  item.iconLight ? " welcome-modal-icon-circle--light" : ""
                }`}
              >
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </div>
              <div className="welcome-modal-step-text">
                <p className="welcome-modal-step-label">{item.step}</p>
                <h3 className="welcome-modal-step-title">{item.title}</h3>
                <p className="welcome-modal-step-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="welcome-modal-cta" onClick={onClose}>
          Get started
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
