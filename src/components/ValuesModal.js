import { useState, useContext, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ValuesContext } from "../contexts/ValuesContext";
import { MAX_CUSTOM_VALUES, VALUE_CHAR_LIMIT } from "../constants/values";

function ValuesModal({ show, onHide }) {
  const { values, customValues, addValue, removeValue } = useContext(ValuesContext);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [show]);

  const handleAdd = () => {
    const success = addValue(input);
    if (success) setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const canAdd = customValues.length < MAX_CUSTOM_VALUES;
  const charsLeft = VALUE_CHAR_LIMIT - input.length;
  const defaultValues = values.filter((v) => v.isDefault);
  const userValues = values.filter((v) => !v.isDefault);

  return (
    <Modal id="valuesModal" show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1650AC", color: "#fff" }}
      >
        <Modal.Title style={{ width: "100%" }}>
          My Values ({values.length})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-2">
          Link hope items to a value that matters to you.
        </p>

        <h6 className="values-section-title">Core values</h6>
        <ul className="values-list">
          {defaultValues.map((v) => (
            <li key={v.id} className="values-item values-item-default">
              <span className="values-text">{v.text}</span>
            </li>
          ))}
        </ul>

        {userValues.length > 0 && (
          <>
            <h6 className="values-section-title">Your custom values</h6>
            <ul className="values-list">
              {userValues.map((v) => (
                <li key={v.id} className="values-item">
                  <button
                    className="closeX btn"
                    onClick={() => removeValue(v.id)}
                    aria-label={`Remove ${v.text}`}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <span className="values-text">{v.text}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {canAdd && (
          <div className="values-input-area">
            <Form.Control
              ref={inputRef}
              value={input}
              maxLength={VALUE_CHAR_LIMIT}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a custom value..."
              aria-label="Enter a custom value"
            />
            <div className="values-input-footer">
              <small
                className={charsLeft <= 10 ? "text-danger" : "text-muted"}
              >
                {charsLeft} characters left · {customValues.length}/{MAX_CUSTOM_VALUES} custom
              </small>
              <Button
                className="values-add-btn"
                onClick={handleAdd}
                disabled={!input.trim()}
              >
                Add Value
              </Button>
            </div>
          </div>
        )}

        {!canAdd && (
          <p className="text text-center mt-2" style={{ fontSize: "1.1em" }}>
            Maximum of {MAX_CUSTOM_VALUES} custom values reached.
            <br />
            Remove one to add a new value.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ValuesModal;
