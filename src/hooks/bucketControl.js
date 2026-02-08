import React, { useEffect, useContext, useRef } from "react";
import Lottie from "lottie-react";
import bucketAnimation from "../images/bucket-lottie.json";
import { ListContext } from "../contexts/ListContext";

const LottieControlBucket = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  useEffect(() => {
    if (!lottieRef.current) return;

    if (totalHope === 0) {
      lottieRef.current.goToAndStop(0, true);
    } else if (totalHope === 1) {
      lottieRef.current.playSegments([0, 40], true);
    } else if (totalHope === 2) {
      lottieRef.current.playSegments([40, 70], true);
    } else if (totalHope === 3) {
      lottieRef.current.playSegments([70, 150], true);
    } else {
      lottieRef.current.goToAndStop(150, true);
    }
  }, [totalHope, list]);

  const bucketstyle = {
    position: "absolute",
    zIndex: "-1",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "100%",
    width: "100%",
    maxWidth: "500px",
  };

  return (
    <Lottie
      lottieRef={lottieRef}
      autoPlay={false}
      loop={false}
      animationData={bucketAnimation}
      style={bucketstyle}
    />
  );
};

export default LottieControlBucket;