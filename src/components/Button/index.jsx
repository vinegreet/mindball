import React from 'react';
import styles from './styles.css';

export default function Button({ caption, isEvent, isInitial, onButtonClick }) {
  const { Button, Button_Events, Button_Story } = styles;
  return (
    <div className={(isInitial) ? Button : ((isEvent) ? Button_Events : Button_Story)}
    	onClick={onButtonClick} style={{ letterSpacing: (caption === 'Events') ? '0.18rem' : '' }} >
      <p>{caption}</p>
    </div>
  );
}
