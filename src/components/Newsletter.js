import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function Newsletter() {


  return (
    <>
      <Row className="mt-2">
        <div className="col-xs-1 col-md-2"></div>
        <div className="col-md-8">
          <iframe className="col-md-12" src="https://buttondown.com/kimicodes?as_embed=true" title="newsletterSignUp"
></iframe>

        </div>
        <div className="col-xs-1 col-md-2"></div>
        <Row className="text-center justify-content-center">
          Feedback and questions are welcome
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSdhIeE7uxjgCDGPrtk8OPqp_E20o0QQF5o3MmmFZ007ra70NQ/viewform?vc=0&c=0&w=1&flr=0"
            target="_blank"
          >
            Give Feedback
          </Link>
        </Row>
      </Row>
    </>
  );
}

export default Newsletter;
