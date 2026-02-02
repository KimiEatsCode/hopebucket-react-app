import React, { useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import { ModalContext } from "../contexts/ModalContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LottieControlConfetti from "../hooks/confettiControl";
import LottieControlBucket from "../hooks/bucketControl";

function Bucket() {
  const listContext = useContext(ListContext);
  let totalHope = listContext.list.length;

  const modalContext = useContext(ModalContext);
  const setShowListModal = modalContext.setShowListModal;
  const showListModal = modalContext.showListModal;
  const copyMessage = modalContext.copyMessage;

  const toggleListModal = () => setShowListModal(!showListModal);

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
              __html: copyMessage ? copyMessage : 
                totalHope === 3 ? "Congrats! You filled your hope bucket!" : 
                totalHope < 3 ? "Add hope to fill up your HopeBucket!" : ""
            }}
          ></h4>
          <div className="bucketIcon" onClick={toggleListModal} style={{ cursor: "pointer" }}>
            <h1 className="hopeCount">{totalHope} of 3</h1>
            <LottieControlBucket></LottieControlBucket>
          </div>
      
        </Col>
      </Row>
    </>
  );
}

export default Bucket;
