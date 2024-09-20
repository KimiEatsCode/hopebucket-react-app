import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Newsletter() {
  return (
    <>
      <Row className="mt-2">
        <div className="col-xs-1 col-md-2"></div>
        <div className="col-md-8 text-center">
          <h3>
            Sign up for updates below to follow HopeBucket app progress and show
            your support.
          </h3>
          <iframe
            className="col-md-12"
            src="https://buttondown.com/kimicodes?as_embed=true"
            title="newsletterSignUp"
          ></iframe>

          <div className="col-xs-1 col-md-2"></div>
        </div>
      </Row>
      <Row className="mt-3 text-center">
        {" "}
        <h4> Feedback and questions are welcome</h4>
        <span className="feedback">
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSdhIeE7uxjgCDGPrtk8OPqp_E20o0QQF5o3MmmFZ007ra70NQ/viewform?vc=0&c=0&w=1&flr=0"
            target="_blank"
          >
            Give Feedback
          </Link>
        </span>
      </Row>
    </>
  );
}

export default Newsletter;
