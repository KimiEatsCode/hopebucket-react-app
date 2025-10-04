import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";
import LottieControlConfetti from "../hooks/confettiControl";
import LottieControlBucket from "../hooks/bucketControl";

function Bucket() {
  const listContext = useContext(ListContext);
  let totalHope = listContext.list.length;

  const linkRemoveUnderline = {
    textDecoration: "none",
  };
  return (
    <>
      <LottieControlConfetti></LottieControlConfetti>
      <div className="row">
       
      </div>
      <div className="row mx-auto text-center">
   
          <h5 class="instructions-text">
            {totalHope === 3 ? "Congrats! You filled your hope bucket!" : ""}
            {totalHope < 3 ? "Add hope to fill up your hope bucket!" : ""}
          </h5>
          <Link to="/list" style={linkRemoveUnderline}>
            <div className="bucketIcon">
              <h1 className="hopeCount">{totalHope} of 3</h1>
              <LottieControlBucket></LottieControlBucket>
            </div>
          </Link>

      </div>
    </>
  );
}

export default Bucket;
