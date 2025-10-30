import { useState, useContext, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
//hook

import LottieControlNavMsg from "../hooks/navMsgControl";
import ClipboardJS from "clipboard";


function OffCanvasExample({ name, ...props }) {

  const [showAddField, setShowAddField] = useState(false);
  const [showNewList, setShowListLinks] = useState(false);

  const [copyStyle, setCopyStyle] = useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);
  
  let [input, setInput] = useState("");
  let [currDate] = useState(new Date());

  const expContext = useContext(ExpContext);
  const expDate = expContext.expDate;

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = list.length;

  // const navigate = useNavigate(listContext.list.length);

  const fieldFocus = useRef();

  const copyStyles = {
    border: "5px solid lightblue",
    borderRadius: "10px"
  }

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

  new ClipboardJS('.copyButton');

  const onCopy = () => {
    let copyText = "";

    list.forEach((item, index) => {
      copyText += `${index + 1}. ${item.value}\n`;
    });
  
    console.log("onCopy runs");
    return copyText;
  }

// var clipboard = new ClipboardJS('.btn');
// clipboard.destroy();

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
              <Form.Control
                as="textarea"
                rows={3}
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
            <Button className="addHopeConfirm" onClick={addItem}>
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
                <Link to="/bucket">
                  <button  variant="danger" ref={target} onClick={() => setShow(!show)} type="button" className="btn btn-primary">
                     <i className="bi bi-bucket"></i>
                  </button>
                </Link>
           <Link> 
              {(totalHope >= 3) ?
                  <button type="button" className="btn btn-primary"  onClick={()=> setCopyStyle(copyStyles)}>
                       <div className="copyButton" data-clipboard-text={onCopy(list)}><i className="bi bi-copy"></i></div>
                  </button> :  <Button disabled type="button" className="btn btn-primary">
             <i  className="bi bi-plus-circle-fill"></i>
            </Button>}
                </Link>    
                
                
{(totalHope >= 3) ? 
 <Link to="/list">
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    <i className="bi bi-file-earmark"></i>
                  </button>
                </Link>
                 :   <Button type="button" className="btn btn-primary" onClick={handleNewList}>
             <i  className="bi bi-file-earmark-plus"></i>
            </Button>}

               
              </>
            )}

            {!showNewList && (
              <>
                <Link to="/bucket">
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-bucket-fill"></i>
                  </button>
                </Link>

                {!showNewList && (
                  <Link onClick={handleOpen}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={totalHope >= 3}
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </Link>
                )}
               
                <Link to="/list">
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-file-earmark"></i>
                  </button>
                </Link>
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
