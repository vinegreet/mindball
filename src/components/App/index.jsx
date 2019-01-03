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
import onTouch from 'components/swipes.js';
import Copyright from 'components/Copyright';
import Blind from 'components/Blind';

class App extends Component {
  state = {
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
    listScrollMob: 0,
    listScrollDesk: 0,
    lowWindow: false,
    narrowWindow: false,
    scroll: 0,
    shift: false,
    superLowWindow: false,
    wWidth: 0
  };
  isFirefox = typeof InstallTrigger !== 'undefined';
  mbBetweenElems = {};
  eventsMbFontSize = 0.0181;
  listItemHeight = 3.75;
  devMode = window.location.href.search('localhost') >= 0;
  wheel = 0;
  coolDownForSwipe = false;
  lastListScroll = 0;
  selectEventCoolDown = false;
  scrollOnce = false; // CONTENT ADDING MODE

  async componentDidMount() {
    await this.props.fetchContent();
    this.wWidth = window.innerWidth;
    this.isMobile = window.innerWidth < 988;
    this.wHeight = window.innerHeight;
    this.wHeight2 = window.outerHeight;
    this.$html = document.getElementsByTagName('html')[0];

    this.changeYear(-1, true);
    this.isMobile && this.scrollDown();

    window.addEventListener('resize', () => {
      if (!this.ticking) {
        requestAnimationFrame(this.handleResize);
        this.ticking = true;
      }
    });
    this.handleResize();
  }

  handleResize = () => {
    const isMobile = (this.state.isMobile !== null) ? this.state.isMobile : this.isMobile;
    this.aspectRatio = window.innerWidth / window.innerHeight;
    const aspectRatio = this.aspectRatio;
    if (aspectRatio > 2.6) {
      this.$html.style.fontSize = 'calc(1vh + 0.4vw)';
    } else if (!isMobile && this.wWidth > 1680 && this.wWidth <= 1920) {
      this.$html.style.fontSize = 'calc(8px + .45vw)';
    } else if (!isMobile) {
      this.$html.style.fontSize = 'calc(0.877vh + 0.5vw)';
    }
    this.setState({
      isMobile: window.innerWidth < 988,
      narrowWindow: (aspectRatio < 1.433 && isMobile && !this.isMobile) ? true : false,
      shift: (aspectRatio > 2.2) ? true : false,
      lowWindow: (aspectRatio > 2.6) ? true : false,
      superLowWindow: (aspectRatio > 3.2) ? true : false
    });
    this.ticking = false;
  }

  componentDidUpdate() {
    this.items = this.props.events;
    this.years = this.items.map(item => item.fields.date.split('-')[0]);
    this.uniqYears = [...new Set(this.years)];
    this.titles = this.items.map(item => item.fields.title);
    this.hasContentFetched = this.props.events.length > 0;
    let contentfulElementsCreated;
    if (this.$Events && !this.onWheelListenerAdded) contentfulElementsCreated = this.$Events.querySelector('h1');
    if (contentfulElementsCreated && !this.onWheelListenerAdded) {
      const $list = document.getElementsByClassName('inner-container')[0];
      $list.addEventListener('wheel', this.handleWheel);
      this.onWheelListenerAdded = true;
      this.$list = $list;
    }
    if (contentfulElementsCreated && !this.onTouchListenerAdded) {
      this.handleTouch();
      this.onTouchListenerAdded = true;
    }
    // ======================= CONTENT ADDING MODE =======================
    /*if (this.hasContentFetched && !this.scrollOnce) {
      this.handleMenuClick(0);
      this.scrollOnce = true;
    }*/
  }

  handleTouch = () => {
    const $Events = this.$Events;
    const remMob = this.wWidth * 0.022;
    const listItemHeightPx = this.listItemHeight * remMob;
    this.listItemHeightPx = listItemHeightPx;

    onTouch($Events, (e, dir, phase, swipeType, dist, touchObj) => {
      const state = this.state;
      // const { currentYear, currYrIdx, isEvents, isOpenEvent, isStory } = this.state;
      const { swipeCoolDown, uniqYears } = this;
      const distance = (!isNaN(dist)) ? Math.abs(dist) : 0;
      const fingerPosY = touchObj.pageY;
      const fingerPosX = touchObj.pageX;
      if (phase === 'start') {
        this.touchStartY = fingerPosY;
        this.touchStartX = fingerPosX;
      }
      if (dir === 'up' || dir === 'down' && state.isEvents && !state.isOpenEvent) {
        const titlesLength = this.titles.length;
        const topLimit = listItemHeightPx * 3;
        const bottomLimit = -((titlesLength * listItemHeightPx) - listItemHeightPx * 4);
        const scroll = this.lastListScroll + fingerPosY - this.touchStartY;
        const newListPos = 3 - Math.round(scroll / listItemHeightPx);
        if (scroll < topLimit && scroll > bottomLimit) {
          this.setState(prev => ({
            listScrollMob: scroll,
            listPos: (newListPos >= 0 && newListPos < titlesLength) ? newListPos : prev.listPos
          }));
          this.changeYear(uniqYears.indexOf(this.years[this.state.listPos]), false, true);
        }
      }
      if (phase === 'end' && !swipeCoolDown && (state.isEvents || state.isStory)) {
        const newDistanceY = Math.abs(fingerPosY - this.touchStartY);
        const newDistanceX = Math.abs(fingerPosX - this.touchStartX);
        const currYrIdx = state.currYrIdx;
        if (newDistanceY < 10 && newDistanceX < 10) {
          e.target.click();
          this.swipeCoolDown = true;
          setTimeout(() => {this.swipeCoolDown = false;}, 700);
          return;
        }
        if (dir === 'left' && distance > 150) {
          if (state.isStory) {
            this.toggleSections();
            if (!state.currentYear) {
              this.changeYear(0);
            }
            return;
          } else {
            if (!state.isStory && !state.isOpenEvent && !swipeCoolDown) {
              if (currYrIdx < uniqYears.length - 1) this.changeYear(currYrIdx + 1, false, false, true);
            }
          }
        }
        if (dir === 'right' && distance > 150) {
          if (state.isStory || state.isOpenEvent) return;
          if (currYrIdx > 0) {
            this.changeYear(currYrIdx - 1, false, false, true);
          } else if (currYrIdx === 0 && !this.coolDownForSwipe) {
            this.coolDownForSwipe = true;
            this.changeYear(-1);
            setTimeout(() => {this.coolDownForSwipe = false}, 200);
          }
        }
        this.lastListScroll = this.state.listScrollMob;
      }
    });
  }

  scrollDown = () => {
    this.setState(prev => ({ scroll: (this.isMobile) ? 0 : 100, cooldownStory: /*(this.isMobile) ? false :*/ true }));
    setTimeout(() => {this.setState({ cooldownStory: false });}, 1500);
  }

  handleSandwichClick = () => {
    this.setState(prev => ({ isMenuOpen: !prev.isMenuOpen }));
  }

  selectEvent = (idx, isMenuClick) => {
    if (!this.selectEventCoolDown) {
      const newIdx = (isMenuClick) ? this.years.indexOf(this.uniqYears[idx]) : idx; // Invert this
      this.setState(prev => ({
        listPos: newIdx,
        listScrollMob: (this.isMobile) ? ((3 - idx) * this.listItemHeightPx) : prev.listScrollMob
      }));
      
      const uniqYearIdx = this.uniqYears.indexOf(this.years[idx]);
      this.changeYear(uniqYearIdx, false, true);
    }
  }

  toggleSections = (dev, isScroll) => {
    if (dev === true) {
      this.setState(prev => ({
        isEvents: !prev.isEvents,
        scroll: (this.isMobile) ? 0 : 100
      }));
      return;
    }
    // if (this.state.isStory && isScroll) {
    if (this.state.isStory) {
      this.selectEventCoolDown = true;
      setTimeout(() => {this.selectEventCoolDown = false;}, 700);
      this.setState({ cooldownStory: true });
      setTimeout(() => {this.setState({ cooldownStory: false });}, 3500);
    }
    this.setState(prev => ({ isEvents: !prev.isEvents, isStory: !prev.isStory }));
  }

  changeYear = (idx, isFirstCallOrStoryScroll, isClick, isMenuClick) => {
    const isMobile = this.isMobile;
    if (idx < 0) {
      this.setState({ isStory: true, isEvents: false, isMenuOpen: false, listPos: (isMobile) ? 3 : 0, currentYear: '', currYrIdx: -1, isOpenEvent: false });
      return;
    }
    if (!this.state.isStory && !this.state.isEvents && !isFirstCallOrStoryScroll) {
      this.toggleSections(true);
    } else if (this.state.isStory && isFirstCallOrStoryScroll) {
      this.toggleSections();
    }
    const newCurrYr = this.uniqYears[idx];
    const rem = (isMobile) ? (this.wWidth * 0.022) : (8 + this.wWidth * 0.005);
    const listItemHeightPx = this.listItemHeight * rem;
    this.setState(prev => ({
      currentYear: newCurrYr,
      currYrIdx: idx,
      listPos: (newCurrYr >= 0 && !isClick) ? this.years.indexOf(newCurrYr) : prev.listPos,
      listScrollMob: (isMenuClick && isMobile) ? ((3 - this.years.indexOf(newCurrYr)) * listItemHeightPx) : prev.listScrollMob,
      listScrollDesk: (isMenuClick && !isMobile) ? (this.years.indexOf(newCurrYr) * listItemHeightPx) : prev.listScrollDesk,
      ballPos: (!this.mbYearsCellsPos) ? 10 : this.mbYearsCellsPos[idx] + 10,
      isMenuOpen: false,
      isOpenEvent: false
    }));
  }

  toggleOpenEvent = () => {
    this.setState(prev => ({ isOpenEvent: !prev.isOpenEvent }));
  }

  handleWheel = e => {
    if (!this.ticking && !this.state.cooldownStory) {
      const delta = e.deltaY;
      requestAnimationFrame(() => this.selectSection(delta, false, e));
      this.ticking = true;
    }
  }

  selectSection = (delta, keyDown, e) => {
    const currYrIdx = this.state.currYrIdx;
    const newDelta = (this.isFirefox && !keyDown) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (this.wheel <= -400 && this.$list.scrollTop === 0) {
      this.changeYear(-1);
      this.wheel = 0;
    }
    this.ticking = false;
  }

  handleMenuClick = (idx, bool) => {
    const { isStory, scroll } = this.state;
    const isScrolled = (this.isMobile) ? true : scroll === 100;
    if (isStory) {
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
  }

  render() {
    const { props, state, eventsMbFontSize, hasContentFetched, listItemHeight, uniqYears, years } = this;
    const { ballPos, cooldownStory, currentYear, isEvents, isMenuOpen, isMobile, isOpenEvent, isStory, listPos, listScrollMob, listScrollDesk, scroll,
      narrowWindow, shift, lowWindow, superLowWindow } = state; 

    let bgText = '';
    if (isMenuOpen) {
      bgText = 'Menu';
    } else if (isStory && ((isMobile) ? true : scroll)) {
      bgText = 'Story';
    } else if (isEvents) {
      bgText = currentYear;
    }

    const mbYearsCellsLength = (hasContentFetched) ? uniqYears.length : 0;
    const mbInnerHeightWithPadding = 1900;
    const mbInnerHeight = mbInnerHeightWithPadding - (8 * 2);
    const mbCellHeight = 60;
    this.mbYearsCellsPos = (!hasContentFetched) ? null : uniqYears.map((year, idx) => 
      ((mbInnerHeight / mbYearsCellsLength) * (idx + 1)) - ((mbCellHeight / 2) * ((idx + 1) / 2.5))
    );// 2.5 - magical number

    const blind = narrowWindow || superLowWindow || (isMobile && this.aspectRatio > 0.75);

    const { App, bubbles, bubblesWrapper, innerContainer, wrapper } = styles;

    return <div className={App} tabIndex='0' onWheel={this.handleWheel}>
      <div className={wrapper}>
        {blind && <Blind narrow={narrowWindow} landscape={!isMenuOpen && this.isMobile} />}
        {!isMobile && false && <Bubbles opacity={(!isMenuOpen) ? 1 : 0} top={scroll} wWidth={this.state.wWidth} />}
        <div className={bubblesWrapper} style={{ opacity: (!this.state.isMenuOpen) ? 0.8 : 0, top: -scroll + '%' }}>
          <div className={bubbles}></div>
          <div className={bubbles}></div>
        </div>
        <BgText text={bgText} isMobile={isMobile} />
        <Header onSandwichClick={this.handleSandwichClick} events={isEvents} isMenuOpen={isMenuOpen}
          onLogoClick={() => (isEvents && this.changeYear(-1))} isEvents={isEvents} smallWindow={blind} />
        <Menu opacity={(isMenuOpen) ? 1 : 0} zIndex={(isMenuOpen) ? 6 : 0} uniqYears={uniqYears} onMenuClick={this.handleMenuClick}
          hasContentFetched={hasContentFetched} />
        {!isMobile && isMenuOpen && <Copyright />}
        <div className={innerContainer} style={{ top: `-${scroll}%`, opacity: (!isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          <Events content={props} uniqYears={uniqYears} mbFontSize={eventsMbFontSize} mbBetweenElemsPos={this.mbYearsCellsPos}
            currentYear={currentYear} listPos={listPos} ballPos={ballPos} shift={shift}
            isEvents={isEvents} isStory={isStory} isMobile={isMobile} cooldownStory={cooldownStory}
            selectFromStoryToEvents={(dev, isScroll) => {this.changeYear(0); this.toggleSections(dev, isScroll);}}
            changeYear={this.changeYear} selectEventOnScroll={this.selectEventOnScroll} onInactiveListItemClick={this.selectEvent}
            onMbYearClick={this.handleMenuClick} listItemHeight={listItemHeight}
            toggleOpenEvent={this.toggleOpenEvent} isOpenEvent={isOpenEvent} getEventsElem={($el) => this.$Events = $el}
            getSlider={($slider) => this.$slider = $slider} years={years} selectEventsList={this.selectEventsList}
            listMarginTop={listScrollMob} listScroll={listScrollDesk} hasContentFetched={hasContentFetched} isMenuOpen={isMenuOpen}
            handleListWheel={this.handleWheel} />
        </div>
      </div>
    </div>;
  }
}
function mapStateToProps(state) {
  return state.content;
}
export default connect(mapStateToProps, { fetchContent })(App);
