import React, { useEffect, useState, useContext, useRef } from "react";
import Lottie from "lottie-react";
import bucketAnimation from "../images/bucket-lottie.json";
import { ListContext } from "../contexts/ListContext";

const LottieControl = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

//   useEffect(() => {
//     if (totalHope === 3) {
//       console.log("totalHope" + list);
//       lottieRef.current.play();
//     } else {
//       lottieRef.current.stop();
//     }
//   }, [totalHope, list]);

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
      autoPlay={false}
      loop={false}
      animationData={bucketAnimation}
      style={bucketstyle}
    //   interactivity={interactivity}
    />
  );
};

export default LottieControl;
