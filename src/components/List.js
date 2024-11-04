import React, { useContext, useEffect } from "react";
import { ListContext } from "../ListContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

function List() {
  const listContext = useContext(ListContext);
  const list = listContext.list;

  console.log(
    "bucket list localStorage using listContext " + JSON.stringify(list)
  );

  const [expDate, setListDate] = useLocalStorage("listDate", "");

  let totalHope = listContext.list.length;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }


  const today = new Date();

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  function startNewList() {
    listContext.setList((list) => (list = []));
    return setListDate(nextDay);
  }

  //useEffect used to deal with state changes?
  useEffect(() => {
    if (totalHope === 3) {
      window.scrollTo(0, 0);
    }
  }, [totalHope]);

  if (totalHope < 3 || expDate === today) {
    return (
      <>
        <Row>
          <Col className="d-flex jusity-content-center">
            <h3 className="text-center mt-4">
              {totalHope === 0
                ? "Get started by clicking on the plus [+] button below. Thoughts, events, people, an action you took etc, hope comes in many forms!"
                : ""}
            </h3>
          </Col>
        </Row>
        <Row>
          <h3 className="mt-3 mb-2 text-center">
            <button onClick={startNewList} className="btn btn-primary mt-2">
              Start New List
            </button>
          </h3>
        </Row>

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
              ? "Great Job! You've completed 10 hope items. Start a new list and fill up on more hope!"
              : ""}
          </h4>
        </Row>
        <Row>
          <h3 className="mt-3 mb-2 text-center">
            <button onClick={startNewList} className="btn btn-primary mt-2">
              Start New List
            </button>
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
        <Row>
          <h3 className="mt-5 mb-5 text-center">
            <Button
              size="lg"
              onClick={startNewList}
              className="btn btn-primary mt-2"
            >
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
