import React, { useEffect, useContext, useRef } from "react";
import Lottie from "lottie-react";
import bucketAnimation from "../images/bucket-lottie.json";
import { ListContext } from "../contexts/ListContext";

const LottieControl = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  useEffect(() => {
    if (totalHope === 0) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(10, true);
    } else if (totalHope === 1) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(20, true);
    } else if (totalHope === 2) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(55, true);
    } else if (totalHope === 3) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(55, 100);
    } else {
      lottieRef.current.stop();
    }
  }, [totalHope, list]);

  const bucketstyle = {
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
      autoPlay={true}
      loop={false}
      animationData={bucketAnimation}
      style={bucketstyle}
    />
  );
};

export default LottieControl;
