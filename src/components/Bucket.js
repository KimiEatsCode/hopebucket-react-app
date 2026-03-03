import React, { useContext, useState } from "react";
import { ListContext } from "../contexts/ListContext";
import { ModalContext } from "../contexts/ModalContext";
import { QuoteContext } from "../contexts/QuoteContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LottieControlConfetti from "../hooks/confettiControl";
import LottieControlBucket from "../hooks/bucketControl";

const BUBBLE_POSITIONS = [
  { top: "10%", left: "8%" },
  { top: "5%", right: "14%" },
  { top: "38%", right: "8%" },
];

function Bucket() {
  const listContext = useContext(ListContext);
  let totalHope = listContext.list.length;

  const modalContext = useContext(ModalContext);
  const setShowListModal = modalContext.setShowListModal;
  const showListModal = modalContext.showListModal;
  const copyMessage = modalContext.copyMessage;

  const { quotes = [] } = useContext(QuoteContext);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleListModal = () => setShowListModal(!showListModal);

  const handleCopyQuote = async () => {
    if (!selectedQuote) return;
    try {
      await navigator.clipboard.writeText(selectedQuote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying quote:", err);
    }
  };

  const handleCloseQuote = () => {
    setSelectedQuote(null);
    setCopied(false);
  };

  return (
    <>
      <LottieControlConfetti></LottieControlConfetti>
      <Row className="text-center mt-4 mb-2 mx-auto">
        <Col></Col>
      </Row>
      <Row className="mx-auto text-center">
        <Col>
          <h4 
            className="topCopyBucket" 
            id="copyMsg"
            dangerouslySetInnerHTML={{
              __html: totalHope === 3 ? copyMessage : 
                totalHope === 3 ? "Congrats! You filled your hope bucket!" : 
                totalHope < 3 ? "Add hope to fill up your HopeBucket!" : ""
            }}
          ></h4>
          <div className="bucketIcon" onClick={toggleListModal} style={{ cursor: "pointer" }}>
            <h1 className="hopeCount">{totalHope} of 3</h1>
            <LottieControlBucket></LottieControlBucket>
            {quotes.slice(0, 3).map((quote, index) => (
              <button
                key={quote.id}
                className={`quoteBubble quoteBubble${index + 1}`}
                style={BUBBLE_POSITIONS[index]}
                onClick={(e) => { e.stopPropagation(); setSelectedQuote(quote.text); }}
                aria-label={`View quote ${index + 1}`}
              >
                <i className="bi bi-chat-dots-fill"></i>
              </button>
            ))}
          </div>
        </Col>
      </Row>

      <Modal show={Boolean(selectedQuote)} onHide={handleCloseQuote} centered>
        <Modal.Body className="quote-card-body">
          <p className="quote-card-text">"{selectedQuote}"</p>
          <Button className="quote-copy-btn btn-primary" onClick={handleCopyQuote}>
            <i className="bi bi-copy"></i> {copied ? "Copied!" : "Copy Quote"}
          </Button>
          <p className="quote-tap-hint">Click anywhere outside to close</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Bucket;
