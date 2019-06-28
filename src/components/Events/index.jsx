import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import OpenEvent from 'components/OpenEvent';
import CustomScroll from 'react-custom-scroll';

export default class Events extends Component {
  ticking = false;
  defaultBallPosition = 18;
  wheel = 0;

  handleWheel = e => {
    if (!this.ticking) {
      const delta = e.deltaY;
      requestAnimationFrame(() => {
        this.props.selectEventsList(delta);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  toggleOpenEvent = () => {
    this.$slider.slickGoTo(0, true);
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
    if (isMouseOver && !this.openEventCoolDown) {
      this.props.onInactiveListItemClick(idx, false); 
    } else if (!this.openEventCoolDown) {
      this.props.onInactiveListItemClick(idx, false, true);
      this.toggleOpenEvent();
    }
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
            <CustomScroll heightRelativeToParent="100%" scrollTo={props.listScroll} onScroll={e => {
              // props.getListElem(e.target);
            }} freezePosition={props.cooldownStory} >
              {evtList}
            </CustomScroll>
          </div>
        </div>
        <Mindball position={(props.isStory) ? this.defaultBallPosition : props.ballPos} isEvents={true} shift={props.shift}
          currentYear={props.isEvents && this.currentYear} size={props.mbFontSize} uniqYears={uniqYears}
          mbBetweenElemsPos={props.mbBetweenElemsPos} isMobile={this.isMobile} onYearClick={props.onMbYearClick}
          opacity={(props.isOpenEvent && this.isMobile) ? 0 : 1} zIndex={(props.isOpenEvent && this.isMobile) ? -1 : 11} />
        <OpenEvent content={props.content} opacity={(props.isOpenEvent) ? 1 : 0} zIndex={(props.isOpenEvent) ? 10 : -1} shift={props.shift}
          currentEvent={props.listPos} closeEvent={this.toggleOpenEvent} isOpenEvent={props.isOpenEvent} titles={titles} wWidth={props.wWidth}
          getSlider={($slider, idx) => {
            this.$slider = $slider;
            props.getSlider(this.$slider);
          }} />
      </section>
    );
  }
}
