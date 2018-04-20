import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';
import { allYears, years, eventsTitles } from 'components/items.js';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowPos: 0,
      ballPos: 0,
      listPos: 0,
      scroll: 0,
      wheel: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.wheel = 0;
    this.ticking = false;
    this.mindballSize = 0.3;
    this.defaultBallPosition = 18;
    // this.defaultBallPosition = 22;
    this.betweenElems = {};
    this.prevYear = '';
  }

  changeYear(idx = 0) {
    this.props.onYearChange(allYears[idx]);
    if (this.props.isEvents && this.prevYear !== this.props.currentYear) { // or maybe use here "allYears[idx].year" ?
      const currentYearIdx = years.indexOf(this.props.currentYear);
      this.setState({ballPos: this.betweenElems['$' + currentYearIdx].offsetTop / this.mindballSize + 10});
    }
    this.prevYear = this.props.currentYear;
  }

  componentDidMount() {
    this.changeYear();
    this.setState({ballPos: this.betweenElems.$0.offsetTop / this.mindballSize + 10});
  }
  
  handleScroll = delta => {
    if (this.state.listPos === 0 && delta < 0) {
      this.props.toggleStoryAndEvents();
      this.ticking = false;
      return;
    }
    if (this.state.listPos === (eventsTitles.length - 1) && delta > 0) return this.ticking = false;
    if (delta > 0) {
      this.changeYear(this.state.listPos + 1);
    } else {
      this.changeYear(this.state.listPos - 1);
    }
    const newDelta = (this.isFirefox) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        if (this.state.listPos < 3 || this.state.listPos > (eventsTitles.length - 5)) {
          this.setState(prev => ({ listPos: prev.listPos + 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos + 1, scroll: prev.scroll - 60 }));
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (this.state.listPos < 4 || this.state.listPos > (eventsTitles.length - 4)) {
          this.setState(prev => ({ listPos: prev.listPos - 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos - 1, scroll: prev.scroll + 60 }));
        }
        this.wheel = 0;
      }
    }
    this.ticking = false;
  }

  onWheel = e => {
    if (!this.ticking) {
      const delta = e.deltaY;
      requestAnimationFrame(() => this.handleScroll(delta));
      this.ticking = true;
    }
  }

  render() {
    const events = eventsTitles.map((item, idx) => 
      <div key={item} className={(this.state.listPos === idx) ? styles.listItem_selected : styles.listItem}>
        <p className={styles.text}>{item}</p>
        <div className={styles.line}></div>
        <div className={styles.arrow}></div>
      </div>
    );
    
    return (
      <section className={styles.Events} onWheel={this.props.isEvents && this.onWheel || undefined}>
        <Story onButtonClick={this.props.toggleStoryAndEvents} opacity={(this.props.isStory) ? 1 : 0} zIndex={(this.props.isStory) ? 10 : -1}
          onWheelDown={this.props.toggleStoryAndEvents} isStory={this.props.isStory} />
        <div className={styles.list} style={{opacity: (this.props.isEvents) ? 1 : 0, zIndex: (this.props.isEvents) ? 10 : -1}}>
          <div className={styles.listWrapper} style={{top: this.state.scroll}}>
            {events}
          </div>
        </div>
        <Mindball position={(this.props.isStory) ? this.defaultBallPosition : this.state.ballPos} isEvents={true}
          currentYear={this.props.isEvents && this.props.currentYear} size={this.mindballSize}
          getBetweenElems={($el, idx) => {this.betweenElems['$' + idx] = $el;}} />
      </section>
    );
  }
}