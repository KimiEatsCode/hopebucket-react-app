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

  const navigate = useNavigate(listContext.list.length);

  function updateInput(input) {
    setInput(input);
  }

  const fieldFocus = useRef();

  const navStyles = {
    display: "flex",
    position: "fixed",
    zIndex: "3",
    bottom: "15px",
    justifyContent: "center",
    right: "0px",
  };


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
    console.log("currDate is " + nextDay);
    return nextDay;
  }, [currDate]);

useEffect(() => {
    const intervalId = setInterval(() => {
      if (today === expDate) {
        // Update list state to empty array when a new day starts but don't update exp date until user clicks on start new list
        console.log("It is a new day today! List resets");
        console.log("expDate is " + expDate);
        console.log("today is " + today);
        setShowListLinks(true);
        listContext.setList((list) => (list = []));
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clear interval on unmount
    //The clearInterval() method of the Window interface cancels a timed, repeating action which was previously established by a call to setInterval().

  }, [expDate, today, listContext]);
  //run when exp today or listContext changes

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (today === expDate) {
  //       // Update list state to empty array when a new day starts but don't update exp date until user clicks on start new list
  //       console.log("It is a new day today! List resets");
  //       setShowListLinks(true);
  //       listContext.setList((list) => (list = []));
  //     }
  //   }, 1000); // Check every second

  //   return () => clearInterval(intervalId); // Clear interval on unmount
  // }, [expDate, today, listContext]);

  const handleNewList = (event) => {
    if( totalHope < 10){
    setShowListLinks(false);
    expContext.setListDate(tomorrow);
    listContext.setList((list) => (list = []));
    } else {
      return;
    }
  }
  //check state of total hope if 0 or expDate value does not exist, show new list icon and buttons
  useEffect(() => {
    if (totalHope === 10 || expDate !== tomorrow) {
      // if (!expDate) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope, expDate, tomorrow]); // The dependency array ensures this effect runs only when 'count' changes

  function addItem() {
    if (list.length === 10) {
      setShowAddField(false);
    } else if (list.length <= 10) {
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
    if (totalHope <= 10) {
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
            <Button onClick={addItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
      <Row>
          <div style={navStyles}>
                  <nav>
            {/* {toggleAlignNav ? (
      
              <Link onClick={handleNavAlign}>
                <button type="button" className="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="30px"
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
            ) : (
              <Link onClick={handleNavAlign}>
                <button type="button" className="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="30px"
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
            )} */}
 
            {showNewList && (
              <>   
               <Link to="/bucket">
     <button type="button" className="btn btn-primary">
       <svg
         width="26px"
         height="30px"
         viewBox="0 0 16 16"
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         class="bi bi-bucket"
       >
         <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527z" />
       </svg>
     </button>
   </Link>
     <Link to="/list">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="30px"
                    fill="currentColor"
                    className="bi bi-file-earmark-plus"
                    viewBox="0 0 16 16"
                  >
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  </svg>
                </button>
              </Link>
              <Link onClick={handleNewList}>
                <button
                  id="newListIcon"
                  type="button"
                  className="btn btn-primary"
                  disabled={totalHope === 10}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="30px"
                    fill="currentColor"
                    className="bi bi-file-earmark-plus"
                    viewBox="0 0 16 16"
                  >
               <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                  </svg>
                </button>
              </Link>
            </>
            )}

  {!showNewList && (
    <>
    <Link to="/bucket"><button type="button" className="btn btn-primary">
          <svg width="26px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bucket">
      <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527z"/>
    </svg>
    </button>
    </Link>

     {!showNewList && (
              
              <Link onClick={handleOpen}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={totalHope >= 10}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="30px"
                    fill="currentColor"
                    className="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </button>
              </Link>       
            )}     
    
     <Link to="/list">
              <button type="button" className="btn btn-primary">
               <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26px"
    height="30px"
    fill="currentColor"
    className="bi bi-file-earmark"
    viewBox="0 0 16 16"
  >
 <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
  </svg>
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
