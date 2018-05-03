import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import { titles, texts, photos } from 'components/items.js';

export default class OpenEvent extends Component {
  constructor() {
    super();
    this.state = {
      currentMedia: 0
    };
  }

  onScroll = e => {
  };

  render() {
    // console.log(this.state.ballPosition);
    return (
      <div className={styles.OpenEvent} style={{ opacity: this.props.opacity }} >
        <div className={styles.gallery}>
          <div className={styles.pager}>
            <div className={styles.dot_active}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
        <div className={styles.article}>
          <h2 className={styles.title}>Ericsson Ukraine New Year</h2>
          <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.</p>
          <Button caption='Back' onButtonClick={this.props.closeEvent} />
        </div>
      </div>
    );
  }
}
//  style={{height: `${this.props.height}px`}}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />