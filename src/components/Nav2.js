import { useState, useContext, useRef, useEffect, useMemo } from "react";
//bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
import { ModalContext } from "../contexts/ModalContext";

function OffCanvasExample({ name, ...props }) {

  const [showAddField, setShowAddField] = useState(false);
  const [showNewList, setShowListLinks] = useState(false);
  
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
  const setCopyMessage = modalContext.setCopyMessage;

  const toggleListModal = () => setShowListModal(!showListModal);

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
    if (totalHope < 3) {
      setShowListLinks(false);
      expContext.setListDate(tomorrow);
      listContext.setList((list) => (list = []));
    } else {
      return;
    }
  };
  //check state of total hope if 0 or expDate value does not exist, show new list icon and buttons
  useEffect(() => {
    if (totalHope === 3 || expDate !== tomorrow) {
      // if (!expDate) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope, expDate, tomorrow]); // The dependency array ensures this effect runs only when 'count' changes

  // Handle copy using native Clipboard API instead of ClipboardJS
  const handleCopyClick = async () => {
    let copyText = "";
    list.forEach((item, index) => {
      copyText += `${item.value}\n\n`;
    });

    try {
      await navigator.clipboard.writeText(copyText);
      setCopyMessage('HopeBucket List Copied! Share to social. <p>Check out <a href="https://pixabay.com/" target="_blank" rel="noopener noreferrer">Pixabay</a> to find an image for your background.</p>');
      console.log('copy successful');
    } catch (err) {
      console.error('Error copying text to clipboard:', err);
    }
  };
  
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
    if (list.length === 3) {
      setShowAddField(false);

      return;
    } else if (list.length <= 3) {
      if (input !== "") {
        input = {
          id: Math.random(),
          value: input,
        };

        listContext.setList((list) => [...list, input]);
        totalHope = list.length;
        console.log("add item equals totalhope as " + totalHope);
        setInput((input) => (input = ""));
        setShowAddField(false);

      }
    } else {
      setShowAddField(false);
       list.push('test')
    }
  }

  window.localStorage.setItem("hopeList", JSON.stringify(list));

  console.log("totalhope items =" + totalHope);
  const handleClose = () => setShowAddField(false);

  const handleOpen = (e) => {
    if (totalHope <= 3) {
      setShowAddField(true);
    } else {
      setShowAddField(false);
      return;
    }
    setTimeout(() => {
      fieldFocus.current.focus();
    }, "100");
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
            </Col>
            <p></p>
            <Button className="addHopeConfirm" onClick={addItem} onKeyDown={keyDownOpenForm} type="button">
             <i  className="bi bi-check-circle-fill"></i>
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
      <Row>
        <div>
         
          <nav>
            {showNewList && (
              <>
         
           {(totalHope >= 3) ? 
                  <button
                    type="button"
                    className="btn btn-primary viewListButton"
                    onClick={toggleListModal}
                  >
                    <i className="bi bi-file-earmark"></i><span className="m-2">View List</span>
                  </button>
                 :   <button type="button" className="btn btn-primary newListButton" onClick={handleNewList}>
             <i  className="bi bi-file-earmark-plus"></i><span className="m-2">New List</span>
            </button>}

              {(totalHope >= 3) ?
                  <button type="button" className="btn btn-primary copyListButton" onClick={handleCopyClick}>
                       <i className="bi bi-copy"></i><span className="m-2">Copy List</span>
                  </button> :  <button disabled type="button" className="btn btn-primary">
             <i  className="bi bi-plus-circle-fill"></i>
            </button>}
                         
               
             
              </>
            )}
       

            {!showNewList && (
              <>

            <button type="button" className="btn btn-primary viewListButton" onClick={toggleListModal}>
                  <i className="bi bi-file-earmark"></i><span className="m-2">View List</span>
                </button>

                {!showNewList && (
                  // <Link onClick={handleOpen} onKeyDown={keyDownOpenForm}>
                    <button
                    onClick={handleOpen} onKeyDown={keyDownOpenForm}
                      type="button"
                      className="btn btn-primary addItemButton"
                      disabled={totalHope >= 3}
                    >
                      <i className="bi bi-plus-circle-fill"></i><span className="m-2">Add Item</span>
                    </button>
                  // </Link>
                )}
                   
              </>
            )}
          </nav>
        </div>
      </Row>
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
