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

async function presentScreenshot(dataUrl, filename) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: 'image/jpeg' });
    const shareData = { files: [file], title: 'HopeBucket' };
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      await navigator.share(shareData);
      return;
    }
  } catch (err) {
    if (err?.name === 'AbortError') return;
    console.warn('Share failed, using download fallback:', err);
  }

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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

  const currentDate = new Date();
  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const dd1 = currentDate.getDate();
  const mm = currentDate.getMonth() + 1;
  const yyyy = currentDate.getFullYear();
  const today = mm + "/" + dd1 + "/" + yyyy;
  const screenshotFilename = `hopebucket-${mm}-${dd1}-${yyyy}.jpg`;

  const [isCapturing, setIsCapturing] = useState(false);
  const [screenshotError, setScreenshotError] = useState(null);
  const listContentRef = useRef(null);

  // When Nav fires triggerScreenshot, open the list modal then begin capture
  useEffect(() => {
    if (!triggerScreenshot) return;
    setTriggerScreenshot(false);
    setScreenshotError(null);
    setShowListModal(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsCapturing(true));
    });
  }, [triggerScreenshot, setTriggerScreenshot, setShowListModal]);

  useEffect(() => {
    if (!isCapturing) return;

    let cancelled = false;

    const capture = async () => {
      const deadline = Date.now() + 2000;
      let node = listContentRef.current;
      while (!node && Date.now() < deadline) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        node = listContentRef.current;
      }

      if (cancelled) return;
      if (!node) {
        setIsCapturing(false);
        setScreenshotError('Could not prepare screenshot. Please try again.');
        return;
      }

      try {
        const dataUrl = await toJpeg(node, {
          cacheBust: true,
          quality: 0.95,
          backgroundColor: 'aliceblue',
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        });
        if (cancelled) return;
        setIsCapturing(false);
        setShowListModal(false);
        await presentScreenshot(dataUrl, screenshotFilename);
      } catch (err) {
        if (cancelled) return;
        setIsCapturing(false);
        console.error('Screenshot error:', err);
        setScreenshotError('Could not capture screenshot. Please try again.');
      }
    };

    capture();
    return () => { cancelled = true; };
  }, [isCapturing, setShowListModal, screenshotFilename]);

  const handleScreenshot = () => {
    setScreenshotError(null);
    setIsCapturing(true);
  };

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
            {isCapturing ? (
              <h1 className="logoName mb-4">HopeBucket</h1>
            ) : (
              <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>
            )}
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
          {screenshotError && (
            <p className="text-danger small mb-0 me-auto">{screenshotError}</p>
          )}
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
            <button
              type="button"
              className="btn btn-primary pl-2 addItemButton"
              onClick={handleScreenshot}
              disabled={isCapturing}
            >
              <i className="bi bi-camera"></i>
              <span className="pl-2 m-2 screenshot-text">
                {isCapturing ? 'Capturing…' : 'Screenshot'}
              </span>
            </button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  );

}

export default List;
