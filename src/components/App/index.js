import React from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import PostsIndex from 'components/Inside';
import InitialMindball from 'components/InitialMindball';

export default function App() {
  console.log(new Date().toLocaleTimeString());
  return <section className={styles.app}>
    <div className={styles.wrapper}>
      <InitialMindball />
      
    </div>
  </section>
  ;
}
//<Route exact path="/" component={PostsIndex} />