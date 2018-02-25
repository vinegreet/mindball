import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import Initial from 'components/Initial';
import Inside from 'components/Inside';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isBallFinished: false,
      isInitialButtonClicked: false
    };
    this.onBallFinished = this.onBallFinished.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  
  onBallFinished() {
    console.log('roger, finished');
    this.setState({isBallFinished: true});
  }

  onButtonClick() {
    console.log('click');
    this.setState({isInitialButtonClicked: true});
  }

  render() {
    return <div className={styles.App}>
      <div className={styles.wrapper}>
        <Initial onBallFinished={this.onBallFinished} onButtonClick={this.onButtonClick} />
      </div>
    </div>;
  }
}
// <Route exact path="/" component={Inside} />
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>