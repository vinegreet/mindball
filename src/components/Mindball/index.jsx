import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { years } from 'components/items.js';
// const $years = {};

export default class Mindball extends Component {

  static propTypes = {
    isEvents: PropTypes.bool,
    position: PropTypes.number,
    size: PropTypes.number,
    // years: PropTypes.array
  };

  static defaultProps = {
    isEvents: false,
    position: 0,
    // size: 0.3,
    size: 0.48,
    // years: []
  };

  render() {
    const yearsElems = years.map((item, idx) => 
      <p key={item} className={styles.year} style={{color: (this.props.currentYear === item) ? '#fff' : 'rgba(169,169,169,0.3)'}}>{item}</p>
    );
    const betweenRounds = new Array((this.props.isEvents) ? years.length : 1).fill(null).map((item, idx) => 
      <div key={`roundInBetween${(years.length) ? idx : ''}`} className={styles.roundInBetween}
        ref={$el => !this.props.isInitial && this.props.getBetweenElems($el, idx)}></div>
    );
    return (
      <div className={(this.props.isEvents) ? styles.Mindball_events : styles.Mindball} style={{fontSize: `${this.props.size}px`}}>
        <div className={styles.yearsWrapper}>
          <p className={styles.year} style={{color: (this.props.currentYear) ? 'rgba(169,169,169,0.3)' : '#fff'}}>Story</p>
          {this.props.isEvents && yearsElems}
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