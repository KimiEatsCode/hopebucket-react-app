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
import { toPng } from 'html-to-image';


function List() {

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  const modalContext = useContext(ModalContext);
  const showListModal = modalContext.showListModal;
  const setShowListModal = modalContext.setShowListModal;
  const setShowAddField = modalContext.setShowAddField;

  const handleClose = () => setShowListModal(false);

  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const listContentRef = useRef(null);

  useEffect(() => {
    if (!isCapturing) return;
    const node = listContentRef.current;
    if (!node) return;
    toPng(node, { cacheBust: true })
      .then((dataUrl) => {
        setIsCapturing(false);
        setShowListModal(false);
        setScreenshotUrl(dataUrl);
        setShowScreenshotModal(true);
      })
      .catch((err) => {
        setIsCapturing(false);
        console.error('Screenshot error:', err);
      });
  }, [isCapturing, setShowListModal]);

  const handleScreenshot = () => setIsCapturing(true);

  const handleDownload = async () => {
    try {
      const response = await fetch(screenshotUrl);
      const blob = await response.blob();
      const file = new File([blob], 'hopebucket.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'HopeBucket' });
        return;
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
    }

    // Desktop fallback
    const url = URL.createObjectURL(
      await fetch(screenshotUrl).then((r) => r.blob())
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hopebucket.png';
    a.click();
    URL.revokeObjectURL(url);
  };

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
                  <h4>Add 3 items of hope to be able to copy and share. Your bucket resets each day at midnight. Each day is a new beginning!</h4>
                </Col>
              </Row>
            )}
            <Row className="pb-5">
            <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>
              <Col className="pb-5">
                <ListGroup id="contentToCopy">
                  {list.map((item) => {
                    return (
                      <ListGroup.Item
                        className={`d-flex flex-nowrap${isCapturing ? ' justify-content-center text-center' : ''}`}
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
              <i className="bi bi-plus-circle-fill pr-2"></i>Hope
            </button>
          )}
          <button type="button" className="btn btn-primary pl-2" onClick={handleScreenshot}>
            <i className="bi bi-camera"></i><span className="pl-2 m-2 screenshot-text">Screenshot</span>
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showScreenshotModal} onHide={() => setShowScreenshotModal(false)} centered size="lg">
        <Modal.Header>
          <Modal.Title>Download and Share</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowScreenshotModal(false)}
          />
        </Modal.Header>
        {screenshotUrl && (
              <>
        <Modal.Body className="text-center">
        
              <img
                src={screenshotUrl}
                alt="HopeBucket screenshot"
                style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1.25rem' }}
              />
          
       
        </Modal.Body>
        <Modal.Footer> <div className="d-flex flex-column align-items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="btn btn-primary btn-download"
                >
                  <i className="bi bi-download"></i><span className="m-2">Download Screenshot</span>
                </button>
               
                <div className="d-flex gap-4 justify-content-center fs-2">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: '#E1306C' }}>
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: '#1877F2' }}>
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" title="TikTok" style={{ color: '#000000' }}>
                    <i className="bi bi-tiktok"></i>
                  </a>
                </div>
              </div></Modal.Footer>
              </>
                 )}
    
      </Modal>
    </>
  );

}

export default List;
