import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import { years, uniqYears, titles } from 'components/items.js';
import OpenEvent from 'components/OpenEvent';
import ReactDOM from 'react-dom';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowPos: 0,
      ballPos: 0,
      isOpenEvent: false,
      listPos: 0,
      scroll: 0,
      wheel: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.wheel = 0;
    this.ticking = false;
    this.defaultBallPosition = 18;
    this.betweenElems = {};
    this.mbFontSize = 0.0181;
  }

  changeYear(idx, isFirstCall) {
    this.props.onYearChange(years[idx]);
    if (this.prevYear !== years[idx]) {
      const currentYearIdx = uniqYears.indexOf(years[idx]);
      this.setState({ ballPos: this.betweenElems['$' + currentYearIdx].offsetTop / this.emSize + 10 });
    }
    console.log(!isFirstCall);
    !isFirstCall && (this.prevYear = years[idx]);
  }

  measureFontSize = () => {
    this.htmlFontSize = parseFloat(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize);
    this.emSize = this.mbFontSize * this.htmlFontSize;
  }

  componentDidMount() {
    /*console.log(document.getElementsByClassName(styles.Events)[0].style);
    console.log(document.styleSheets);
    console.log(this.listItemH);*/
    this.measureFontSize();
    this.changeYear(0, true);
    this.setState({ ballPos: this.betweenElems.$0.offsetTop / this.mindballSize + 10 });
    window.addEventListener('resize', this.measureFontSize);
  }
  
  selectEvent = (delta, keyDown) => {
    if (this.state.listPos === 0 && delta < 0) {
      this.props.toggleStoryAndEvents();
      return this.ticking = false;
    }
    if (this.state.listPos === (titles.length - 1) && delta > 0) return this.ticking = false;
    if (delta > 0) {
      this.changeYear(this.state.listPos + 1);
    } else {
      this.changeYear(this.state.listPos - 1);
    }
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        if (this.state.listPos < 3 || this.state.listPos > (titles.length - 5)) {
          this.setState(prev => ({ listPos: prev.listPos + 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos + 1, scroll: prev.scroll - 3.75 }));
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (this.state.listPos < 4 || this.state.listPos > (titles.length - 4)) {
          this.setState(prev => ({ listPos: prev.listPos - 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos - 1, scroll: prev.scroll + 3.75 }));
        }
        this.wheel = 0;
      }
    }
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
        if (this.state.listPos === 0) {
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

  handleSelectFromStoryToEvents = () => {
    this.changeYear(0);
    this.props.toggleStoryAndEvents();
  }

  render() {
    const events = titles.map((item, idx) => 
      <div key={item} className={(this.state.listPos === idx) ? styles.listItem_selected : styles.listItem}
        ref={'listItem' + idx}
        onClick={this.state.listPos === idx && this.toggleOpenEvent || undefined}>
        <p className={styles.text}>{item}</p>
        <div className={styles.line}></div>
        <div className={styles.arrow}></div>
      </div>
    );
    
    return (
      <section className={styles.Events} onWheel={this.props.isEvents && !this.state.isOpenEvent && this.handleWheel || undefined}
        onKeyDown={this.handleKeyDown} tabIndex='0' ref={$el => this.$el = $el}>
        <Story selectFromStoryToEvents={this.handleSelectFromStoryToEvents}
          opacity={(this.props.isStory && !this.state.isOpenEvent) ? 1 : 0} zIndex={(this.props.isStory) ? 10 : -1}
          isStory={this.props.isStory} />
        <div className={styles.list}
          style={{ opacity: (this.props.isEvents && !this.state.isOpenEvent) ? 1 : 0, zIndex: (this.props.isEvents) ? 10 : -1 }}>
          <div className={styles.listWrapper} style={{ top: this.state.scroll + 'rem' }}>
            {events}
          </div>
        </div>
        <Mindball position={(this.props.isStory) ? this.defaultBallPosition : this.state.ballPos} isEvents={true}
          currentYear={this.props.isEvents && this.props.currentYear} size={this.mbFontSize}
          getBetweenElems={($el, idx) => {this.betweenElems['$' + idx] = $el;}} />
        <OpenEvent opacity={(this.state.isOpenEvent) ? 1 : 0} zIndex={(this.state.isOpenEvent) ? 10 : -1}
          currentEvent={this.state.listPos} closeEvent={this.toggleOpenEvent} />
      </section>
    );
  }
}
// onButtonClick={this.handleSelectFromStoryToEvents} onWheelDown={this.handleSelectFromStoryToEvents}
    // this.mindballSize = 0.308;
    // this.mindballSize = 0.01875;
    // this.defaultBallPosition = 22;