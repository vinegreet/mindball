import React from 'react';
import { Route } from 'react-router-dom';
import PostsIndex from 'components/Inside';
import styles from './styles.css';

export default function App() {
  return <section className={styles.app}>
    <div className={styles.wrapper}>
      <Route exact path="/" component={PostsIndex} />
    </div>
  </section>
  ;
}