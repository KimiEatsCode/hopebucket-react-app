import { useContext } from "react";
//context
import { ListContext } from "../contexts/ListContext";
import { ModalContext } from "../contexts/ModalContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";

function List() {

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const modalContext = useContext(ModalContext);
  const showListModal = modalContext.showListModal;
  const setShowListModal = modalContext.setShowListModal;

  const handleClose = () => setShowListModal(false);

  // const [showNewList, setShowListLinks] = useState(true);

  const currentDate = new Date();
  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  //getMonth starts at 0 so add 1 to be this month
  const dd1 = currentDate.getDate();
  const mm = currentDate.getMonth() + 1;
  const yyyy = currentDate.getFullYear();
  const today = mm + "/" + dd1 + "/" + yyyy;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    return listContext.setList(updateList);
  }

  if (totalHope < 3) {
    return (
      <Modal show={showListModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton> 
     
          <Modal.Title> 
            
            Today {weekday}, {today} - {totalHope} of 3 Completed
          

          </Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
          <Row className="text-center pt-2">
            <Col className="col-md-8 mx-auto">
              {totalHope === 0 && (
                <>            
                  <h4>Add 3 items of hope to be able to copy and share. Your bucket resets each day at midnight. Each day is a new beginning!
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
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal show={showListModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
          Congrats! {totalHope} of 3 Completed.
          </Modal.Title>
      
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <ListGroup>
                {list.map((item) => {
                  return (
                     <ListGroup.Item className="d-flex flex-nowrap" key={item.id}>
                     <button
                    className="closeX btn"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  > 
                          <i className="bi bi-x-lg"></i>
                          </button>
                      <div className="hopeItem">{item.value}</div> 
                   
                    </ListGroup.Item> 
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        
        </Modal.Body>
      </Modal>
    );
  }

}

export default List;
