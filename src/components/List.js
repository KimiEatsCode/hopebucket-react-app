import { useContext } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
import { ExpContext } from "../contexts/ExpContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//components
import LottieControl from "../hooks/confettiControl";


function List() {

if(document.getElementById('copyButton') != null) {
  document.getElementById('copyButton').addEventListener('click', function() {
  const contentDiv = document.getElementById('contentToCopy');
  const textToCopy = contentDiv.innerText; // or .textContent for more raw text
  // Use the Clipboard API
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // alert('Your hope list copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy content: ', err);
    });
});
} else {
  
  // alert('no copy button');

}
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


  if (totalHope < 10) {
    return (
      <>
        <LottieControl></LottieControl>
        <Row className="d-flex text-center mt-2">
          <div id="contentToCopy">Below are things that give me hope!</div>
          <Link to="/">
            <h2 className="pt-2">
              <strong>{totalHope} of 10</strong>
            </h2>
          </Link>
    <div
            id="copyButton"
            class="fb-share-button"
            data-href="https://hopebucket.online/list"
            rel="noreferrer"
            data-layout=""
            data-size=""
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhopebucket.online%2Flist&amp;src=sdkpreparse"
              rel="noreferrer"
              class="fb-xfbml-parse-ignore"
            >
              <button class="btn btn-primary">Share Your HopeBucket List!</button>
            </a>
          </div>
        </Row>
        <Row className="text-center p-2 mt-2 jusity-content-center">
          <Col className="col-md-8 mx-auto">
            {totalHope = 0 && (
              <>
                <h5>
                  Today,fill up your hope bucket with positive thoughts, good
                  things that happen during the day, names of people who helped
                  or supported you, or an action you took that gives you hope.
                </h5>
                <h5>
                  Try to add 10 hope items before the day ends and a new day
                  begins!
                </h5>
               
              </>
            )}
          </Col>
        </Row>
        <Row className="pb-5">
          <Col className="pb-5">
            <ListGroup>
              {list.map((item) => {
                return (
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
            {totalHope === 10
              ? "Yay! I filled up on lots of hope today! Today I've done my best. Tomorrow is a new day and a new hope list!"
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
        <Row className="mt-5 mb-5">
        </Row>
      </>
    );
  }
}

export default List;
