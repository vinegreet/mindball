import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import BgText from 'components/BgText';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Initial from 'components/Initial';
import Events from 'components/Events';
import items, { years, uniqYears } from 'components/items.js';
// import Inside from 'components/Inside';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bgText: '',
      currentEventsListPos: 0,
      currentYear: '',
      isEvents: false,
      isMenuOpen: false,
      isMobile: null,
      isStory: false,
      scroll: 0,
      // isOpenEvent: false,
      ballPos: 0,
      listPos: 0,
      scrollEventsList: 0,
      wheel: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.wheel = 0;
    this.mbBetweenElems = {};
    this.eventsMbFontSize = 0.0181;
  }

  componentDidMount() {
    this.setState({ isMobile: window.outerWidth < 988 });
    if (window.location.href.search('localhost') >= 0) this.selectEventOnClick(0);

    /*console.log(document.getElementsByClassName(styles.listItem)[0].style);
    console.log(document.styleSheets);
    console.log(this.listItemH);*/
    this.measureFontSize();
    this.changeYear(0, true);
    this.setState({ ballPos: this.mbBetweenElems.$0.offsetTop / this.mindballSize + 10 });
    window.addEventListener('resize', this.measureFontSize);
  }

  scrollDown = () => {
    this.setState(state => ({
      isStory: !state.isStory,
      scroll: '-100%'
    }));
  }

  handleSandwichClick = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }));
  }

  selectEventOnClick = (idx, isMenuClick) => {
    if (idx < 0) {
      this.setState({ isStory: true, isEvents: false, isMenuOpen: false, scroll: '-100%', listPos: 0, scrollEventsList: 0 });
      return;
    }
    if (!this.state.isStory && !this.state.isEvents) {
      this.toggleSections(true);
    } else if (this.state.isStory) {
      this.toggleSections();
    }
    // if (OpenEvent) {!OpenEvent}
    const newIdx = (isMenuClick) ? years.indexOf(uniqYears[idx]) : idx;
    this.changeYear(newIdx);
    this.setState({ listPos: newIdx, isMenuOpen: false });
    if (newIdx < 3) {
      this.setState({ scrollEventsList: 0 });
    } else if (newIdx > (items.length - 4)) {
      this.setState({ scrollEventsList: (items.length - 7) * -3.75 });
    } else {
      this.setState({ scrollEventsList: (newIdx - 3) * -3.75 }); // = 0
    }
  }

  toggleSections = (dev) => {
    if (dev === true) {
      this.setState(state => ({
        // isStory: !state.isStory,
        isEvents: !state.isEvents,
        scroll: '-100%'
      }));
      return;
    }
    this.setState(state => ({ isEvents: !state.isEvents, isStory: !state.isStory }));
  }

  changeYear = (idx, isFirstCall) => {
    this.setState({ currentYear: years[idx] });
    if (this.prevYear !== years[idx]) {
      const currentYearIdx = uniqYears.indexOf(years[idx]);
      this.setState({ ballPos: this.mbBetweenElems['$' + currentYearIdx].offsetTop / this.emSize + 10 });
    }
    isFirstCall === undefined && (this.prevYear = years[idx]);
  }

  measureFontSize = () => {
    const htmlFontSize = parseFloat(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize);
    this.emSize = this.eventsMbFontSize * htmlFontSize;
  }
  
  selectEventOnScroll = (delta, keyDown) => {
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        if (this.state.listPos < 3 || this.state.listPos > (items.length - 5)) {
          this.setState(prev => ({ listPos: prev.listPos + 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos + 1, scrollEventsList: prev.scrollEventsList - 3.75 }));
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (this.state.listPos < 4 || this.state.listPos > (items.length - 4)) {
          this.setState(prev => ({ listPos: prev.listPos - 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos - 1, scrollEventsList: prev.scrollEventsList + 3.75 }));
        }
        this.wheel = 0;
      }
    }
  }

  handleSelectFromStoryToEvents = () => {
    this.changeYear(0);
    this.toggleSections();
  }

  render() {
    let bgText = '';
    if (this.state.isMenuOpen) {
      bgText = 'Menu';
    } else if (this.state.isStory) {
      bgText = 'Story';
    } else if (this.state.isEvents) {
      bgText = this.state.currentYear;
    }
    return <div className={styles.App} tabIndex='0'>
      <div className={styles.wrapper}>
        <div className={styles.bubbles} style={{ opacity: (!this.state.isMenuOpen) ? 0.5 : 0 }}></div>
        <BgText text={bgText} />
        <Header onSandwichClick={this.handleSandwichClick} events={this.state.isEvents} />
        <Menu opacity={(this.state.isMenuOpen) ? 1 : 0} zIndex={(this.state.isMenuOpen) ? 6 : 0} onMenuClick={this.selectEventOnClick} />
        {/*this.state.isMenuOpen && <Menu years={this.state.years} />*/}
        <div className={styles.innerContainer} style={{ top: this.state.scroll, opacity: (!this.state.isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          {/*<Story onButtonClick={this.handleStoryClick} />*/}
          <Events onYearChange={this.handleYearChange} currentYear={this.state.currentYear}
            currentEventsListPos={this.state.currentEventsListPos} toggleStoryAndEvents={this.toggleSections}
            isEvents={this.state.isEvents} isStory={this.state.isStory}
            listPos={this.state.listPos} scroll={this.state.scrollEventsList} ballPos={this.state.ballPos} mbFontSize={this.eventsMbFontSize}
            changeYear={this.changeYear} selectEventOnScroll={this.selectEventOnScroll} selectFromStoryToEvents={this.handleSelectFromStoryToEvents}
            getMbBetweenElems={($el, idx) => {this.mbBetweenElems['$' + idx] = $el;}} onInactiveListItemClick={this.selectEventOnClick} />
        </div>
      </div>
    </div>;
  }
}

/*  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        this.scrollDown();
        break;
      case 'ArrowUp':
        this.setState(state => ({ scroll: 0, isStory: !state.isStory }));
        break;
      default:
        return;
    }
  }*/
// onKeyDown={this.handleKeyDown}

  /*handleBallFinish = () => {
    this.scrollDown();
  }

  handleButtonClick = () => {
    this.scrollDown();
  }*/
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>
// <Route exact path="/" component={Inside} />
