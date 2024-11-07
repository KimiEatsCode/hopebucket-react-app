import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function Newsletter() {
  return (
    <>
      <Row className="mt-5">
        <div className="col-xs-1 col-md-2"></div>
        <div className="col-md-8 text-center">
          <h4>
            Sign up for updates to follow HopeBucket app progress and show
            your support.
          </h4>
          <span className="mt-3">
          <Link to="https://buttondown.com/kimicodes"><button className="btn btn-primary">HopeBucket Newsletter</button></Link>
          </span>

        </div>
      </Row>
      <Row className="mt-5 text-center">
        <h4> Let me know what you think </h4>
        <span className="feedback mt-3">
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSdhIeE7uxjgCDGPrtk8OPqp_E20o0QQF5o3MmmFZ007ra70NQ/viewform?vc=0&c=0&w=1&flr=0"
            target="_blank"
          >
            <button className="btn btn-primary">Feedback Form</button>
          </Link>

        </span>
      </Row>
      {/* <Row>
        <h3 className="mt-3 mb-5 text-center">
          <Link to="/bucket">
            <button className="btn btn-primary startButton mt-2">Get Started!</button>
          </Link>
        </h3>
      </Row> */}
    </>
  );
}

export default Newsletter;
