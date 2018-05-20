import React from 'react';
import styles from './styles.css';
import Button from 'components/Button';

let isScrolled;

export default function Story(props) {

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') { props.isStory && props.selectFromStoryToEvents(); }
  }

  return (
    <section className={styles.Story} onWheel={e => {
        if (props.isStory && !isScrolled && e.deltaY > 0) {
          props.selectFromStoryToEvents();
          isScrolled = true;
          setTimeout(() => {isScrolled = false;}, 500);
        }
      }} style={{ opacity: props.opacity, zIndex: props.zIndex }}
      onKeyDown={handleKeyDown} tabIndex='0'>
      <div className={styles.outerWrapper}>
        <article className={styles.wrapper}>
          <h1>Story</h1>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.
          </p>
          {/*Do it with CSS*/!props.isMobile && <Button caption='Events' onButtonClick={props.selectFromStoryToEvents} />}
          {/*props.isMobile && <p className={styles.swipeRight}>To see the <span className={styles.swipeRightOrangeText}>Events</span> – <span className={styles.swipeRightOrangeText}>scroll right</span>.</p>*/}
        </article>
      </div>
      {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
    </section>
  );
}