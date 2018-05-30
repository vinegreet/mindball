import React from 'react';
import styles from './styles.css';
import Lottie from 'react-lottie';
import * as animationData1 from './Dots1.json';
import * as animationData2 from './Dots2.json';

export default function Bubbles(props) {

  const options1 = {
    loop: true,
    autoplay: true, 
    animationData: animationData1,
  };
  const options2 = {
    loop: true,
    autoplay: true, 
    animationData: animationData2,
  };

  return (
    <div className={styles.Bubbles}
      style={{
        top: `${parseInt(props.top) + 4 /*7*/}%`,
        opacity: props.opacity
      }}>
        <Lottie options={options1} />
        <Lottie options={options2} />
    </div>
  );
}
                // height={'130%'}
                // width={'130%'}