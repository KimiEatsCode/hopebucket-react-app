import React, { useEffect, useState, useContext, useRef } from "react";
import Lottie from "lottie-react";
import confettiAnimation from "../images/confetti-lottie.json";
import { ListContext } from "../contexts/ListContext";

const LottieControl = () => {
  const lottieRef = useRef();

  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  useEffect(() => {
    if (totalHope === 3) {
      console.log("totalHope" + list);
      lottieRef.current.play();
    } else {
      lottieRef.current.stop();
    }
  }, [totalHope, list]);

  const confettistyle = {
    position: "absolute",
    zIndex: "0",
    left: "0",
    top: "0",
    height: "100%",
    width: "100%",
  };

  return (
    <Lottie
      lottieRef={lottieRef}
      autoPlay={false}
      loop={false}
      animationData={confettiAnimation}
      style={confettistyle}
      // interactivity={interactivity}
    />
  );
};

export default LottieControl;
