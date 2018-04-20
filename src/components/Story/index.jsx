import React from 'react';
import styles from './styles.css';
import Button from 'components/Button';

let isScrolled;

export default function Story(props) {
  return (
    <section className={styles.Story} onWheel={e => {
      if (props.isStory && !isScrolled && e.deltaY > 0) {
        props.onWheelDown();
        isScrolled = true;
        setTimeout(() => {isScrolled = false;}, 500);
      }
    }} style={{opacity: props.opacity, zIndex: props.zIndex}} >
      <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
          <h1>Story</h1>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.
          </p>
        </div>
        <Button caption='Events' onButtonClick={props.onButtonClick} />
      </div>
      {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
    </section>
  );
}