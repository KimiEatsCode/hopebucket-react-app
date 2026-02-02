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
      lottieRef.current.goToAndStop(0,true);
    } else if (totalHope === 1) {
      lottieRef.current.goToAndStop(40,true);
    } else if (totalHope === 2) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(70, true);
    } else if (totalHope === 3) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(100, true);
    
    } else {
      lottieRef.current.stop();
    }
  }, [totalHope, list]);

  const bucketstyle = {
    position: "absolute",
    zIndex: "-1",
    left: "0",
    top: "140px",
    height: "70%",
    width: "100%",
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