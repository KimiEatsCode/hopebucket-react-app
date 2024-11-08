import { React, useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//context
import { ListContext } from "../contexts/ListContext";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

function OffCanvasExample({ name, ...props }) {
  const [showAddField, setShow] = useState(false);
  // const [isLeft, setLeft] = useState(true);
  const [showNewList, setShowListLinks] = useState(false);
  // const [toggleAlignNav, setToggleAlignNav] = useState(true);
  let [input, setInput] = useState("");

  const [expDate, setExpDate] = useLocalStorage("listDate", "");
  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const navigate = useNavigate();

  function updateInput(input) {
    setInput(input);
  }

  const fieldFocus = useRef();

  const navStyles = {
    navAlign: {
      textAlign: "center",
      // right: isLeft ? "10px" : "",
      // left: isLeft ? "" : "10px",
    },
  };

  // const handleNavAlign = (event) => {
  //   setLeft((isLeft) => !isLeft);
  //   setToggleAlignNav((current) => !current);
  // };

  let today = new Date();
  //getMonth starts at 0 so add 1 to be this month
  const dd1 = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  today = mm + "/" + dd1 + "/" + yyyy;

  const dd2 = dd1 + 1;
  const tomorrow = mm + "/" + dd2 + "/" + yyyy;

  const handleNewList = (event) => {
    setShowListLinks(false);
    setExpDate(tomorrow);
    listContext.setList((list) => (list = []));
  };

  //check state of total hope if 0 or expDate value does not exist, show new list icon and buttons
  useEffect(() => {
    if (totalHope >= 3 || !expDate) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope, expDate]); // The dependency array ensures this effect runs only when 'count' changes

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
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
              </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      <nav style={navStyles.navAlign}>
        <i className="bi bi-box-arrow-left"></i>

        {/* {toggleAlignNav ? (
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
          )} */}

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
