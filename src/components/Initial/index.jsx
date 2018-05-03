import React, { Component } from 'react';
import styles from './styles.css';
import Mindball from 'components/Mindball';
import Button from 'components/Button';

export default class Initial extends Component {
  constructor() {
    super();
    this.state = {
      ballPosition: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.defaultBallPosition = 24;
    // this.defaultBallPosition = 28;
  }

  
  handleWheel = e => {
    const statePos = this.state.ballPosition;
    const defPos = this.defaultBallPosition;
    const finish = (this.isFirefox) ? 1062 : 1060;
    const sensitivity = (this.isFirefox) ? 0.12 : 4;
    if (statePos === finish) return;
    if (statePos < defPos) this.setState({ballPosition: defPos});
    let ballPos = statePos + e.deltaY / sensitivity;
    if (ballPos < defPos) return;
    ballPos = (ballPos < finish) ? ballPos : finish;
    if (ballPos === finish) this.props.onBallFinished();
    this.setState({ballPosition: ballPos});
  };

  render() {
    // console.log(this.state.ballPosition);
    return (
      <section className={`${styles.Initial} _desk`} onWheel={this.handleWheel}>
        <Mindball position={this.state.ballPosition || this.defaultBallPosition} isInitial={true} />
        <Button caption='Scroll down' onButtonClick={this.props.onButtonClick} />
      </section>
    );
  }
}
//  style={{height: `${this.props.height}px`}}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />