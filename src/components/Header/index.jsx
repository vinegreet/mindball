import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import styles from './styles.css';
import img from 'img/Logo.png';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isSandwich: true
    };
  }

  onClick = () => {
    this.setState(prevState => ({isSandwich: !prevState.isSandwich}));
    this.props.onMenuClick();
    /*let className = cx(styles.sandwich, {
      [styles.menu]: !this.state.isSandwich
      [styles.dummyClass]: !!this.props.dummyClass,
    });*/
  };

  render() {
    return (
      <header>
        <div className={styles.logo}>
          <img src={img} alt='Mindball' />
        </div>
        <p className={styles.title} style={{opacity: (this.props.events) ? 1 : 0}}>Events</p>
        <div onClick={this.onClick} className={styles.sandwichWrapper}>
          <div className={this.state.isSandwich ? styles.sandwich : styles.menu}></div>
        </div>
      </header>
    );
  }
}

/*          style={{
              backgroundImage: `url(${this.state.isSandwich
                ? 'http://localhost:8080/assets/img/Menu.svg'
                : 'http://localhost:8080/assets/img/Close.svg'
              })`
            }}*/