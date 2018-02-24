import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Mindball extends Component {

  static propTypes = {
    position: PropTypes.number, 
    isVertical: PropTypes.bool, 
    size: PropTypes.number
  };

  static defaultProps = {
    position: 0, 
    isVertical: true, 
    size: 0.48
  };

  // const $ball = document.getElementsByClassName(styles.ball)[0];

  render() {
    // const initialBallPos = 29;
    return (
      <div className={`${styles.wrapper} _desk`} style={{fontSize: `${this.props.size}px`}}>
        <div className={styles.Mindball}>
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