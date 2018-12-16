import React from 'react';
import styles from './styles.css';
import img from 'img/Idea_Logo.svg';

export default function Copyright({ opacity, zIndex }) {
  const { Copyright, idea, text } = styles;
  return (
    <div className={Copyright} style={{ zIndex: zIndex, opacity: opacity }}>
        <div className={text}>
          <p>© {new Date().getFullYear()} Mindball Ukraine.</p>
          <p>All Rights Reserved. Powered by Contentful.</p>
        </div>
        <div className={idea}>
          <a href='http://ideaua.com/' target='_blank'>
            <img src={img} alt='Idea' />
          </a>
        </div>
    </div>
  );
}