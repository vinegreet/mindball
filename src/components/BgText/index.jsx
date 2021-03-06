import React from 'react';
import styles from './styles.css';
import img from 'img/bgMindball.png';

export default function BgText({ isMobile, text }) {
  const { BgText, inner, mindball } = styles;
  return (
    <div className={BgText}>
        <div className={mindball} style={{opacity: !text ? 1 : 0}}></div>
        <p className={inner} style={{
          opacity: text ? 1 : 0,
          font: (isNaN(parseInt(text))) ? '' : (isMobile)
            ? `900 22rem/1 'Source Code Pro', monospace`
            : `900 25rem/1 'Source Code Pro', monospace`
        }}>{text}</p>
    </div>
  );
}