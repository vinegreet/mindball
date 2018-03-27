import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Mindball extends Component {

  static propTypes = {
    position: PropTypes.number,
    size: PropTypes.number,
    isInitial: PropTypes.bool,
    years: PropTypes.array
  };

  static defaultProps = {
    position: 0,
    // size: 0.3,
    size: 0.48,
    years: []
  };

  render() {
    const years = this.props.years.map((item, idx) => 
      <p key={item} className={styles.year}>item</p>
    );
    const betweenRounds = new Array(this.props.years.length || 1).fill(null).map((item, idx) => 
      <div key={`roundInBetween${!this.props.years && idx}`} className={styles.roundInBetween}></div>
    );
    return (
      <div className={styles.Mindball} style={{fontSize: `${this.props.size}px`}}>
        <div className={styles.years}>
          {years}
        </div>
        <div className={styles.inner}>
          <div className={styles.ball} style={{top: `${this.props.position}em`}}></div>
          <div className={styles.line}></div>
          <div className={styles.roundUtmost}></div>
          {betweenRounds}
          <div className={styles.roundUtmost}></div>
        </div>
      </div>
    );
  }
}