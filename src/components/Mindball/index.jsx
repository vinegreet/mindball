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
    const yearsElems = uniqYears.map((item, idx) => 
      <p key={`mindball_${item}`} className={styles.year} 
        style={{
          color: (this.props.currentYear === item) ? '#fff' : 'rgba(169,169,169,0.3)',
          position: (this.props.mbBetweenElemsPos) ? 'absolute' : '',
          top: (this.props.mbBetweenElemsPos) ? `${this.props.mbBetweenElemsPos[idx] * this.props.size + 1 - ((8 + 4) * this.props.size)}em` : '',
          left: (this.props.mbBetweenElemsPos) ? 0 : ''
        }}>
        {item}
      </p>
    );
    const betweenRounds = new Array((this.props.isEvents) ? uniqYears.length : 1).fill(null).map((item, idx) => 
      <div key={`mindballRoundInBetween_${(uniqYears.length) ? idx : ''}`} className={styles.roundInBetween}
        style={this.props.mbBetweenElemsPos && { position: 'absolute', top: `${this.props.mbBetweenElemsPos[idx]}em` }} ></div>
    );
    return (
      <div className={(this.props.isEvents) ? styles.Mindball_events : styles.Mindball} style={{fontSize: `${this.props.size}rem`}}>
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