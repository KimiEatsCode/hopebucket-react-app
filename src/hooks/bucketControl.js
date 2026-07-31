import React, { useEffect, useContext, useRef } from "react";
import Lottie from "lottie-react";
import bucketAnimation from "../images/bucket-lottie.json";
import { ListContext } from "../contexts/ListContext";
import { MAX_HOPE_ITEMS } from "../constants";

const LottieControlBucket = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  useEffect(() => {
    if (!lottieRef.current) return;

    if (totalHope === 0) {
      lottieRef.current.goToAndStop(0, true);
    } else if (totalHope >= MAX_HOPE_ITEMS) {
      lottieRef.current.playSegments([70, 150], true);
    } else {
      const frame = Math.round((totalHope / MAX_HOPE_ITEMS) * 150);
      lottieRef.current.goToAndStop(frame, true);
    }
  }, [totalHope, list]);

  // const bucketstyle = {
    // position: "absolute",
    // zIndex: "-1",
    // left: "50%",
    // top: "44%",
    // transform: "translate(-50%, -50%)",
    // width: "100vw",
  // };

  return (
    <Lottie
      lottieRef={lottieRef}
      autoPlay={false}
      loop={false}
      animationData={bucketAnimation}
      // style={bucketstyle}
    />
  );
};

export default LottieControlBucket;