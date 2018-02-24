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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log(this.state.isSandwich);
    this.setState(prevState => ({isSandwich: !prevState.isSandwich}));

    console.log(this.state.isSandwich);
    /*if (this.state.isSandwich) {
      this.setState({bg: 'http://localhost:8080/assets/img/Menu.svg'});
    } else {
      this.setState({bg: 'http://localhost:8080/assets/img/Close.svg'});
    }*/


    /*let className = cx(styles.sandwich, {
      [styles.menu]: !this.state.isSandwich
      [styles.dummyClass]: !!this.props.dummyClass,
    });*/
  }

  render() {
    return (
      <header>
        <div className={styles.logo}></div>
        {this.props.events && <p className={styles.title}>Events</p>}
        <div onClick={this.onClick}
          className={this.state.isSandwich
            ? [styles.sandwich]
            : [styles.sandwich, styles.menu].join(' ')}></div>
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