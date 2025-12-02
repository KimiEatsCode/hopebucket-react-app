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

  if (totalHope < 3) {
    return (
      <>
       
       <Row className="d-flex text-center mt-2">
          <Link to="/" style={{ textDecoration: "none"}}>
            <h2 className="pt-2">
              <strong>{totalHope} of 3</strong>
              </h2>
          </Link>
    
        </Row>
        <Row className="text-center p-2 mt-2 jusity-content-center">
          <Col className="col-md-8 mx-auto">
            {totalHope === 0 && (
              <>            
        
                <h4>Add up to 3 pieces of hopes to be able to share. Your bucket resets each day at midnight. Each day is a new beginning!
                </h4>
       
              </>
            )}

          </Col>
        </Row>

        <Row className="pb-5">
          <Col className="pb-5">
            <ListGroup id="contentToCopy">
              {list.map((item) => {
                return (
                  <ListGroup.Item
                    className="d-flex flex-nowrap"
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
                    <i className="bi bi-x-lg"></i>
                    </button>
                    <div className="hopeItem">{item.value}</div>
                   
                  </ListGroup.Item>      
                );
              })}
              <br></br>
      
            </ListGroup>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <>

        <Row className="mt-4">
          <Col>
            <ListGroup>
              {list.map((item) => {
                return (
                  <ListGroup.Item className="d-flex flex-nowrap">
                    <div
                      key={item.id}
                      variant="light"
                    ></div> <button
                      className="closeX btn"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      {" "}
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <div className="hopeItem">{item.value}</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <div id="copyMsg"></div>
        </Row>
       
      </>
    );
  }

}

export default List;
