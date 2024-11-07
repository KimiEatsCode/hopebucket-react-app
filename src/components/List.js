import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../ListContext";
//bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//hooks
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";
//components
import { handleOpen } from "../components/Nav2";

function List() {
  const listContext = useContext(ListContext);
  const list = listContext.list;

  console.log(
    "bucket list localStorage using listContext " + JSON.stringify(list)
  );
  const [showNewList, setShowListLinks] = useState(true);
  const [elapsedTime, setTime] = useState(true);
  const [expDate, setListDate] = useLocalStorage("listDate", "");

  let totalHope = listContext.list.length;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }

  const handleNewList = (event) => {
    setListDate(new Date().getTime());
    listContext.setList((list) => (list = []));
  };

const checkTime = (event) => {
  // let nextDay = new Date();
  // nextDay = nextDay.getTime() + 5000;

  setTime(expDate + 5000)

const timeDiff = elapsedTime - expDate;

if (timeDiff >= 10000) {
  console.log("10 seconds have passed!");
  listContext.setList((list) => (list = []));
} else {
  console.log("You still have time.")
}
console.log(expDate)
// console.log(nextDay)
console.log(elapsedTime)
}

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
        <button onClick={checkTime} className="btn btn-primary mt-2">
               Check if 10 seconds has passed since new list started
              </button>
              Seconds of day started: {expDate}
              <p></p>Seconds of 10 seconds passed: {elapsedTime}
         <Link to="/"> <h1>
            <strong>{totalHope} of 3</strong>
          </h1>
        </Link>
        </Row>
        <Row className="text-center mt-3">
          <Col className="d-flex jusity-content-center">
            <h4>
              {" "}
              {totalHope === 0 &&
                "Get started by clicking [+] button below."}{" "}
              <p></p>
              {totalHope === 0 &&
                "Fill your hope bucket with thoughts, things that happen during the day, people that give you hope, or a action you took that gives you hope."}
              <p></p>
              {totalHope === 0 && "Hope comes in many forms!"}
              <p></p>
              {totalHope === 0 && "Make your hope list today!"}
            </h4>
          </Col>
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
      </>
    );
  }
}

export default List;
