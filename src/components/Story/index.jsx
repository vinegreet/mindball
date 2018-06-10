import React from 'react';
import styles from './styles.css';
import Button from 'components/Button';

let isScrolled;

export default function Story(props) {

  const isReady = 'fields' in props.content;

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') { props.isStory && props.selectFromStoryToEvents(); }
  }

  return (
    <section className={styles.Story} onWheel={e => {
        if (props.isStory && !isScrolled && e.deltaY > 0 && !props.cooldown) {
          props.selectFromStoryToEvents();
          isScrolled = true;
          setTimeout(() => {isScrolled = false;}, 500);
        }
      }} onKeyDown={handleKeyDown} tabIndex='0' style={{ opacity: props.opacity, zIndex: props.zIndex }}>
      <div className={styles.outerWrapper}>
        <article className={styles.wrapper}>
          <h1>{isReady && props.content.fields.title}</h1>
          <p className={styles.text}>
            {isReady && props.content.fields.text}
          </p>
          {/*Do it with CSS*/!props.isMobile && <Button caption='Events' onButtonClick={props.selectFromStoryToEvents} />}
          {/*props.isMobile && <p className={styles.swipeRight}>To see the <span className={styles.swipeRightOrangeText}>Events</span> – <span className={styles.swipeRightOrangeText}>scroll right</span>.</p>*/}
        </article>
      </div>
      {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
    </section>
  );
}