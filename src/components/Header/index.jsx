import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import styles from './styles.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isSandwich: true,
      // bg: 'http://localhost:8080/assets/img/Menu.svg'
    };
  }

  onClick = () => {
    this.setState(prevState => ({isSandwich: !prevState.isSandwich}));
    this.props.onMenuClick();
    /*if (this.state.isSandwich) {
      this.setState({bg: 'http://localhost:8080/assets/img/Menu.svg'});
    } else {
      this.setState({bg: 'http://localhost:8080/assets/img/Close.svg'});
    }*/


    /*let className = cx(styles.sandwich, {
      [styles.menu]: !this.state.isSandwich
      [styles.dummyClass]: !!this.props.dummyClass,
    });*/
  };

  render() {
    return (
      <header>
        <div className={styles.logo}></div>
        <p className={styles.title} style={{opacity: (this.props.events) ? 1 : 0}}>Events</p>
        <div onClick={this.onClick} className={this.state.isSandwich ? styles.sandwich : styles.menu}></div>
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