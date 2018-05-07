import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import items, { titles } from 'components/items.js';
import OpenEvent from 'components/OpenEvent';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenEvent: false
    };
    this.ticking = false;
    this.defaultBallPosition = 18;
  }

  selectEvent = (delta, keyDown) => {
    if (this.props.listPos === 0 && delta < 0) {
      this.props.toggleStoryAndEvents();
      return this.ticking = false;
    }
    if (this.props.listPos === (items.length - 1) && delta > 0) return this.ticking = false;
    if (delta > 0) {
      this.props.changeYear(this.props.listPos + 1);
    } else {
      this.props.changeYear(this.props.listPos - 1);
    }
    this.props.selectEvent(delta, keyDown);
    this.ticking = false;
  }

  handleWheel = e => {
    if (!this.ticking) {
      const delta = e.deltaY;
      requestAnimationFrame(() => this.selectEvent(delta));
      this.ticking = true;
    }
  }

  toggleOpenEvent = () => {
    this.setState(prev => ({ isOpenEvent: !prev.isOpenEvent }));
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        /*if (this.props.isStory) {
          this.props.toggleStoryAndEvents();
          // this.setState({ isOpenEvent: false });
        } else {
          // this.props.isEvents && this.selectEvent(100, true);
          this.selectEvent(100, true);
        }*/
        this.props.isEvents && this.selectEvent(100, true);
        break;
      case 'ArrowUp':
        if (this.props.listPos === 0) {
          this.props.isEvents && this.props.toggleStoryAndEvents();
          this.setState({ isOpenEvent: false });
        } else {
          this.selectEvent(-100, true);
        }
        // this.props.isEvents && this.selectEvent(-100, true);
        break;
      case 'Enter':
        // !this.state.isOpenEvent && this.toggleOpenEvent();
        this.props.isEvents && this.toggleOpenEvent();
        break;
      case 'Backspace':
        this.state.isOpenEvent && this.toggleOpenEvent();
        break;
      case 'Escape':
        this.state.isOpenEvent && this.toggleOpenEvent();
        break;
      default:
        return;
    }
  }

  render() {
    const events = titles.map((item, idx) => 
      <div key={item} className={(this.props.listPos === idx) ? styles.listItem_selected : styles.listItem}
        ref={'listItem' + idx}
        onClick={this.props.listPos === idx && this.toggleOpenEvent || undefined}>
        <p className={styles.text}>{item}</p>
        <div className={styles.line}></div>
        <div className={styles.arrow}></div>
      </div>
    );
    
    return (
      <section className={styles.Events} onWheel={this.props.isEvents && !this.state.isOpenEvent && this.handleWheel || undefined}
        onKeyDown={this.handleKeyDown} tabIndex='0' ref={$el => this.$el = $el}>
        <Story selectFromStoryToEvents={this.props.selectFromStoryToEvents}
          opacity={(this.props.isStory && !this.state.isOpenEvent) ? 1 : 0} zIndex={(this.props.isStory) ? 10 : -1}
          isStory={this.props.isStory} />
        <div className={styles.list}
          style={{ opacity: (this.props.isEvents && !this.state.isOpenEvent) ? 1 : 0, zIndex: (this.props.isEvents) ? 10 : -1 }}>
          <div className={styles.listWrapper} style={{ top: this.props.scroll + 'rem' }}>
            {events}
          </div>
        </div>
        <Mindball position={(this.props.isStory) ? this.defaultBallPosition : this.props.ballPos} isEvents={true}
          currentYear={this.props.isEvents && this.props.currentYear} size={this.props.mbFontSize}
          getBetweenElems={this.props.getMbBetweenElems} />
        <OpenEvent opacity={(this.state.isOpenEvent) ? 1 : 0} zIndex={(this.state.isOpenEvent) ? 10 : -1}
          currentEvent={this.props.listPos} closeEvent={this.toggleOpenEvent} />
      </section>
    );
  }
}
// onButtonClick={this.handleSelectFromStoryToEvents} onWheelDown={this.handleSelectFromStoryToEvents}
    // this.mindballSize = 0.308;
    // this.mindballSize = 0.01875;
    // this.defaultBallPosition = 22;