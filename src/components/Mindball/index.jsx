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
      <p key={item} className={styles.year} style={{color: (this.props.currentYear === item) ? '#fff' : 'rgba(169,169,169,0.3)'}}>{item}</p>
    );
    const betweenRounds = new Array(this.props.years.length || 1).fill(null).map((item, idx) => 
      <div key={`roundInBetween${!!this.props.years.length && idx}`} className={styles.roundInBetween}></div>
    );
    return (
      <div className={(this.props.years.length) ? styles.Mindball_events : styles.Mindball} style={{fontSize: `${this.props.size}px`}}>
        <div className={styles.yearsWrapper}>
          <p className={styles.year} style={{color: (this.props.currentYear) ? 'rgba(169,169,169,0.3)' : '#fff'}}>Story</p>
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