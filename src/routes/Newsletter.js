import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Newsletter() {
  return (
    <>
      <Row>
        <div className="col-xs-2 col-md-3"></div>
        <div className="col-md-6">
          <h2 className="text-center mt-5">Sign up for updates!</h2>
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/kimicodes"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.email/kimicodes', 'popupwindow')"
          >
            <div className="text-center">
              <input
                type="email"
                name="email"
                id="bd-email"
                className="form-control text-center mt-3"
                placeholder="Enter Your Email Here"
              />
              <button type="submit" class="btn btn-primary mt-2">
                Submit
              </button>
              <p></p>
            </div>
          </form>
        </div>
        <div className="col-xs-2 col-md-3"></div>
      </Row>
      {/* <Row>
        Feedback and questions are welcome. Please use this form to contact me: https://forms.gle/43GCETHNvrtFhKVq6
      </Row> */}
    </>
  );
}

export default Newsletter;
