import React from 'react';
import styles from './styles.css';
import Lottie from 'react-lottie';
import * as animationData1 from './Dots1.json';
import * as animationData2 from './Dots2.json';

export default function Bubbles(props) {

  const options = data => {return {
    loop: true,
    autoplay: true, 
    animationData: data
  }};

  return (
    <div className={styles.Bubbles}
      style={{
        top: `${parseInt(props.top) + 4 /*7*/}%`,
        opacity: props.opacity
      }}>
        <Lottie options={options(animationData1)} title="Bubbles1" />
        <Lottie options={options(animationData2)} title="Bubbles2" />
    </div>
  );
}
/*  const width = props.wWidth * 1.6;
  // const height = width * 0.5625;
  const height = width * 1.6;*/
  
 // width={width} height={height} 
                // height={'130%'}
                // width={'130%'}