import React from 'react';
import styles from './styles.css';
import Button from 'components/Button';

let isScrolled;

export default function Story({ content, cooldown, isMobile, isStory, opacity, selectFromStoryToEvents, zIndex }) {
  const { text, title } = content.fields;
  const isReady = 'fields' in content;

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') { isStory && selectFromStoryToEvents(); }
  }

  return (
    <section className={styles.Story} onWheel={e => {
        if (isStory && !isScrolled && e.deltaY > 0 && !cooldown) {
          selectFromStoryToEvents(false, true);
          isScrolled = true;
          setTimeout(() => {isScrolled = false;}, 500);
        }
      }} onKeyDown={handleKeyDown} tabIndex='0' style={{ opacity: opacity, zIndex: zIndex }}>
      <div className={styles.outerWrapper}>
        <article className={styles.wrapper}>
          <h1>{isReady && title}</h1>
          <p className={styles.text}>
            {isReady && text}
          </p>
          {/*Do it with CSS*/!isMobile && <Button caption='Events' onButtonClick={selectFromStoryToEvents} />}
          {isMobile && <p className={styles.swipeRight}>To see the <span className={styles.swipeRightOrangeText}>Events</span> – <span className={styles.swipeRightOrangeText}>scroll right</span>.</p>}
        </article>
      </div>
    </section>
  );
}
