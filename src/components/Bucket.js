import React, { useContext } from "react";
import { Context } from "../ListContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Bucket() {
  const listContext = useContext(Context);

  let totalHope = listContext.list.length;

  return (
    <>
      <Row>
        <Col>
          <div className="itemCount">{totalHope}</div>
          <div className="bucketIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50%"
              height="50%"
              fill="#000"
              className="bi bi-bucket"
              viewBox="0 0 16 16"
            >
              <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z"></path>
            </svg>
          </div>
        </Col>
      </Row>
      <Row className="text-center mt-1">
        <Col>
          <h2>
            {totalHope === 10 ? "Congrats! You completed 10 hope items!!" : ""}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <h3 className="text-center mt-2">
            {totalHope === 0 ? "Add 10 hope items to fill your bucket!" : ""}
          </h3>
        </Col>
      </Row>
    </>
  );
}

export default Bucket;
