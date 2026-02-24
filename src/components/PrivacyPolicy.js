import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function PrivacyPolicy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/PRIVACY_POLICY.md`)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("Failed to load privacy policy."));
  }, []);

  return (
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

      <div className="text-center mt-4 mb-4">
        <Link to="/" className="btn btn-primary" style={{ backgroundColor: "#1650AC", border: "none", borderRadius: "10px" }}>
          Back to HopeBucket
        </Link>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
