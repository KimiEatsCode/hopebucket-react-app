import { React, useState, useContext, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
//hook
import LottieControlNavMsg from "../hooks/navMsgControl";

function OffCanvasExample({ name, ...props }) {
  const [showAddField, setShowAddField] = useState(false);
  const [isLeft, setLeft] = useState(true);
  const [showNewList, setShowListLinks] = useState(false);
  const [toggleAlignNav, setToggleAlignNav] = useState(true);
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
    //fun use flex direction to change row direction
    flexDirection: isLeft ? "row-reverse" : "",
    left: isLeft ? "24px" : "",
    right: isLeft ? "" : "24px",
  };

  const handleNavAlign = (event) => {
    setLeft((isLeft) => !isLeft);
    setToggleAlignNav((current) => !current);
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
        console.log("new day today!");
        setShowListLinks(true);
        listContext.setList((list) => (list = []));
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [expDate, today, listContext]);

  const handleNewList = (event) => {
    setShowListLinks(false);
    expContext.setListDate(tomorrow);
    listContext.setList((list) => (list = []));
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

  function addItem() {
    if (list.length === 3) {
      navigate("/");
      setShowAddField(false);
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
      <div className="offCanvas" show={showAddField} onHide={handleClose} {...props}>
        <div className="no-wrap">
          <div className="row" mb={3}>
            <div className="col">
              <div className="form"> <form 
                type="textarea"

                placeholder="What is something positive that happened or something you did that gives you hope today?"
                size="lg"
                ref={fieldFocus}
                value={input}
                onChange={(item) => updateInput(item.target.value)}
                aria-label="form field to type text"
                aria-describedby="basic-addon2"
              />
            </div>
            </div>
            <p></p>
            <button onClick={addItem}>
              <i class="bi bi-plus-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <nav>
          <div style={navStyles}>
            {toggleAlignNav ? (
              <Link onClick={handleNavAlign}>
                <button type="button" className="btn btn-primary">
                  <i class="bi bi-box-arrow-right"></i>
                </button>
              </Link>
            ) : (
              <Link onClick={handleNavAlign}>
                <button type="button" className="btn btn-primary">
                  <i className="bi bi-box-arrow-left"></i>
                </button>
              </Link>
            )}
              <Link to="/list">
                <button type="button" className="btn btn-primary">
                  <i class="bi bi-file-earmark"></i>
                </button>
              </Link>

            {showNewList && (
              <Link onClick={handleNewList}>
                <div class="lottie-wrapper">
                  {" "}
                  <LottieControlNavMsg></LottieControlNavMsg>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={totalHope === 3}
                >
                  <i class="bi bi-file-earmark-plus"></i>
                </button>
              </Link>
            )}

            {!showNewList && (
              <Link to="/bucket">
                <button type="button" className="btn btn-primary">
                  <i class="bi bi-bucket"></i>
                </button>
              </Link>
              
            )}
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
          </div>
        </nav>
      </div>
    </>
  );
}

function Nav() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Nav;
