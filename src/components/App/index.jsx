import React, { Component } from 'react';
import styles from './styles.css';
import BgText from 'components/BgText';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Initial from 'components/Initial';
import Events from 'components/Events';
import { connect } from 'react-redux';
import { fetchContent } from 'actions';
import Bubbles from 'components/Bubbles';
import ontouch from 'components/swipes.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ballPos: 0,
      bgText: '',
      cooldownStory: false,
      currentYear: '',
      currYrIdx: 0,
      isEvents: false,
      isMenuOpen: false,
      isMobile: null,
      isOpenEvent: false,
      isStory: false,
      itemsLength: 0,
      listPos: 0,
      listScroll: 0,
      scroll: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.mbBetweenElems = {};
    this.eventsMbFontSize = 0.0181;
    this.listItemHeight = 3.75;
    this.devMode = window.location.href.search('localhost') >= 0;
    this.wheel = 0;
    this.coolDownForSwipe = false;
    this.lastListScroll = 0;
    this.selectEventCoolDown = false;
  }

  componentWillMount() {
    this.props.fetchContent();
  }

  componentDidMount() {
    this.setState({ isMobile: window.outerWidth < 988 });
    // this.isMobile = window.outerWidth < 988;
    this.wWidth = window.innerWidth;
    this.isMobile = window.innerWidth < 988;
    this.wHeight = window.innerHeight;
    this.wHeight2 = window.outerHeight;
    // const $html = document.getElementByTagname('html')[0];

    // console.log(this.isMobile, this.state.isMobile);
    // console.log(this.wHeight, this.wHeight2);

    this.changeYear(-1, true);
    // this.setState({ ballPos: this.mbYearsCellsPos[0] + 10 });

    /*if (this.devMode) {this.changeYear(0);}
    if (!this.devMode && this.isMobile) this.scrollDown();*/
    this.isMobile && this.scrollDown();

    // window.addEventListener('resize', this.measureFontSize);
    // ================================
    // this.$el.search('listWrapper')
    // console.log(this.$el.childNodes);

    const $evts = this.$Events;
    const remMob = this.wWidth * 0.022;
    const listItemHeightPx = this.listItemHeight * remMob;

    for (let i = 0; i < $evts.childNodes.length; i++) {
      const thisNode = $evts.childNodes[i];
      if (thisNode.getAttribute('class').search('listWrapper') >= 0) {
        this.$list = thisNode.childNodes[0];
      }
    }

    if ($evts) {
      ontouch($evts, (e, dir, phase, swipeType, dist, touchObj) => {
        const distance = (!isNaN(dist)) ? Math.abs(dist) : 0;
        const currYear = parseInt(this.uniqYears.indexOf(this.state.currentYear)); // refactor
        const nextYear = currYear + 1;
        const prevYear = currYear - 1;
        const fingerPosY = touchObj.pageY;
        const fingerPosX = touchObj.pageX;
        if (phase === 'start') {
          this.touchStartY = fingerPosY;
          this.touchStartX = fingerPosX;
        }
        if (dir === 'up' || dir === 'down' && this.state.isEvents && !this.state.isOpenEvent) {
          const titlesLength = this.titles.length;
          const topLimit = listItemHeightPx * 3;
          const bottomLimit = -((titlesLength * listItemHeightPx) - listItemHeightPx * 4);
          const scroll = this.lastListScroll + fingerPosY - this.touchStartY;
          const newListPos = 3 - Math.round(scroll / listItemHeightPx);
          if (scroll < topLimit && scroll > bottomLimit) {
            this.setState(prev => ({
              listScroll: scroll,
              listPos: (newListPos >= 0 && newListPos < titlesLength) ? newListPos : prev.listPos
            }));
            this.changeYear(this.uniqYears.indexOf(this.years[this.state.listPos]), false, true);
          }
        }
        if (phase === 'end' && !this.swipeCoolDown && (this.state.isEvents || this.state.isStory)) {
          const outerHtml = e.target.outerHTML;
          const innerHtml = e.target.innerHTML;
          const isListItem = outerHtml.search('listItemTitle') === 10;
          const isSliderButton = outerHtml.search('button') === 1;
          const newDistanceY = Math.abs(fingerPosY - this.touchStartY);
          const newDistanceX = Math.abs(fingerPosX - this.touchStartX);
          const currYrIdx = this.state.currYrIdx;
          if (newDistanceY < 10 && newDistanceX < 10) {
            if (innerHtml.search('Back') >= 0) {
              this.setState({ isOpenEvent: false });
              this.$slider.slickGoTo(0, true);
              this.$slider.slickPause();
            } else if (!this.state.isOpenEvent && this.state.isEvents && isListItem) {
              const idx = this.titles.indexOf(innerHtml);
              this.setState({ listPos: idx, listScroll: (3 - idx) * listItemHeightPx });
              this.toggleOpenEvent();
              // this.$slider.slickGoTo(0, true);
              this.$slider.slickPlay();
            } else if (isSliderButton) {
              this.$slider.slickGoTo(parseInt(innerHtml) - 1, true);
            }
            this.swipeCoolDown = true;
            setTimeout(() => {this.swipeCoolDown = false;}, 700);
            return;
          }
          if (dir === 'left' && distance > 250) {
            if (this.state.isStory) {
              this.toggleSections();
              if (!this.state.currentYear) {
                this.changeYear(1);
                this.setState({ listPos: 3 });
              }
              return;
            } else {
              if (!this.state.isStory && !this.swipeCoolDown) {
                // this.selectEventsList(100);
                if (currYrIdx < this.uniqYears.length - 1) this.changeYear(currYrIdx + 1, false);
                this.setState({ listScroll: (3 - this.state.listPos) * listItemHeightPx });
              }
            }
          }
          if (dir === 'right' && distance > 250) {
            if (this.state.isStory) return;
            // this.selectEventsList(-100);
            if (currYrIdx > 0) {
              this.changeYear(currYrIdx - 1, false);
            } else if (currYrIdx === 0 && !this.coolDownForSwipe) {
              this.coolDownForSwipe = true;
              // this.toggleSections();
              this.changeYear(-1);
              setTimeout(() => {this.coolDownForSwipe = false}, 200);
            }
            this.setState({ listScroll: (3 - this.state.listPos) * listItemHeightPx });
          }
          /*this.swipeCoolDown = true;
          setTimeout(() => {this.swipeCoolDown = false;}, 700);*/
          this.lastListScroll = this.state.listScroll;
        }
      });
      this.isEventListenerAdded = true;
    }
  }

  componentDidUpdate() {
    this.items = this.props.events;
    this.years = this.items.map(item => item.fields.date.split('-')[0]);
    this.uniqYears = [...new Set(this.years)];
    this.titles = this.items.map(item => item.fields.title);
    this.hasContentFetched = this.props.events.length > 0;
    // const uniqYearsIdx = this.uniqYears.map(uniqYear => this.years.findIndex(year => year === uniqYear));
    // if (this.items.length) this.setState({ itemsLength: this.items.length });
  }

  scrollDown = () => {
    this.setState(prev => ({ scroll: (this.isMobile) ? 0 : '-100%', cooldownStory: /*(this.isMobile) ? false :*/ true }));
    // isStory: !prev.isStory, 
    setTimeout(() => {this.setState({ cooldownStory: false });}, 1500);
  }

  handleSandwichClick = () => {
    this.setState(prev => ({ isMenuOpen: !prev.isMenuOpen }));
  }

  selectEventOnClick = (idx, isMenuClick, isMouseOver) => {
    // console.log('this.selectEventCoolDown: ', this.selectEventCoolDown, `${new Date().getSeconds()}:${new Date().getMilliseconds()}`)
    if (isMouseOver && !this.selectEventCoolDown && !this.state.cooldownStory) {
      const newIdx = (isMenuClick) ? this.years.indexOf(this.uniqYears[idx]) : idx; // Invert this
      this.setState({ listPos: newIdx });
      
      const convertedIdx = this.uniqYears.indexOf(this.years[idx]);
      this.changeYear(convertedIdx, false, true);
    }
  }

  toggleSections = (dev) => {
    if (dev === true) {
      this.setState(prev => ({
        // isStory: !prev.isStory,
        isEvents: !prev.isEvents,
        scroll: (this.isMobile) ? 0 : '-100%'
      }));
      return;
    }
    if (this.state.isStory) {
      this.setState({ cooldownStory: true });
      setTimeout(() => {this.setState({ cooldownStory: false });}, 700);
    }
    this.setState(prev => ({ isEvents: !prev.isEvents, isStory: !prev.isStory }));
  }

  changeYear = (idx, isFirstCallOrStoryScroll, isClick, isMenuClick) => {
    if (idx < 0) {
      this.setState({ isStory: true, isEvents: false, isMenuOpen: false, listPos: (this.isMobile) ? 3 : 0, currentYear: '', currYrIdx: -1, isOpenEvent: false });
      // isFirstCallOrStoryScroll && this.setState(prev => ({ isEvents: !prev.isEvents, isStory: !prev.isStory }))
      return;
    }
    if (!this.state.isStory && !this.state.isEvents && !isFirstCallOrStoryScroll) {
      this.toggleSections(true);
    } else if (this.state.isStory && isFirstCallOrStoryScroll) {
      this.toggleSections();
    }
    // if (OpenEvent) {!OpenEvent}
    const newCurrYr = this.uniqYears[idx];
    const rem = (this.isMobile) ? (this.wWidth * 0.022) : (8 + this.wWidth * 0.005);
    const listItemHeightPx = this.listItemHeight * rem;
    this.setState(prev => ({
      currentYear: newCurrYr,
      currYrIdx: idx,
      listPos: (newCurrYr >= 0 && !isClick) ? this.years.indexOf(newCurrYr) : prev.listPos,
      listScroll: (isMenuClick && this.isMobile) ? ((3 - this.years.indexOf(newCurrYr)) * listItemHeightPx) : prev.listScroll,
      // listScrollDesk: (isMenuClick && !this.isMobile) ? (this.years.indexOf(newCurrYr) * listItemHeightPx) : prev.listScrollDesk,
      ballPos: this.mbYearsCellsPos[idx] + 10,
      isMenuOpen: false,
      isOpenEvent: false
    }));
    if (isMenuClick && !this.isMobile) {
      this.$list.scrollTop = this.years.indexOf(newCurrYr) * listItemHeightPx;
    }

    // isFirstCall === undefined && (this.prevYear = this.years[idx]);
  }

  toggleOpenEvent = () => {
    this.setState(prev => ({ isOpenEvent: !prev.isOpenEvent }));
  }

  handleWheel = e => {
    // e.persist();
    if (this.state.cooldownStory || this.state.isStory) {
      e.preventDefault();
    // this.$list.scrollTop = 0;
    }
    if (!this.ticking) {
      const delta = e.deltaY;
      requestAnimationFrame(() => this.selectEvent(delta, false, e));
      this.ticking = true;
    }
  }

  selectEvent = (delta, keyDown, e) => { // ======================= REFACTOR ==============================
    // const currYrIdx2 = this.uniqYears.indexOf(this.state.currentYear);
    const currYrIdx = this.state.currYrIdx;
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (this.wheel <= -200 && this.$list.scrollTop === 0) {
      // this.toggleSections();
      this.changeYear(-1);
      this.wheel = 0;
    }
    this.ticking = false;
  }

  handleMenuClick = (idx, bool) => {
    const state = this.state;
    // (state.isStory && this.toggleSections() && this.changeYear(idx, bool)) || this.changeYear(idx, false, false, true);
    const isScrolled = (this.isMobile) ? true : state.scroll === '-100%';
    console.log('changeYear idx: ' + idx, isScrolled);
    if (state.isStory) {
      if (!isScrolled) this.scrollDown();
      this.toggleSections();
      this.changeYear(idx, bool, false, true);
    } else {
      this.changeYear(idx, false, false, true);
    }
    this.selectEventCoolDown = true;
    if (!isScrolled) {
      setTimeout(() => {this.selectEventCoolDown = false;}, 2500);
    } else {
      setTimeout(() => {this.selectEventCoolDown = false;}, 500);
    }
    // this.isMobile && setTimeout(this.scrollEventsList, 800);
    // this.isMobile && this.scrollEventsList();
  }

  render() {
    const state = this.state;
    const hasContentFetched = this.hasContentFetched;  

    let bgText = '';
    
    if (state.isMenuOpen) {
      bgText = 'Menu';
    } else if (state.isStory && ((this.isMobile) ? true : state.scroll)) {
      bgText = 'Story';
    } else if (state.isEvents) {
      bgText = state.currentYear;
    }

    this.mbYearsCellsLength = (hasContentFetched) ? this.uniqYears.length : 0;
    this.mbInnerHeightWithPadding = 1900;
    // this.mbInnerHeight = this.mbInnerHeightWithPaddingAndBorder - (8 * 2 + 4 * 2);
    this.mbInnerHeight = this.mbInnerHeightWithPadding - (8 * 2);
    // this.mbCellHeight = 60 + 4 * 2;
    this.mbCellHeight = 60;
    this.mbYearsCellsPos = (!hasContentFetched) ? null : this.uniqYears.map((year, idx) => 
      ((this.mbInnerHeight / this.mbYearsCellsLength) * (idx + 1)) - ((this.mbCellHeight / 2) * ((idx + 1) / 2)) - (4 * 1.2 * (idx + 1))
    ); // the 1.2 value is added just to make quick fix; badly positioned if new unique year added; see local file \Mindball\test\Calculating_cells_positions.txt


    return <div className={styles.App} tabIndex='0' onWheel={this.handleWheel}>
      <div className={styles.wrapper}>
        {/*!this.devMode &&*/ !this.isMobile && <Bubbles opacity={(!state.isMenuOpen) ? 1 : 0} top={state.scroll} />}
        {this.devMode && false && <div className={styles.bubbles} style={{ opacity: (!state.isMenuOpen) ? 0.5 : 0 }}></div>}
        <BgText text={bgText} isMobile={this.isMobile} />
        <Header onSandwichClick={this.handleSandwichClick} events={state.isEvents} isMenuOpen={state.isMenuOpen} />
        {hasContentFetched && <Menu opacity={(state.isMenuOpen) ? 1 : 0} zIndex={(state.isMenuOpen) ? 6 : 0} uniqYears={this.uniqYears}
          onMenuClick={this.handleMenuClick} />}
        <div className={styles.innerContainer} style={{ top: state.scroll, opacity: (!state.isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          <Events content={this.props} uniqYears={this.uniqYears} mbFontSize={this.eventsMbFontSize} mbBetweenElemsPos={this.mbYearsCellsPos}
            currentYear={state.currentYear} listPos={state.listPos} ballPos={state.ballPos}
            isEvents={state.isEvents} isStory={state.isStory} isMobile={this.isMobile} cooldownStory={state.cooldownStory}
            selectFromStoryToEvents={() => {this.changeYear(0); this.toggleSections();}}
            changeYear={this.changeYear} selectEventOnScroll={this.selectEventOnScroll} onInactiveListItemClick={this.selectEventOnClick}
            onMbYearClick={this.selectEventOnClick} listItemHeight={this.listItemHeight}
            toggleOpenEvent={this.toggleOpenEvent} isOpenEvent={state.isOpenEvent} getEventsElem={($el) => this.$Events = $el}
            getSlider={($slider) => this.$slider = $slider} years={this.years} selectEventsList={this.selectEventsList}
            listMarginTop={state.listScroll} hasContentFetched={hasContentFetched} />
        </div>
      </div>
    </div>;
  }
}
function mapStateToProps(state) {
  return { events: state.content.items, images: state.content.img, story: state.content.story };
}
export default connect(mapStateToProps, { fetchContent })(App);
// toggleStoryAndEvents={this.toggleSections}
// wWidth={this.wWidth}
