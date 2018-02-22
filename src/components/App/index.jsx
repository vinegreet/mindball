import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import Header from 'components/Header';
import InitialMindball from 'components/InitialMindball';
import Inside from 'components/Inside';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ballPosition: 29
    };
    this.onScroll = this.onScroll.bind(this);
  }

  
  onScroll(e) {
    const sensitivity = 4;
    const finish = 1055;
    let ballPos = this.state.ballPosition + e.deltaY / sensitivity;
    if (ballPos < 29) return;
    ballPos = (ballPos < finish) ? ballPos : finish;
    this.setState({
      ballPosition: ballPos
    });
  }

  render() {
    return <section className={styles.app} onWheel={this.onScroll}>
      <div className={styles.wrapper}>
        <Header />
        <InitialMindball position={this.state.ballPosition}/>
      </div>
    </section>;
  }
}
// <Route exact path="/" component={Inside} />
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>