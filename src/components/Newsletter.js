import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



function Newsletter() {

  const handleSubmit = (event)=>{
  event.preventDefault();
    event.target.reset();

  }


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
            <div className="d-flex m-4 mt-0">
              <input
                type="email"
                name="email"
                id="bd-email"
                className="form-control text-center mt-3"
                placeholder="Enter Your Email Here"
              />
              <button type="submit" onSubmit={handleSubmit} class="btn btn-primary mt-3">
                Submit
              </button>
              <p></p>
            </div>
          </form>
        </div>
        <div className="col-xs-2 col-md-3"></div>
        <Row className="text-center justify-content-center">
        Feedback and questions are welcome:
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSdhIeE7uxjgCDGPrtk8OPqp_E20o0QQF5o3MmmFZ007ra70NQ/viewform?vc=0&c=0&w=1&flr=0" target="_blank">
          Give Feedback
        </Link>
      </Row>
      </Row>

    </>
  );
}

export default Newsletter;
