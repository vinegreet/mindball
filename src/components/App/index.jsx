import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import BgText from 'components/BgText';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Initial from 'components/Initial';
import Events from 'components/Events';
import items, { years, uniqYears } from 'components/items.js';

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
    // this.isMobile = window.outerWidth < 988;
    this.isMobile = window.innerWidth < 988;
    // console.log(this.isMobile, this.state.isMobile);
    if (window.location.href.search('localhost') >= 0) this.selectEventOnClick(0);
    if (window.location.href.search('localhost') < 0 && this.isMobile) this.scrollDown();
    // this.isMobile && this.scrollDown();

    this.changeYear(0, true);
    this.setState({ ballPos: this.mbYearsCellsPos[0] + 10 });
    // window.addEventListener('resize', this.measureFontSize);
  }

  scrollDown = () => {
    this.setState(prev => ({ isStory: !prev.isStory, scroll: (this.isMobile) ? 0 : '-100%' }));
  }

  handleSandwichClick = () => {
    this.setState(prev => ({ isMenuOpen: !prev.isMenuOpen }));
  }

  selectEventOnClick = (idx, isMenuClick) => {
    if (idx < 0) {
      this.setState({ isStory: true, isEvents: false, isMenuOpen: false, listPos: 0, scrollEventsList: 0 });
      if (!this.isMobile) {
        this.setState({ scroll: '-100%' });
      }
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
      this.setState(prev => ({
        // isStory: !state.isStory,
        isEvents: !prev.isEvents,
        scroll: (this.isMobile) ? 0 : '-100%'
      }));
      return;
    }
    this.setState(prev => ({ isEvents: !prev.isEvents, isStory: !prev.isStory }));
  }

  changeYear = (idx, isFirstCall) => {
    this.setState({ currentYear: years[idx] });
    if (this.prevYear !== years[idx]) {
      const currentYearIdx = uniqYears.indexOf(years[idx]);
      this.setState({ ballPos: this.mbYearsCellsPos[currentYearIdx] + 10 });
    }
    isFirstCall === undefined && (this.prevYear = years[idx]);
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

    this.mbYearsCellsLength = uniqYears.length;
    this.mbInnerHeightWithPadding = 1900;
    // this.mbInnerHeight = this.mbInnerHeightWithPaddingAndBorder - (8 * 2 + 4 * 2);
    this.mbInnerHeight = this.mbInnerHeightWithPadding - (8 * 2);
    // this.mbCellHeight = 60 + 4 * 2;
    this.mbCellHeight = 60;
    this.mbYearsCellsPos = uniqYears.map((year, idx) => 
      ((this.mbInnerHeight / this.mbYearsCellsLength) * (idx + 1)) - ((this.mbCellHeight / 2) * ((idx + 1) / 2)) - (4 * 1.2 * (idx + 1))
    ); // the 1.2 value is added just to make quick fix; badly positioned if new unique year added; see local file \Mindball\test\Calculating_cells_positions.txt

    return <div className={styles.App} tabIndex='0'>
      <div className={styles.wrapper}>
        <div className={styles.bubbles} style={{ opacity: (!this.state.isMenuOpen) ? 0.5 : 0 }}></div>
        <BgText text={bgText} isMobile={this.isMobile} />
        <Header onSandwichClick={this.handleSandwichClick} events={this.state.isEvents} />
        <Menu opacity={(this.state.isMenuOpen) ? 1 : 0} zIndex={(this.state.isMenuOpen) ? 6 : 0} onMenuClick={this.selectEventOnClick} />
        <div className={styles.innerContainer} style={{ top: this.state.scroll, opacity: (!this.state.isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          <Events isEvents={this.state.isEvents} isStory={this.state.isStory} isMobile={this.isMobile}
            currentYear={this.state.currentYear} listPos={this.state.listPos} scroll={this.state.scrollEventsList} ballPos={this.state.ballPos}
            mbFontSize={this.eventsMbFontSize} toggleStoryAndEvents={this.toggleSections} changeYear={this.changeYear}
            selectEventOnScroll={this.selectEventOnScroll} selectFromStoryToEvents={this.handleSelectFromStoryToEvents}
            onInactiveListItemClick={this.selectEventOnClick} mbBetweenElemsPos={this.mbYearsCellsPos} />
        </div>
      </div>
    </div>;
  }
}