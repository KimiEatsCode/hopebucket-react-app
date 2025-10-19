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
    if (totalHope === 0) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(2, true);
    } else if (totalHope === 1) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(4, true);
    } else if (totalHope === 2) {
      console.log("totalHope" + list);
      lottieRef.current.goToAndStop(6, true);
    } else if (totalHope === 3) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(8, true);
     } else if (totalHope === 4) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(10, true);
     } else if (totalHope === 5) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(12, true);
       } else if (totalHope === 6) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(15, true);
       } else if (totalHope === 7) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(20, 100);
       } else if (totalHope === 8) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(25, 100);
       } else if (totalHope === 9) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(30, 100);
       } else if (totalHope === 10) {
      console.log("totalHope" + list);
      lottieRef.current.playSegments(100, 100);
    } else {
      lottieRef.current.stop();
    }
  }, [totalHope, list]);

  const bucketstyle = {
    position: "absolute",
    zIndex: "-1",
    left: "0",
<<<<<<< HEAD
    top: "140px",
    height: "70%",
=======
    top: "170px",
    height: "60%",
>>>>>>> staging
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
