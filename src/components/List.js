import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
import { ModalContext } from "../contexts/ModalContext";
import { ValuesContext } from "../contexts/ValuesContext";
//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//html-to-image
import { toJpeg } from 'html-to-image';
import { MAX_HOPE_ITEMS } from "../constants";

async function waitForScreenshotLayout(node, timeoutMs = 2000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (node.querySelector(".screenshot-brand")) {
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      );
      return true;
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return false;
}

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

  const { values = [], getValueById } = useContext(ValuesContext);

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

      const layoutReady = await waitForScreenshotLayout(node);
      if (cancelled) return;
      if (!layoutReady) {
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

  function updateItemValue(itemId, valueId) {
    listContext.setList((prevList) =>
      prevList.map((item) => {
        if (item.id !== itemId) return item;
        if (!valueId) {
          const { valueId: _removed, ...rest } = item;
          return rest;
        }
        return { ...item, valueId };
      })
    );
  }

  return (
    <>
      <Modal id="listModal" show={showListModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {totalHope >= MAX_HOPE_ITEMS
              ? `Congrats! ${totalHope} of ${MAX_HOPE_ITEMS} Completed.`
              : `Today ${weekday}, ${today} - ${totalHope} of ${MAX_HOPE_ITEMS} Completed`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={listContentRef} className={isCapturing ? "screenshot-capture" : undefined}>
          {isCapturing ? (
              <div className="screenshot-brand text-center">
                <h1 className="logoName mb-2">HopeBucket</h1>
                <p className="screenshot-url mb-2">https://hopebucket.com</p>
              </div>
            ) : (
              <Link to="/" style={{ textDecoration: "none"}}>
                <h1 className="logoName mb-4">HopeBucket</h1>
              </Link>
            )}
            {totalHope === 0 && (
              <Row className="text-center pt-2">
                <Col className="col-md-8 mx-auto">
                  <h4>Add {MAX_HOPE_ITEMS} items of hope to be able to share. Your bucket resets each day at midnight. Each day is a new beginning!</h4>
                </Col>
              </Row>
            )}
            <Row className="pb-2">
       
              <Col className="pb-5">
                <ListGroup id="contentToCopy" className={isCapturing ? 'mx-auto' : ''}>
                  {list.map((item) => {
                    const linkedValue = getValueById(item.valueId);
                    return (
                      <ListGroup.Item
                        key={item.id}
                        variant="light"
                      >
                        <div className="hopeItemContent">
                          <div className="hopeItem">{item.value}</div>
                          {isCapturing && linkedValue && (
                            <span className="value-badge screenshot-value-badge">
                              {linkedValue.text}
                            </span>
                          )}
                          {!isCapturing && (
                            <>
                              <Form.Select
                                className="value-picker value-picker-inline"
                                aria-label="Change linked value"
                                value={item.valueId ?? ""}
                                onChange={(e) =>
                                  updateItemValue(item.id, e.target.value || null)
                                }
                              >
                                <option value="">No linked value</option>
                                {values.map((v) => (
                                  <option key={v.id} value={v.id}>
                                    {v.text}
                                  </option>
                                ))}
                              </Form.Select>
                              <button
                                type="button"
                                className="btn hope-item-delete-btn"
                                onClick={() => deleteItem(item.id)}
                                aria-label="Delete hope item"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
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
        
          {totalHope >= MAX_HOPE_ITEMS && (
            <button
              type="button"
              className="btn btn-primary addItemButton"
              onClick={handleScreenshot}
              disabled={isCapturing}
              aria-label="Share list"
            >
              <i className="bi bi-camera-fill"></i>
              {isCapturing ? 'Sharing…' : 'Share'}
            </button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  );

}

export default List;
