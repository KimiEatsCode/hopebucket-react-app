import React, { useEffect, useState, useContext } from "react";
import Lottie from 'react-lottie';
import * as animationData from '../images/confetti-lottie.json'
import { ListContext } from '../contexts/ListContext';
import { redirect } from "react-router-dom";


  export function LottieControl() {

    const listContext = useContext(ListContext);
    const list = listContext.list;
    let totalHope = listContext.list.length;

    const[isStopped, setStopped] = useState(true)

    const buttonStyle = {
      display: 'block',
      margin: '10px auto',
    };

    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: animationData,
      rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
      }
    };


  useEffect(() => {
    if (list === "[]") {
      console.log('totalHope' + list);
      setStopped(false);
    } else {
      setStopped(true)
    }
  }, []);


    return <div>
      <Lottie options={defaultOptions}
              height={800}
              width={400}
              // isStopped={this.state.isStopped}
              // isPaused={this.state.isPaused}
              />
      {/* <button style={buttonStyle} onClick={() => ({isStopped: true})}>stop</button>

      <button style={buttonStyle} onClick={() => ({isStopped: false})}>play</button>


      <button style={buttonStyle} onClick={() =>({isPaused: !this.state.isPaused})}>pause</button> */}
    </div>
  }
