import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { usePrivacyPolicyAck } from "../hooks/usePrivacyPolicyAck";

function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const { needsAck, acknowledge } = usePrivacyPolicyAck();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/PRIVACY_POLICY.md`)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("Failed to load privacy policy."));
  }, []);

  return (
    <>
      <div className="privacy-policy">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <nav>
        {needsAck && (
          <button to="/" 
            type="button"
            className="btn btn-primary viewListButton"
            onClick={acknowledge}
          >
            I acknowledge
          </button>
        )}
       
      </nav>
    </>
  );
}

export default PrivacyPolicy;
