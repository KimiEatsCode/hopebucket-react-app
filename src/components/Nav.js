import { useState, useContext, useRef, useEffect, useMemo } from "react";
//bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
import { ModalContext } from "../contexts/ModalContext";
import QuoteModal from "./QuoteModal";
import ValuesModal from "./ValuesModal";
import { MAX_HOPE_ITEMS } from "../constants";
import { ValuesContext } from "../contexts/ValuesContext";

function OffCanvasExample({ name, ...props }) {

  const [showNewList, setShowListLinks] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showValuesModal, setShowValuesModal] = useState(false);
  const [selectedValueId, setSelectedValueId] = useState("");
  
  let [input, setInput] = useState("");
  let [currDate] = useState(new Date());

  const expContext = useContext(ExpContext);
  const expDate = expContext.expDate;

  const listContext = useContext(ListContext);

  const list = listContext.list;
  let totalHope = list.length;

  const modalContext = useContext(ModalContext);
  const showListModal = modalContext.showListModal;
  const setShowListModal = modalContext.setShowListModal;
  const showAddField = modalContext.showAddField;
  const setShowAddField = modalContext.setShowAddField;
  const toggleListModal = () => setShowListModal(!showListModal);

  const { values = [] } = useContext(ValuesContext);

  const fieldFocus = useRef();

  const today = useMemo(() => {
    const dd1 = currDate.getDate();
    const mm = currDate.getMonth() + 1;
    //getMonth starts at 0 so add 1 to be this month
    const yyyy = currDate.getFullYear();
    console.log("currDate is " + currDate);
    return mm + "/" + dd1 + "/" + yyyy;
  }, [currDate]);

  const tomorrow = useMemo(() => {
    const dd1 = currDate.getDate();
    const mm = currDate.getMonth() + 1;
    //getMonth starts at 0 so add 1 to be this month
    const yyyy = currDate.getFullYear();
    const dd2 = dd1 + 1;
    const nextDay = mm + "/" + dd2 + "/" + yyyy;
    console.log("tomorrow's date is " + nextDay);
    return nextDay;
  }, [currDate]);

  //runs when exp today or listContext changes
  useEffect(() => {
      const intervalId =  setInterval(() => {
      if (today === expDate) {
        // Update list state to empty array when a new day starts but don't update exp date until user clicks on start new list
        console.log("It is a new day today! List resets");
        console.log("expDate is " + expDate);
        console.log("today is " + today);
        setShowListLinks(true);
        listContext.setList((list) => (list = []));
      }
    }, 1000); // Check every second
return () => clearInterval(intervalId);
    // return () => {
    //   console.log("checking date, clearing list if today matches exp date");
  // }
}, [expDate, today, listContext]);
  

  const handleNewList = (event) => {
    if (totalHope < MAX_HOPE_ITEMS) {
      setShowListLinks(false);
      expContext.setListDate(tomorrow);
      listContext.setList((list) => (list = []));
    } else {
      return;
    }
  };
  //check state of total hope if 0 or expDate value does not exist, show new list icon and buttons
  useEffect(() => {
    if (totalHope >= MAX_HOPE_ITEMS || expDate !== tomorrow) {
      // if (!expDate) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope, expDate, tomorrow]); // The dependency array ensures this effect runs only when 'count' changes

  function keyDownAddItem(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action of adding a new line
      addItem();
    }
  }

  //not work cause not a form
  function keyDownOpenForm(e) {
    console.log("keyDownOpenForm runs");
    if (e.key === " ") {
      e.preventDefault(); // Prevents the default action of adding a space
      handleOpen();
    }
  }

  function updateInput(input) {
    setInput(input);
  }

  function addItem() {
    if (list.length >= MAX_HOPE_ITEMS) {
      setShowAddField(false);

      return;
    } else if (list.length < MAX_HOPE_ITEMS) {
      if (input !== "") {
        const newItem = {
          id: Math.random(),
          value: input,
        };
        if (selectedValueId) {
          newItem.valueId = selectedValueId;
        }

        listContext.setList((list) => [...list, newItem]);
        totalHope = list.length;
        console.log("add item equals totalhope as " + totalHope);
        setInput((input) => (input = ""));
        setSelectedValueId("");
        setShowAddField(false);

      }
    } else {
      setShowAddField(false);
      // Do nothing, as list is already at maximum capacity
    }
  }
  


  window.localStorage.setItem("hopeList", JSON.stringify(list));

  console.log("totalhope items =" + totalHope);
  useEffect(() => {
    if (showAddField) {
      setTimeout(() => {
        if (fieldFocus.current) fieldFocus.current.focus();
      }, 100);
    }
  }, [showAddField]);

  const handleClose = () => {
    setSelectedValueId("");
    setShowAddField(false);
  };

  const handleOpen = (e) => {
    if (totalHope < MAX_HOPE_ITEMS) {
      setShowAddField(true);
    }
  };

  return (
    <>
    
 <Offcanvas show={showAddField} onHide={handleClose} {...props}>
        <Offcanvas.Body className="no-wrap">
          <Row mb={3}>
            <Col>
            <Form.Select aria-label="select start of hope item input" onKeyDown={keyDownAddItem} onChange={(item) => updateInput(item.target.value)}>
              <option>Click to view suggestions:</option>
              <option value="I am grateful for ">I am grateful for</option>
              <option value="A person or thing that gives me hope is ">A person or thing that gives me hope is</option>
              <option value="An action I took that gives me hope is ">An action I took that gives me hope is</option>
              <option value="Something I can look forward to is ">Something I can look forward to is </option>
              <option value="Something that happened today that gives me hope is ">Something that happened today that gives me hope is </option>
            </Form.Select>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What is something positive that happened or something you did that gives you hope today?"
                size="lg"
                ref={fieldFocus}
                value={input}
                onKeyDown={keyDownAddItem}
                onChange={(item) => updateInput(item.target.value)}
                aria-label="form field to type text"      
              />
              <Form.Select
                className="value-picker mt-2"
                aria-label="Link to a value (optional)"
                value={selectedValueId}
                onChange={(e) => setSelectedValueId(e.target.value)}
              >
                <option value="">Link to a value (optional)</option>
                {values.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.text}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <p></p>
            <Button className="addHopeConfirm" onClick={addItem} onKeyDown={keyDownOpenForm} type="button">
             <i  className="bi bi-check-circle-fill"></i>
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
      <QuoteModal show={showQuoteModal} onHide={() => setShowQuoteModal(false)} />
      <ValuesModal show={showValuesModal} onHide={() => setShowValuesModal(false)} />
      <Row>
        <div>
          <nav className="nav-grid">
            <button
              type="button"
              className="btn btn-primary viewListButton"
              onClick={() => {
                if (showNewList && totalHope < MAX_HOPE_ITEMS) {
                  handleNewList();
                } else {
                  toggleListModal();
                }
              }}
            >
              <i className={`bi ${showNewList && totalHope < MAX_HOPE_ITEMS ? "bi-file-earmark-plus" : "bi-file-earmark"}`}></i>
              List
            </button>

            <button
              onClick={handleOpen}
              onKeyDown={keyDownOpenForm}
              type="button"
              className="btn btn-primary addItemButton"
              disabled={showNewList || totalHope >= MAX_HOPE_ITEMS}
            >
              <i className="bi bi-plus-circle-fill"></i>Hope
            </button>

            <button
              type="button"
              className="btn btn-primary quotesButton"
              onClick={() => setShowQuoteModal(true)}
            >
              <i className="bi bi-chat-heart"></i>Quotes
            </button>

            <button
              type="button"
              className="btn btn-primary valuesButton"
              onClick={() => setShowValuesModal(true)}
            >
              <i className="bi bi-star-fill"></i>Values
            </button>
          </nav>
        </div>
      </Row>
    </>
  );
}


function Nav() {
  const location = useLocation();

  // Hide bottom nav buttons while the privacy policy is displayed.
  if (location.pathname === "/privacy-policy" || location.pathname === "/privacy-policy/") {
    return null;
  }

  return (
    <>
      {["bottom"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Nav;
