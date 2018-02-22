import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Header extends Component {

  /*static propTypes = {};
  static defaultProps = {};*/

  render() {
    return (
    <div className={styles.wrapper}>
      <div className={styles.InitialMindball}>
        <div className={styles.ball} style={{}}></div>
        <div className={styles.line}></div>
        <div className={styles.bigRound}></div>
        <div className={styles.smallRound}></div>
        <div className={styles.bigRound}></div>
      </div>
    </div>
    );
  }
}