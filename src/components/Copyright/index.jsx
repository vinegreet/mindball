import React from 'react';
import styles from './styles.css';
import img from 'img/Idea_Logo.svg';

export default function Copyright(props) {
  return (
    <div className={styles.Copyright} style={{ zIndex: props.zIndex, opacity: props.opacity }}>
        <div className={styles.text}>
          <p>© {new Date().getFullYear()} Mindball Ukraine. All Rights Reserved.</p>
          <p>Powered by Contentful</p>
        </div>
        <div className={styles.idea}>
          <a href='http://ideaua.com/' target='_blank'>
            <img src={img} alt='Idea' />
          </a>
        </div>
    </div>
  );
}