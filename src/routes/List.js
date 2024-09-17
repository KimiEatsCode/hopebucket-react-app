import React, { useContext } from "react";
import { Context } from "../ListContext";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";


function List() {
  const listContext = useContext(Context);
  const list = listContext.list;

  console.log("bucket list localStorage using listContext " + list);
  // const test = window.localStorage.getItem("hopeList")

  let totalHope = listContext.list.length;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }

  function startNewList() {
    listContext.setList((list) => (list = []));
  }

  if (totalHope < 10) {
    return (
      <>
        <Row>
          <h3 className="mt-4 text-center">
            {totalHope === 0 ? "Add 10 things (thoughts, events, people, an action you took etc.) that bring you hope to the list!" : ""}
          </h3>
        </Row>
        <Row>
          <Col>

                   <ListGroup>
              {list.map((item) => {
                return (
                  <ListGroup.Item
                    className="pt-3 pb-3"
                    key={item.id}
                    variant="dark"

                  >
                    <button className="alignRightX"

                           action
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
                        class="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </button>
                    <div className="hopeItem">{item.value}</div>
                  </ListGroup.Item>
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
          <h3 className="mt-3 mb-5 text-center">
            <button onClick={startNewList} class="btn btn-primary mt-2">
              Start New List
            </button>
          </h3>
        </Row>
        <Row>
          <h3 className="mb-5 text-center">
            {totalHope === 10 ? "Great Job! You've completed 10 hope items. View your list! Start a new list and fill up on hope!" : ""}
          </h3>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {list.map((item) => {
                return (
                  <ListGroup.Item className="pt-3 pb-3">
                    <div className="alignRightX" key={item.id} variant="dark">
                      {/* <div className="alignRightX"
                     key={item.id}
                     variant="dark"
                     action
                     onClick={() => {
                       deleteItem(item.id);
                     }}> */}{" "}
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg> */}
                    </div>
                    <div className="hopeItem">{item.value}</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <h3 className="mt-5 mb-5 text-center">
            <Button size="lg" onClick={startNewList} class="btn btn-primary mt-2">
              Start New List
            </Button>
          </h3>
        </Row>
      </>
    );
  }
}
// }

export default List;
