import { useState, useContext, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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
import ClipboardJS, { copy } from "clipboard";

function OffCanvasExample({ name, ...props }) {

  const [showAddField, setShowAddField] = useState(false);
  const [showNewList, setShowListLinks] = useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);
  
  let [input, setInput] = useState("");
  let [currDate] = useState(new Date());

  const expContext = useContext(ExpContext);
  const expDate = expContext.expDate;

  const listContext = useContext(ListContext);

  const list = listContext.list;
  let totalHope = list.length;

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
// Declare the clipboard variable in a scope accessible by your functions (e.g., globally or in a module scope)
let clipboard = null;

function initializeClipboard() {
    // If a clipboard instance already exists, destroy it first
    if (clipboard) {
        clipboard.destroy();
    }
  
    clipboard = new ClipboardJS('.copyButton');
          
    const el = document.getElementById('copyMsg');

    clipboard.on('success', function(e) {
      if(el === null) {
        console.log('copy successful')
} else {
      document.getElementById('copyMsg').innerHTML= 'HopeBucket Copied! Share mindfully.'

}
});

    clipboard.on('error', function(e) {
      console.error('Error copying text to clipboard');
        // Add your error handling logic here
    });
}

  const onCopy = () => {
    let copyText = "";
    list.forEach((item, index) => {
      copyText += `${item.value}\n\n`;
    });
    initializeClipboard(); // Re-initialize clipboard to ensure it captures the latest elements
  
    console.log("onCopy runs " + listContext.copyText);
    return copyText;
  }
  
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
              <option>Start with these suggestions:</option>
              <option value="I am grateful for: ">I am grateful for: </option>
              <option value="A person or thing that gives me hope is: ">A person or thing that gives me hope is: </option>
              <option value="An action I took that gives me hope is: ">An action I took that gives me hope is: </option>
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
                <Link to="/bucket">
                  <button  variant="danger" ref={target} onClick={() => setShow(!show)} type="button" className="btn btn-primary">
                     <i className="bi bi-bucket"></i>
                  </button>
                </Link>
           <Link> 
              {(totalHope >= 3) ?
            
                  <button type="button" className="btn btn-primary" >
                       <div className="copyButton" data-clipboard-text={onCopy(list)}><i className="bi bi-copy"></i></div>
                  </button> :  <Button disabled type="button" className="btn btn-primary">
             <i  className="bi bi-plus-circle-fill"></i>
            </Button>}
                </Link>    
  <LottieControlNavMsg></LottieControlNavMsg>                
                
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
             
                <Link to="/quotes">
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-quote"></i>
                  </button>
                </Link>
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
                  <Link onClick={handleOpen} onKeyDown={keyDownOpenForm}>
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

                <Link to="/quotes">
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-quote"></i>
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
