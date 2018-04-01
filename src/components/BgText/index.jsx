import React from 'react';
import styles from './styles.css';
import img from 'img/bgMindball.png';

export default function BgText(props) {
  return (
    <div className={styles.BgText}
      style={{
        // backgroundImage: props.isInitial && `url('${img}')`,
        // zIndex: props.isInitial ? 0 : 2,
        // opacity: props.isInitial ? 1 : 0
      }}>
        <div className={styles.mindball} style={{opacity: props.isInitial ? 1 : 0}}></div>
        <p className={styles.inner} style={{opacity: props.isInitial ? 0 : 1}}>{props.text}</p>
    </div>
  );
}