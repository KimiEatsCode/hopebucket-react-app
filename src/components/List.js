import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../ListContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//hooks
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";
//components
import { handleOpen } from "../components/Nav2";
import Nav2 from "../components/Nav2";

function List() {
  const listContext = useContext(ListContext);
  const list = listContext.list;


  const [showNewList, setShowListLinks] = useState(true);
  const [expDate, setExpDate] = useLocalStorage("listDate", "");

  let totalHope = listContext.list.length;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }

  let today = new Date();
  //getMonth starts at 0 so add 1 to be this month
  const dd1 = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  today = mm + "/" + dd1 + "/" + yyyy;

  const dd2 = dd1 + 1;
  const tomorrow = mm + "/" + dd2 + "/" + yyyy;

  const handleNewList = (event) => {
    setExpDate(tomorrow);
    listContext.setList((list) => (list = []));
  };

  // const checkTime = (event) => {
    if (expDate === tomorrow) {
      console.log(expDate + " expDate vs. today's date " + today);
      listContext.setList((list) => (list = []));
      console.log()
    } else {
      console.log("You still have time. It's still today not tomorrow");
    }

    console.log("Today " + today);
    console.log("Tomorrow expDate " + expDate);
  // };

  //check state of total hope if 0 show new list icon and buttons
  useEffect(() => {
    if (totalHope === 0 || totalHope >= 3) {
      setShowListLinks(true);
    } else {
      setShowListLinks(false);
    }
  }, [totalHope]);

  //useEffect used to deal with state changes?
  useEffect(() => {
    if (totalHope === 3) {
      window.scrollTo(0, 0);
    }
  }, [totalHope]);

  // if (totalHope < 3 || expDate === today) {
  if (totalHope < 3) {
    return (
      <>
        <Row className="d-flex text-center mt-5">
          {/* <button onClick={checkTime} className="btn btn-primary mt-2">
            Check if 10 seconds has passed since new list started
          </button>
          ExpDate: {expDate}
          <p></p>Today's Date: {today} */}
          <Link to="/">
            {" "}
            <h1>
              <strong>{totalHope} of 3</strong>
            </h1>
          </Link>
        </Row>
        <Row className="text-center mt-3">
          <Col className="col-2"></Col>
          <Col className="d-flex jusity-content-center col-8">
            <h5>
              {" "}
              {totalHope === 0 &&
                "Get started by clicking [+] button below."}{" "}
              <p></p>
              {totalHope === 0 &&
                "Fill up your hope bucket with positive thoughts, good things that happen during the day, names of people who help and support you, or an action you took that gives you hope."
               }
                <p></p>
                 {totalHope === 0 && "Each day your hope list resets. Try to get 3 hope items before the day ends and a new day begins!"}
              <p></p>
              {totalHope === 0 && "Make your hope list today!"}
            </h5>
          </Col>
          <Col className="col-2"></Col>
        </Row>
        {/* <Row>
     { showNewList && <h2 className="mt-3 text-center">
            <button onClick={handleOpen} className="btn btn-primary p-4 mt-2">
              Add hope
            </button>
          </h2>
           }
        </Row> */}

        <Row>
          <Col>
            <ListGroup>
              {list.map((item) => {
                return (
                  // <ListGroup.Item className="d-flex flex-wrap">
                  <ListGroup.Item
                    className="pt-2 pb-2 d-flex flex-nowrap "
                    key={item.id}
                    variant="light"
                  >
                    <button
                      className="closeX btn "
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </button>

                    <div className=" hopeItem ">{item.value}</div>
                  </ListGroup.Item>
                  // </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <Nav2></Nav2>
      </>
    );
  } else {
    return (
      <>
        <Row>
          <h4 className="mb-3 mt-3 text-center">
            {totalHope === 3
              ? "Great Job! You've filled up your hope! Start a new list and fill up on more hope!"
              : ""}
          </h4>
        </Row>
        <Row>
          <h3 className="mt-3 mb-2 text-center">
            {showNewList && (
              <button onClick={handleNewList} className="btn btn-primary mt-2">
                Start New List
              </button>
            )}
          </h3>
        </Row>

        <Row className="mt-4">
          <Col>
            <ListGroup>
              {list.map((item) => {
                return (
                  <ListGroup.Item className="pt-1 pb-1">
                    <div
                      className="alignRightX"
                      key={item.id}
                      variant="dark"
                    ></div>
                    <div className="hopeItem">{item.value}</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <Nav2></Nav2>
      </>
    );
  }
}

export default List;
