import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import OpenEvent from 'components/OpenEvent';
import Copyright from 'components/Copyright';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenEvent: false
    };
    this.ticking = false;
    this.defaultBallPosition = 18;
    this.wheel = 0;
  }

  selectEvent = (delta, keyDown) => {
    // if (this.props.listPos === 0 && delta < 0) {
    const currYrIdx = this.props.uniqYears.indexOf(this.props.currentYear); // Take the currYearIdx prop from App, which will have according state
    if (currYrIdx === 0 && delta < 0) {
      this.props.toggleStoryAndEvents();
      return this.ticking = false;
    }
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        /*if (this.state.scrollEventsList > -(this.items.length * this.listItemHeight - numberOfListItemsVisible * this.listItemHeight)) {
          this.setState(prev => ({ scrollEventsList: prev.scrollEventsList - this.listItemHeight }));
        }*/
        console.log(currYrIdx, this.props.uniqYears.length - 1);
        if (currYrIdx < this.props.uniqYears.length - 1) {
          this.props.changeYear(currYrIdx + 1);
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        /*if (this.state.scrollEventsList < 0) {
          this.setState(prev => ({ scrollEventsList: prev.scrollEventsList + this.listItemHeight }));
        }*/
        if (currYrIdx > 0) {
          this.props.changeYear(currYrIdx - 1);
        }
        this.wheel = 0;
      }
    }
    /*if (this.props.listPos === (this.items.length - 1) && delta > 0) return this.ticking = false;
    if (delta > 0 && this.props.listPos !== (this.items.length - 4)) {
      this.props.changeYear(this.props.listPos + 1);
    } else if (delta < 0 && this.props.listPos !== 3) {
      this.props.changeYear(this.props.listPos - 1);
    }
    this.props.selectEventOnScroll(delta, keyDown);*/
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
    this.$slider.slickGoTo(0, true);
    // !this.props.isOpenEvent && this.$slider.slickPlay;
    this.props.toggleOpenEvent();
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
        // !this.props.isOpenEvent && this.toggleOpenEvent();
        this.props.isEvents && this.toggleOpenEvent();
        break;
      case 'Backspace':
        this.props.isOpenEvent && this.toggleOpenEvent();
        break;
      case 'Escape':
        this.props.isOpenEvent && this.toggleOpenEvent();
        break;
      default:
        return;
    }
  }

  handleListItemClick = (idx, isMouseOver) => {
    // this.props.listPos === idx && this.toggleOpenEvent
    // setTimeout(() => this.props.onInactiveListItemClick(idx), 250);
    if (!isMouseOver) {
      this.openEventCoolDown = true;
      setTimeout(() => {this.openEventCoolDown = false;}, 500);
    }
    !this.openEventCoolDown && this.props.onInactiveListItemClick(idx, false, true);
    // !isMouseOver && setTimeout(this.toggleOpenEvent, 250);
    !isMouseOver && this.toggleOpenEvent();
  }

  render() {
    const uniqYears = this.props.uniqYears;
    const currentYear = this.props.currentYear || uniqYears[0];
    this.items = this.props.content.events;
    const titles = this.items.map(item => item.fields.title);
    const eventLists = uniqYears.map(uniqYr => {
      const evtList = [];
      titles.forEach((title, idx) => {
        if (this.props.years[idx] === uniqYr) evtList.push(
          <div key={title} className={(this.props.listPos === idx) ? styles.listItem_selected : styles.listItem}
            onMouseOver={() => {this.handleListItemClick(idx, true)}} style={{ height: `${this.props.listItemHeight}rem` }}
            onClick={() => {this.handleListItemClick(idx)}}>
            <p className={styles.listItemTitle}>{title}</p>
            <div className={styles.line}></div>
            <div className={styles.arrow}></div>
          </div>
        );
      });
      return (
        <div key={uniqYr + '-list'} className={styles.list}>
          {evtList}
        </div>
      );
    });
    
    return (
      <section className={styles.Events} onWheel={this.props.isEvents && !this.props.isOpenEvent && this.handleWheel || undefined}
        onKeyDown={this.handleKeyDown} tabIndex='0' ref={$el => this.props.getEventsElem($el)} >
        <Story content={this.props.content.story} selectFromStoryToEvents={this.props.selectFromStoryToEvents}
          opacity={(this.props.isStory && !this.props.isOpenEvent) ? 1 : 0} zIndex={(this.props.isStory) ? 10 : -1}
          isStory={this.props.isStory} isMobile={this.props.isMobile} cooldown={this.props.cooldownStory} />
        {this.props.isMobile && <p className={styles.titleMobile}>Events {currentYear}</p>}
        <div className={styles.listWrapper}
          style={{ opacity: (this.props.isEvents && !this.props.isOpenEvent) ? 1 : 0, zIndex: (this.props.isEvents) ? 10 : -1 }}>
          <div className={styles.listInner} style={{ left: -uniqYears.indexOf(currentYear) * 100 + '%' }}>
            {eventLists}
          </div>
        </div>
        <Mindball position={(this.props.isStory) ? this.defaultBallPosition : this.props.ballPos} isEvents={true}
          currentYear={this.props.isEvents && this.props.currentYear} size={this.props.mbFontSize} uniqYears={uniqYears}
          mbBetweenElemsPos={this.props.mbBetweenElemsPos} isMobile={this.props.isMobile} onYearClick={this.props.onMbYearClick}
          opacity={(this.props.isOpenEvent && this.props.isMobile) ? 0 : 1} zIndex={(this.props.isOpenEvent && this.props.isMobile) ? -1 : 11} />
        {!this.props.isMobile && <Copyright opacity={(!this.props.isOpenEvent && this.props.listPos === (this.items.length - 1)) ? 1 : 0}
          zIndex={(!this.props.isOpenEvent && this.props.listPos === (this.items.length - 1)) ? 10 : -1} />}
        <OpenEvent content={this.props.content} opacity={(this.props.isOpenEvent) ? 1 : 0} zIndex={(this.props.isOpenEvent) ? 10 : -1}
          currentEvent={this.props.listPos} closeEvent={this.toggleOpenEvent} getSlider={($slider, idx) => {
            this.$slider = $slider;
            this.props.getSlider(this.$slider);
          }} />
      </section>
    );
  }
}