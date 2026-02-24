import { useState, useContext, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { QuoteContext } from "../contexts/QuoteContext";

function QuoteModal({ show, onHide }) {
  const { quotes, addQuote, removeQuote } = useContext(QuoteContext);
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const charLimit = 140;

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [show]);

  const handleAdd = () => {
    const success = addQuote(input);
    if (success) setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const canAdd = quotes.length < 3;
  const charsLeft = charLimit - input.length;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1650AC", color: "#fff" }}
      >
        <Modal.Title style={{ width: "100%" }}>
          My Quotes ({quotes.length}/3)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {quotes.length === 0 && (
          <p className="text-muted text-center mb-3">
            Add a personal quote that inspires you.
          </p>
        )}

        <ul className="quote-list">
          {quotes.map((q) => (
            <li key={q.id} className="quote-item">
      
              <button
                className="closeX btn"
                onClick={() => removeQuote(q.id)}
                aria-label="Remove quote"
              >
                <i className="bi bi-x-lg"></i>
              </button>
              <span className="quote-text">"{q.text}"</span>
            </li>
           
          ))}
        </ul>

        {canAdd && (
          <div className="quote-input-area">
            <Form.Control
              as="textarea"
              rows={2}
              ref={inputRef}
              value={input}
              maxLength={charLimit}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type an inspiring quote..."
              aria-label="Enter a custom quote"
            />
            <div className="quote-input-footer">
              <small
                className={charsLeft <= 20 ? "text-danger" : "text-muted"}
              >
                {charsLeft} characters left
              </small>
              <Button
                className="quote-add-btn"
                onClick={handleAdd}
                disabled={!input.trim()}
              >
                Add Quote
              </Button>
            </div>
          </div>
        )}

        {!canAdd && (
          <div>
          <p className="text text-center mt-2" style={{ fontSize: "1.2em" }}>
            Maximum of 3 quotes reached.
            <p>Remove one to add a new quote.</p>
          </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default QuoteModal;
