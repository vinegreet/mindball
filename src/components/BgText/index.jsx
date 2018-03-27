import React from 'react';
import styles from './styles.css';
import img from 'img/bgMindball.png';

export default function BgText(props) {
  return (
    <div className={styles.BgText}
      style={{
        backgroundImage: props.isInitial && `url('${img}')`,
        zIndex: props.isInitial ? 0 : 2
      }}>
        <p className={styles.inner}>{props.text}</p>
    </div>
  );
}