import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';

export default class Story extends Component {
  constructor() {
    super();
    this.state = {};
  }

  
  onScroll = e => {
  };

  render() {
    
    return (
      <section className={styles.Story} onWheel={this.onScroll} style={{opacity: this.props.opacity}} >
        <div className={styles.outerWrapper}>
          <div className={styles.wrapper}>
            <h1>Story</h1>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.
            </p>
          </div>
          <Button caption='Events' onButtonClick={this.props.onButtonClick} />
        </div>
        {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
      </section>
    );
  }
}