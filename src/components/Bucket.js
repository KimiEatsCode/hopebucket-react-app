import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";
// import { ExpContext } from "../contexts/ExpContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LottieControl from "../hooks/confettiControl";
import BucketControl from "../hooks/bucketControl";

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

        </Col>
      </Row>
      <Row className="mx-auto text-center">
        <Col>
        <h4>
            {totalHope === 3 ? "Congrats! You filled your hope bucket!" : ""}
            {totalHope < 3 ? "Add hope to fill up your hope bucket!" : ""}
          </h4>
          <Link to="/list" style={linkRemoveUnderline} >
            <div className="bucketIcon">
              <h1 className="hopeCount">{totalHope} of 3</h1>
              <BucketControl></BucketControl>

            </div>
          </Link>
        </Col>
      </Row>

    </>
  );
}

export default Bucket;
