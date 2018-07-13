import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import OpenEvent from 'components/OpenEvent';
import Copyright from 'components/Copyright';

export default class Events extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      isOpenEvent: false
    };*/
    this.ticking = false;
    this.defaultBallPosition = 18;
    this.wheel = 0;
  }

/*  selectEvent = (delta, keyDown) => {
    const currYrIdx = this.props.uniqYears.indexOf(this.currentYear); // Take the currYearIdx prop from App, which will have according state
    if (currYrIdx === 0 && delta < 0) {
      this.props.toggleStoryAndEvents();
      return this.ticking = false;
    }
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta; // receive as prop
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        console.log(currYrIdx, this.props.uniqYears.length - 1);
        if (currYrIdx < this.props.uniqYears.length - 1) {
          this.props.changeYear(currYrIdx + 1);
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (currYrIdx > 0) {
          this.props.changeYear(currYrIdx - 1);
        }
        this.wheel = 0;
      }
    }
    this.ticking = false;
  }*/

  handleWheel = e => {
    if (!this.ticking) {
      const delta = e.deltaY;
      // requestAnimationFrame(() => this.selectEvent(delta));
      requestAnimationFrame(() => {
        this.props.selectEventsList(delta);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  toggleOpenEvent = () => {
    this.$slider.slickGoTo(0, true);
    // !this.props.isOpenEvent && this.$slider.slickPlay;
    this.openEventCoolDown = true;
    setTimeout(() => {this.openEventCoolDown = false;}, 500);
    this.props.toggleOpenEvent();
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        this.props.isEvents && this.selectEvent(100, true);
        break;
      case 'ArrowUp':
        if (this.props.listPos === 0) {
          this.props.isEvents && this.props.toggleStoryAndEvents();
          // this.setState({ isOpenEvent: false });
        } else {
          this.selectEvent(-100, true);
        }
        break;
      case 'Enter':
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
    /*if (!isMouseOver) {
      this.openEventCoolDown = true;
      setTimeout(() => {this.openEventCoolDown = false;}, 500);
    }*/
    !this.openEventCoolDown && this.props.onInactiveListItemClick(idx, false, true, true);
    // !isMouseOver && setTimeout(this.toggleOpenEvent, 250);
    !isMouseOver && this.toggleOpenEvent();
  }

  render() {
    const props = this.props;
    this.isMobile = props.isMobile;
    const uniqYears = props.uniqYears || [];
    this.currentYear = props.currentYear || uniqYears[0];
    this.items = props.content.events;
    const titles = this.items.map(item => item.fields.title);
    const evtList = titles.map((title, idx) => 
      <div key={title} className={(props.listPos === idx) ? styles.listItem_selected : styles.listItem}
        style={{ height: `${props.listItemHeight}rem` }} onClick={() => {this.handleListItemClick(idx)}}>
        <p className={styles.listItemTitle} onMouseOver={() => {this.handleListItemClick(idx, true)}}>{title}</p>
        <div className={styles.line}></div>
        <div className={styles.arrow}></div>
      </div>
    );
    return (
      <section className={styles.Events}
        onKeyDown={this.handleKeyDown} tabIndex='0' ref={$el => props.getEventsElem($el)} >
        {props.hasContentFetched && <Story content={props.content.story} selectFromStoryToEvents={props.selectFromStoryToEvents}
          opacity={(props.isStory && !props.isOpenEvent) ? 1 : 0} zIndex={(props.isStory) ? 10 : -1}
          isStory={props.isStory} isMobile={this.isMobile} cooldown={props.cooldownStory} />}
        {this.isMobile && !props.isStory && <p className={styles.titleMobile}>Events {this.currentYear}</p>}
        <div className={styles.listWrapper}
          style={{ opacity: (props.isEvents && !props.isOpenEvent) ? 1 : 0, zIndex: (props.isEvents) ? 10 : -1 }}>
          <div className={styles.list} style={{ marginTop: props.listMarginTop }}>
            {evtList}
          </div>
        </div>
        <Mindball position={(props.isStory) ? this.defaultBallPosition : props.ballPos} isEvents={true}
          currentYear={props.isEvents && this.currentYear} size={props.mbFontSize} uniqYears={uniqYears}
          mbBetweenElemsPos={props.mbBetweenElemsPos} isMobile={this.isMobile} onYearClick={props.onMbYearClick}
          opacity={(props.isOpenEvent && this.isMobile) ? 0 : 1} zIndex={(props.isOpenEvent && this.isMobile) ? -1 : 11} />
        {!this.isMobile && <Copyright opacity={(!props.isOpenEvent && this.currentYear === uniqYears[uniqYears.length - 1]) ? 1 : 0}
          zIndex={(!props.isOpenEvent && props.listPos === (this.items.length - 1)) ? 10 : -1} />}
        <OpenEvent content={props.content} opacity={(props.isOpenEvent) ? 1 : 0} zIndex={(props.isOpenEvent) ? 10 : -1}
          currentEvent={props.listPos} closeEvent={this.toggleOpenEvent} isOpenEvent={props.isOpenEvent} titles={titles}
          getSlider={($slider, idx) => {
            this.$slider = $slider;
            props.getSlider(this.$slider);
          }} />
      </section>
    );
  }
}
// onWheel={props.isEvents && !props.isOpenEvent && this.handleWheel || undefined}
