import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { uniqYears } from 'components/items.js';

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
    // size: 0.48,
    size: .03,
    // years: []
  };

  render() {
    const pos = this.props.mbBetweenElemsPos;
    const size = this.props.size;
    const yearsElems = uniqYears.map((item, idx) => 
      <p key={`mindball_${item}`} className={(this.props.currentYear === item) ? styles.year_active : styles.year}
        onClick={() => this.props.onYearClick(idx, true)}
        style={pos && {
          position: 'absolute',
          top: (!this.props.isMobile)
            ? `${pos[idx] * size + 1 - ((8 + 4) * size)}em`
            : 0,
          left: (!this.props.isMobile)
            ? 0
            : (idx === uniqYears.length - 1)
              ? `${pos[idx] * size + 1 - ((8 + 4) * size) - 1.8}em`
              : `${pos[idx] * size + 1 - ((8 + 4) * size) - 1.3}em`
        }}>
        {item}
      </p>
    );
    const betweenRounds = new Array((this.props.isEvents) ? uniqYears.length : 1).fill(null).map((item, idx) => 
      <div key={`mindballRoundInBetween_${(uniqYears.length) ? idx : ''}`} className={styles.roundInBetween}
        onClick={() => this.props.onYearClick(idx, true)}
        style={pos && { 
          position: 'absolute',
          top: (this.props.isMobile) ? '' : `${pos[idx]}em`,
          left: (this.props.isMobile) ? `${pos[idx]}em` : '' }} ></div>
    );
    return (
      <div className={(this.props.isEvents) ? styles.Mindball_events : styles.Mindball}
        style={{ fontSize: `${size}rem`, zIndex: this.props.zIndex, opacity: this.props.opacity }}>
        <div className={styles.yearsWrapper}>
          <p className={(this.props.currentYear) ? styles.year : styles.year_active} onClick={() => this.props.onYearClick(-1, true)}>Story</p>
          {this.props.isEvents && yearsElems}
        </div>
        <div className={styles.inner}>
          <div className={styles.ball} style={{
            top: (this.props.isMobile) ? '' : `${this.props.position}em`,
            left: (this.props.isMobile) ? `${this.props.position}em` : '' }}></div>
          <div className={styles.line}></div>
          <div className={styles.roundUtmost}></div>
          {betweenRounds}
          <div className={styles.roundUtmost}></div>
        </div>
      </div>
    );
  }
}