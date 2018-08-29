import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import img from 'img/Logo.png';

export default function Header({ events, isEvents, isMenuOpen, onLogoClick, onSandwichClick, smallWindow }) {

  const { logo, menu, sandwich, sandwichWrapper, title } = styles;

  return (
    <header style={{ height: (smallWindow) ? '18vh' : '' }}>
      <div className={logo} style={{ cursor: (isEvents) ? 'pointer' : 'default', width: (smallWindow) ? 'calc(14vh + 14vw)' : '' }}>
        <img src={img} alt='Mindball' onClick={onLogoClick} style={{ width: (smallWindow) ? 'calc(10vh + 10vw)' : '' }} />
      </div>
      <p className={title} style={{ opacity: (events && !smallWindow) ? 1 : 0 }}>Events</p>
      <div className={sandwichWrapper} onClick={onSandwichClick} style={{ opacity: (smallWindow) ? 0 : '' }}>
        <div className={!isMenuOpen ? sandwich : menu}></div>
      </div>
    </header>
  );
}
