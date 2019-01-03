import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Mindball extends Component {

  static propTypes = {
    isEvents: PropTypes.bool,
    position: PropTypes.number,
    size: PropTypes.number,
    uniqYears: PropTypes.array
  };

  static defaultProps = {
    isEvents: false,
    position: 0,
    size: 0.028,
    uniqYears: []
  };

  render() {
    const { currentYear, isEvents, isMobile, mbBetweenElemsPos, onYearClick, opacity, position, shift, size, uniqYears, zIndex } = this.props;
    const { ball, inner, line, Mindball, Mindball_events, roundInBetween, roundUtmost, year, year_active, yearsWrapper } = styles;
    const pos = mbBetweenElemsPos;
    const yearsElems = uniqYears.map((item, idx) => 
      <p key={`mindball_${item}`} className={(currentYear === item) ? year_active : year}
        onClick={() => this.props.onYearClick(idx)}
        style={pos && {
          position: 'absolute',
          top: (!isMobile)
            ? `${pos[idx] * size + 1 - ((8 + 4) * size)}em`
            : 0,
          left: (!isMobile)
            ? 0
            : (idx === uniqYears.length - 1)
              ? `${pos[idx] * size + 1 - ((8 + 4) * size) - 1.8}em`
              : `${pos[idx] * size + 1 - ((8 + 4) * size) - 1.3}em`
        }}>
        {item}
      </p>
    );
    const betweenRounds = new Array((isEvents) ? uniqYears.length : 1).fill(null).map((item, idx) =>
      <div key={`mindballRoundInBetween_${(uniqYears.length) ? idx : ''}`} className={roundInBetween}
        onClick={() => onYearClick(idx)}
        style={pos && { 
          position: 'absolute',
          top: (isMobile) ? '' : `${pos[idx]}em`,
          left: (isMobile) ? `${pos[idx]}em` : '' }} ></div>
    );
    return (
      <div className={(isEvents) ? Mindball_events : Mindball}
        style={{
          fontSize: `${size}rem`,
          zIndex: zIndex,
          opacity: opacity,
          bottom: (shift)
            ? 0
            : '' }}>
        <div className={yearsWrapper}>
          <p className={(currentYear) ? year : year_active} onClick={() => onYearClick(-1, true)}>Story</p>
          {isEvents && yearsElems}
        </div>
        <div className={inner}>
          <div className={ball} style={{
            top: (isMobile) ? '' : `${position}em`,
            left: (isMobile) ? `${position}em` : '' }}></div>
          <div className={line}></div>
          <div className={roundUtmost}></div>
          {betweenRounds}
          <div className={roundUtmost}></div>
        </div>
      </div>
    );
  }
}
