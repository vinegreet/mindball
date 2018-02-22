import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class InitialMindball extends Component {

  static propTypes = {
    position: PropTypes.number, 
    isVertical: PropTypes.bool, 
    size: PropTypes.string
  };

  static defaultProps = {
    position: 0, 
    isVertical: true, 
    size: 'STYLE?'
  };

  // const $ball = document.getElementsByClassName(styles.ball)[0];

  render() {
    // const initialBallPos = 29;
    return (
    <div className={styles.wrapper}>
      <div className={styles.InitialMindball}>
        <div className={styles.ball} style={{top: `${this.props.position}em`}}></div>
        <div className={styles.line}></div>
        <div className={styles.bigRound}></div>
        <div className={styles.smallRound}></div>
        <div className={styles.bigRound}></div>
      </div>
    </div>
    );
  }
}