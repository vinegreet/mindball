import React, { Component } from 'react';
import styles from './styles.css';
import Header from 'components/Header';
import Mindball from 'components/Mindball';
import Button from 'components/Button';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ballPosition: 0
    };
    this.defaultBallPosition = 28;
    this.onScroll = this.onScroll.bind(this);
  }

  
  onScroll(e) {
    const statePos = this.state.ballPosition;
    const stateDef = this.defaultBallPosition;
    const finish = 1055;
    const sensitivity = 4;
    if (statePos === finish) {return;}
    if (statePos < stateDef) this.setState({ballPosition: stateDef});
    let ballPos = statePos + e.deltaY / sensitivity;
    if (ballPos < stateDef) return;
    ballPos = (ballPos < finish) ? ballPos : finish;
    if (ballPos === finish) {
      this.props.onBallFinished();
    }
    this.setState({ballPosition: ballPos});
  }

  render() {
    // console.log(this.state.ballPosition);
    return (
      <section className={`${styles.Initial} _desk`} onWheel={this.onScroll}>
        <div className={styles.bubbles}></div>
        <Header />
        <Mindball position={this.state.ballPosition || this.defaultBallPosition} />
        <Button caption='Scroll down' onButtonClick={this.props.onButtonClick} />
      </section>
    );
  }
}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />