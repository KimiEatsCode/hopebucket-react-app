import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function Newsletter() {

  // const [txt, setTxt] = useState("");
  // // const txt1 = useRef("")

  // function changeTxt(event) {
  //   setTxt("Enter Your Email Here");
  // }
  // function displayMsg(event){
  //   setTxt(event.target.value);
  //   setTimeout(() => {
  //     setTxt("Enter Your Email Here");
  //   }, "2000");
  // }

  return (
    <>
      <Row>
        <div className="col-xs-2 col-md-3"></div>
        <div className="col-md-6">
          <h2 className="text-center mt-5">Sign up for updates!</h2>
          <iframe className="iframe" src="https://buttondown.com/kimicodes?as_embed=true"
></iframe><br /><br />
          {/* <form
            action="https://buttondown.email/api/emails/embed-subscribe/kimicodes"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.email/kimicodes', 'popupwindow')"
          >
            <div className="d-flex m-3 mt-0">
              <input
                // ref={txt1}
                type="email"
                name="email"
                id="bd-email"
                className="form-control text-center mt-3"
                placeholder="Enter Your Email Here"

              />

              <button type="submit" className="btn btn-primary mt-3 m-1 mb-0">
                Submit
              </button>
              <p></p>
            </div>
          </form> */}
        </div>
        <div className="col-xs-2 col-md-3"></div>
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
