import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import styles from './styles.css';
import img from 'img/Logo.png';

export default function Header(props) {
  return (
    <header>
      <div className={styles.logo} style={{ cursor: (props.isEvents) ? 'pointer' : 'default' }}>
        <img src={img} alt='Mindball' onClick={props.onLogoClick} />
      </div>
      <p className={styles.title} style={{ opacity: (props.events) ? 1 : 0 }}>Events</p>
      <div onClick={props.onSandwichClick} className={styles.sandwichWrapper}>
        <div className={!props.isMenuOpen ? styles.sandwich : styles.menu}></div>
      </div>
    </header>
  );
}