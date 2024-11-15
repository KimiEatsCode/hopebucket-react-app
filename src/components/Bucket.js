import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";
// import { ExpContext } from "../contexts/ExpContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LottieControl from "../hooks/confettiControl";

function Bucket() {
  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;


  const linkRemoveUnderline = {
    textDecoration: "none",
  };
  return (
    <>
            <LottieControl></LottieControl>
      <Row className="text-center mt-4 mb-2 mx-auto">
        <Col>
          <h3>
            {totalHope === 3 ? "Congrats! You filled your hope bucket!" : ""}
            {totalHope === 0 ? "Add hope to fill up your hope bucket!" : ""}
          </h3>
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col>
          <Link to="/list" style={linkRemoveUnderline} >
            <div className="bucketIcon">
              <span className="hopeCount">{totalHope} of 3</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                stroke="#ccc"
                className="bi bi-bucket"
                viewBox="0 0 16 16"
              ></svg>
            </div>
          </Link>
        </Col>
      </Row>

    </>
  );
}

export default Bucket;
