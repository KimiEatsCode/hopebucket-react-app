import React, { useEffect, useContext, useRef } from "react";
import Lottie from "lottie-react";
// import bucketAnimation from "../images/arrow-with-msg.json";
import { ListContext } from "../contexts/ListContext";

const LottieControlNavMsg = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  useEffect(() => {
    if (totalHope === 0) {
      lottieRef.current.playSegments(55, 100);
    } else if (totalHope === 1) {
      lottieRef.current.goToAndStop(20, true);
    } 
  }, [totalHope, list]);


  const msgstyle = {
    position: "absolute",
    zIndex: "-1",
    left: "0",
    top: "170px",
    height: "70%",
    width: "100%",
  };

  return (
    <Lottie
      lottieRef={lottieRef}
      autoPlay={false}
      loop={false}
      // animationData={bucketAnimation}
      style={msgstyle}
    />
  );
};

export default LottieControlNavMsg;
