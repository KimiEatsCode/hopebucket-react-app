import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//hooks
//components
import LottieControl from '../hooks/confettiControl'

function List() {
  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const expContext = useContext(ExpContext);
  const expDate = expContext.expDate;

  // const [showNewList, setShowListLinks] = useState(true);


  let today = new Date();
  //getMonth starts at 0 so add 1 to be this month
  const dd1 = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  today = mm + "/" + dd1 + "/" + yyyy;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }

  // useEffect(() => {
  //   if (totalHope === 3) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [totalHope]);

  // if (totalHope < 3 || expDate === today) {
  if (totalHope <= 3) {
    return (
      <>
              <LottieControl></LottieControl>
        <Row className="d-flex text-center mt-5">
          <Link to="/">
        {expDate !== today &&  <h4>List Expires: {expDate}</h4>}

            <h1 className="hopeount">
              <strong>{totalHope} of 3</strong>
            </h1>
          </Link>
        </Row>
        <Row className="text-center mt-3 jusity-content-center ">
          <Col className="col-md-8 mx-auto">
            <h5>

              {totalHope === 0 &&
                "Fill up your hope bucket with positive thoughts, good things that happen during the day, names of people who help and support you, or an action you took that gives you hope."}
              <p></p>
              {totalHope === 0 &&
                "Each day your hope list resets. Try to get 3 hope items before the day ends and a new day begins!"}

            </h5>
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
              ? "Great Job! You've filled up your hope for today! Treat yourself to some grace, fun, or rest today if you can. Tomorrow is a new day and new list!"
              : ""}
          </h4>
        </Row>
        <Row>
          <h3 className="mt-3 mb-2 text-center">
            {/* {showNewList && (
              <button onClick={handleNewList} className="btn btn-primary mt-2">
                Start New List
              </button>
            )} */}
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
