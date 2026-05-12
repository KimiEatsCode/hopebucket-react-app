import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
import { ModalContext } from "../contexts/ModalContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
//html-to-image
import { toJpeg } from 'html-to-image';


function List() {

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const modalContext = useContext(ModalContext);
  const showListModal = modalContext.showListModal;
  const setShowListModal = modalContext.setShowListModal;
  const setShowAddField = modalContext.setShowAddField;
  const triggerScreenshot = modalContext.triggerScreenshot;
  const setTriggerScreenshot = modalContext.setTriggerScreenshot;

  const handleClose = () => setShowListModal(false);

  const [isCapturing, setIsCapturing] = useState(false);
  const listContentRef = useRef(null);

  // When Nav fires triggerScreenshot, open the list modal then begin capture
  useEffect(() => {
    if (!triggerScreenshot) return;
    setTriggerScreenshot(false);
    setShowListModal(true);
    // Give the modal one frame to mount before capturing
    setTimeout(() => setIsCapturing(true), 50);
  }, [triggerScreenshot, setTriggerScreenshot, setShowListModal]);

  useEffect(() => {
    if (!isCapturing) return;
    const node = listContentRef.current;
    if (!node) return;
    toJpeg(node, { cacheBust: true, quality: 0.95, backgroundColor: 'aliceblue' })
      .then((dataUrl) => {
        setIsCapturing(false);
        setShowListModal(false);
        const newTab = window.open('', '_blank');
        if (newTab) {
          newTab.document.write(
            `<!DOCTYPE html><html><head><title>HopeBucket Screenshot</title>` +
            `<style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f5;}` +
            `img{max-width:100%;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);}</style></head>` +
            `<body><img src="${dataUrl}" alt="HopeBucket screenshot" /></body></html>`
          );
          newTab.document.close();
        }
      })
      .catch((err) => {
        setIsCapturing(false);
        console.error('Screenshot error:', err);
      });
  }, [isCapturing, setShowListModal]);

  const handleScreenshot = () => setIsCapturing(true);

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

  return (
    <>
      <Modal id="listModal" show={showListModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {totalHope >= 3
              ? `Congrats! ${totalHope} of 3 Completed.`
              : `Today ${weekday}, ${today} - ${totalHope} of 3 Completed`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={listContentRef}>
            {totalHope === 0 && (
              <Row className="text-center pt-2">
                <Col className="col-md-8 mx-auto">
                  <h4>Add 3 items of hope to be able to share. Your bucket resets each day at midnight. Each day is a new beginning!</h4>
                </Col>
              </Row>
            )}
            <Row className="pb-5">
            <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>
              <Col className="pb-5">
                <ListGroup id="contentToCopy" className={isCapturing ? 'mx-auto' : ''}>
                  {list.map((item) => {
                    return (
                      <ListGroup.Item
                        className="d-flex flex-nowrap"
                        key={item.id}
                        variant="light"
                      >
                        {!isCapturing && (
                          <button
                            className="closeX btn"
                            onClick={() => deleteItem(item.id)}
                          >
                            ✕
                          </button>
                        )}
                        <div className="hopeItem">{item.value}</div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {totalHope < 3 && (
            <button
              type="button"
              className="btn btn-primary addItemButton"
              onClick={() => { setShowListModal(false); setShowAddField(true); }}
            >
              <i className="bi bi-plus-circle-fill p-2"></i>Hope
            </button>
          )}
          {totalHope >= 3 && (
            <button type="button" className="btn btn-primary pl-2 addItemButton" onClick={handleScreenshot}>
              <i className="bi bi-camera"></i><span className="pl-2 m-2 screenshot-text">Screenshot</span>
            </button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  );

}

export default List;
