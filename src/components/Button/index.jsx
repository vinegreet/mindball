import React from 'react';
import styles from './styles.css';

export default function Button(props) {
  return (
    <div className={styles.Button} onClick={props.onButtonClick} style={{ letterSpacing: (props.caption === 'Events') ? '0.18rem' : '' }} >
      <p>{props.caption}</p>
    </div>
  );
}