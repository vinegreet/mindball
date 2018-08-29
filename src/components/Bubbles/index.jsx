import React from 'react';
import styles from './styles.css';
import Lottie from 'react-lottie';
import * as animationData1 from './Dots1.json';
import * as animationData2 from './Dots2.json';

let initialWidth;

export default function Bubbles({ opacity, top }) {

  const options = data => {return {
    loop: true,
    autoplay: true, 
    animationData: data
  }};

  return (
    <div className={styles.Bubbles}
      style={{
        opacity: opacity,
        top: `-${top + 4 /*7*/}%`
      }}>
        <Lottie options={options(animationData1)} title="Bubbles1" />
        <Lottie options={options(animationData2)} title="Bubbles2" />
    </div>
  );
}
