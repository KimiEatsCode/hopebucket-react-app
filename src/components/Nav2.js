import { React, useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//context
import { ListContext } from "../ListContext";

function OffCanvasExample({ name, ...props }) {
  const [showAddField, setShow] = useState(false);
  const [isLeft, setLeft] = useState(true);
  const [toggleBucket, setToggleBucket] = useState(true);
  const [showNewList, setShowListLinks] = useState(true);
  const [toggleAlignNav, setToggleAlignNav] = useState(true);
  let [input, setInput] = useState("");

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const navigate = useNavigate();

  function updateInput(input) {
    setInput(input);
  }

  const fieldFocus = useRef();

  const handleNavClick = (event) => {
    setToggleBucket((current) => !current);
  };

  const navStyles = {
    navAlign: {
      position: "fixed",
      right: isLeft ? "10px" : "",
      left: isLeft ? "" : "10px",
    },
  };

  const handleNavAlign = (event) => {
    setLeft((isLeft) => !isLeft);
    setToggleAlignNav((current) => !current);
  };

  const handleNewList = (event) => {
    setShowListLinks(false);
    listContext.setList((list) => (list = []));
  };

  //check state of total hope if 0 show new list icon and buttons

  useEffect(() => {
    if (totalHope === 0 || totalHope >= 3) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope]); // The dependency array ensures this effect runs only when 'count' changes

  function addItem() {
    if (totalHope === 3) {
      navigate("/");
      setShow(false);
    } else if (list.length <= 3) {
      if (input !== "") {
        input = {
          id: Math.random(),
          value: input,
        };

        listContext.setList((list) => [...list, input]);

        setInput((input) => (input = ""));
        setShow(false);
      }
    } else {
      setShow(false);
    }
  }

  window.localStorage.setItem("hopeList", JSON.stringify(list));

  const handleClose = () => setShow(false);

  const handleOpen = (e) => {
    if (totalHope < 3) {
      setShow(true);
    } else {
      setShow(false);
      return;
    }
    setTimeout(() => {
      fieldFocus.current.focus();
    }, "100");
  };

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-file-earmark-plus"
    viewBox="0 0 16 16"
  >
    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
  </svg>;

  return (
    <>
      <Offcanvas show={showAddField} onHide={handleClose} {...props}>
        <Offcanvas.Header>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="no-wrap">
          <Row mb={3}>
            <Col>
              <Form.Control
                placeholder="What is something positive that happened or something you did that gives you hope today?"
                size="lg"
                ref={fieldFocus}
                value={input}
                onChange={(item) => updateInput(item.target.value)}
                aria-label="form field to type text"
                aria-describedby="basic-addon2"
              />
            </Col>
            <p></p>

            <Button onClick={addItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      <nav>
        <i className="bi bi-box-arrow-left"></i>
        <div style={navStyles.navAlign}>
          {toggleAlignNav ? (
            <Link onClick={handleNavAlign}>
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  className="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                </svg>
              </button>
            </Link>
          ) : (
            <Link onClick={handleNavAlign}>
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </button>
            </Link>
          )}

          {showNewList && (
            <Link onClick={handleNewList}>
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  className="bi bi-file-earmark-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                </svg>
              </button>
            </Link>
          )}

          <Link onClick={handleOpen}>
            <button
              type="button"
              className="btn btn-primary"
              disabled={totalHope >= 3}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>
          </Link>

          {/* {toggleBucket ? (
            <Link onClick={handleNavClick} to="/list">
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  className="bi bi-card-list"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </Link>
          ) : (
            <Link onClick={handleNavClick} to="/bucket">
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="#fff"
                  className="bi bi-bucket"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z"></path>
                </svg>
              </button>
            </Link>
          )} */}
        </div>
      </nav>
    </>
  );
}

function Nav2() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Nav2;
