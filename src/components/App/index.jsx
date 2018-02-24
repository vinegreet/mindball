import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import Header from 'components/Header';
import Mindball from 'components/Mindball';
import Inside from 'components/Inside';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ballPosition: 28
    };
    this.onScroll = this.onScroll.bind(this);
  }

  
  onScroll(e) {
    const sensitivity = 4;
    const finish = 1055;
    let ballPos = this.state.ballPosition + e.deltaY / sensitivity;
    if (ballPos < 27) return;
    ballPos = (ballPos < finish) ? ballPos : finish;
    this.setState({
      ballPosition: ballPos
    });
  }

  render() {
    return <section className={styles.app} onWheel={this.onScroll}>
      <div className={styles.wrapper}>
        <Header />
        <Mindball position={this.state.ballPosition} />
        <div className={styles.btn}>
          <p>Scroll down</p>
        </div>
      </div>
    </section>;
  }
}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />
// <Route exact path="/" component={Inside} />
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>