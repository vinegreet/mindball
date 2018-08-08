import React from 'react';
import styles from './styles.css';
import Lottie from 'react-lottie';
import * as animationData1 from './Dots1.json';
import * as animationData2 from './Dots2.json';

let initialWindowWidth;

export default function Bubbles({ opacity, shift, top, wWidth }) {

  const options = data => {return {
    loop: true,
    autoplay: true, 
    animationData: data
  }};

  // if (!initialWindowWidth && shift[0]) initialWindowWidth = wWidth;
  // if (!initialWindowWidth && shift) console.log(initialWindowWidth);

  console.log(shift)

  return (
    <div className={styles.Bubbles}
      style={{
        // marginTop: (initialWindowWidth && shift) ? `calc(4vw + ${(initialWindowWidth - wWidth) / 1.2}px` : '',
        marginTop: (!shift) ? '' : (shift[0])
          ? `calc(120px - 5vw)`
          : (shift[1])
            ? `calc(120px - 2vw)`
            : '',
        opacity: opacity,
        top: `${parseInt(top) + 4 /*7*/}%`
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