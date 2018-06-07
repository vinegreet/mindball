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
      bgText: '',
      cooldownStory: false,
      currentEventsListPos: 0,
      currentYear: '',
      isEvents: false,
      isMenuOpen: false,
      isMobile: null,
      isOpenEvent: false,
      isStory: false,
      scroll: 0,
      ballPos: 0,
      listPos: 0,
      scrollEventsList: 0,
      wheel: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.mbBetweenElems = {};
    this.eventsMbFontSize = 0.0181;
    this.listItemHeight = 3.75;
    this.devMode = window.location.href.search('localhost') >= 0;
  }

  componentWillMount() {
    this.props.fetchContent();
  }

  componentDidMount() {
    this.setState({ isMobile: window.outerWidth < 988 });
    // this.isMobile = window.outerWidth < 988;
    this.isMobile = window.innerWidth < 988;
    // console.log(this.isMobile, this.state.isMobile);

    this.changeYear(0, true);
    this.setState({ ballPos: this.mbYearsCellsPos[0] + 10 });

    if (this.devMode) this.selectEventOnClick(0);
    if (!this.devMode && this.isMobile) this.scrollDown();
    // this.isMobile && this.scrollDown();

    // window.addEventListener('resize', this.measureFontSize);
  }

  scrollDown = () => {
    this.setState(prev => ({ isStory: !prev.isStory, scroll: (this.isMobile) ? 0 : '-100%', cooldownStory: (this.isMobile) ? false : true }));
    setTimeout(() => {this.setState({ cooldownStory: false });}, 1500);
  }

  handleSandwichClick = () => {
    this.setState(prev => ({ isMenuOpen: !prev.isMenuOpen }));
  }

  selectEventOnClick = (idx, isMenuClick, isMouseOver) => {
    // console.log(idx);
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
    const newIdx = (isMenuClick) ? this.years.indexOf(this.uniqYears[idx]) : idx;
    // this.changeYear(newIdx);
    this.changeYear(this.uniqYears[idx]);
    this.setState({ listPos: newIdx, isMenuOpen: false });
    // console.log('hi');
    if (isMouseOver) return;
    // console.log('hey');
    if (newIdx < 3) {
      this.setState({ scrollEventsList: 0 });
    } else if (newIdx > (this.items.length - 4)) {
      this.setState({ scrollEventsList: (this.items.length - 7) * -this.listItemHeight });
    } else {
      this.setState({ scrollEventsList: (newIdx - 3) * -this.listItemHeight }); // = 0
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
    this.setState({ currentYear: this.uniqYears[idx] });
    if (this.prevYear !== this.years[idx]) {
      // const currentYearIdx = this.uniqYears.indexOf(this.years[idx]);
      // this.setState({ ballPos: this.mbYearsCellsPos[idx] + 10 });
    }
      this.setState({ ballPos: this.mbYearsCellsPos[idx] + 10 });
    // isFirstCall === undefined && (this.prevYear = this.years[idx]);
  }

  toggleOpenEvent = () => {
    this.setState(prev => ({ isOpenEvent: !prev.isOpenEvent }));
  }

  render() {
    this.items = this.props.events;
    this.years = this.items.map(item => item.fields.date.split('-')[0]);
    this.uniqYears = [...new Set(this.years)];
    this.titles = this.items.map(item => item.fields.title);
    const uniqYearsIdx = this.uniqYears.map(uniqYear => this.years.findIndex(year => year === uniqYear));

    let bgText = '';

    this.swipeCoolDown = false;

    if (this.$Events) {
      ontouch(this.$Events, (e, dir, phase, swipeType, dist) => {
        const distance = (!isNaN(dist)) ? Math.abs(dist) : 0;
        const currYear = parseInt(this.uniqYears.indexOf(this.state.currentYear));
        const nextYear = currYear + 1;
        const prevYear = currYear - 1;
        if (phase === 'end' && !this.swipeCoolDown && this.state.isEvents || this.state.isStory) {
          /*console.log(e.target);
          console.log(e.target.innerHTML);*/
          const outerHtml = e.target.outerHTML;
          const innerHtml = e.target.innerHTML;
          const isListItem = outerHtml.search('listItemTitle') === 10;
          const isSliderButton = outerHtml.search('button') === 1;
          if (distance < 150) {
            if (innerHtml.search('Back') >= 0) {
              this.setState({ isOpenEvent: false });
              this.$slider.slickGoTo(0, true);
              this.$slider.slickPause();
              // console.log('close event');
            } else if (!this.state.isOpenEvent && this.state.isEvents && isListItem) {
              const idx = this.titles.indexOf(innerHtml);
              this.setState({ listPos: idx });
              // console.log(this.state.listPos);
              this.toggleOpenEvent();
              // this.$slider.slickGoTo(0, true);
              // this.$slider.slickPlay();
            } else if (isSliderButton) {
              const idx = this.state.listPos;
              // console.log(parseInt(innerHtml));
              this.$slider.slickGoTo(parseInt(innerHtml) - 1, true);
            }
            this.swipeCoolDown = true;
            setTimeout(() => {this.swipeCoolDown = false;}, 300);
            return;
          }
          // console.log(dir, distance);
          if (dir === 'left' && distance > 250 && nextYear < this.uniqYears.length) {
            // console.log(nextYear);
            this.selectEventOnClick(nextYear, true);
          }
          if (dir === 'right' && distance > 250 && prevYear >= 0) {
            // console.log(prevYear);
            this.selectEventOnClick(prevYear, true);
          }
          this.swipeCoolDown = true;
          setTimeout(() => {this.swipeCoolDown = false;}, 300);
        }
      });
    }

    
    if (this.state.isMenuOpen) {
      bgText = 'Menu';
    } else if (this.state.isStory) {
      bgText = 'Story';
    } else if (this.state.isEvents) {
      bgText = this.state.currentYear;
    }

    this.mbYearsCellsLength = this.uniqYears.length;
    this.mbInnerHeightWithPadding = 1900;
    // this.mbInnerHeight = this.mbInnerHeightWithPaddingAndBorder - (8 * 2 + 4 * 2);
    this.mbInnerHeight = this.mbInnerHeightWithPadding - (8 * 2);
    // this.mbCellHeight = 60 + 4 * 2;
    this.mbCellHeight = 60;
    this.mbYearsCellsPos = this.uniqYears.map((year, idx) => 
      ((this.mbInnerHeight / this.mbYearsCellsLength) * (idx + 1)) - ((this.mbCellHeight / 2) * ((idx + 1) / 2)) - (4 * 1.2 * (idx + 1))
    ); // the 1.2 value is added just to make quick fix; badly positioned if new unique year added; see local file \Mindball\test\Calculating_cells_positions.txt

    return <div className={styles.App} tabIndex='0' onTouchEnd={null/*() => console.log('touch')*/}>
      <div className={styles.wrapper}>
        {!this.devMode && !this.isMobile && <Bubbles opacity={(!this.state.isMenuOpen) ? 1 : 0} top={this.state.scroll} />}
        {this.devMode/* && false*/ && <div className={styles.bubbles} style={{ opacity: (!this.state.isMenuOpen) ? 0.5 : 0 }}></div>}
        <BgText text={bgText} isMobile={this.isMobile} />
        <Header onSandwichClick={this.handleSandwichClick} events={this.state.isEvents} />
        <Menu opacity={(this.state.isMenuOpen) ? 1 : 0} zIndex={(this.state.isMenuOpen) ? 6 : 0} onMenuClick={this.selectEventOnClick}
          uniqYears={this.uniqYears} />
        <div className={styles.innerContainer} style={{ top: this.state.scroll, opacity: (!this.state.isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          <Events content={this.props} uniqYears={this.uniqYears} mbFontSize={this.eventsMbFontSize} mbBetweenElemsPos={this.mbYearsCellsPos}
            currentYear={this.state.currentYear} listPos={this.state.listPos} scroll={this.state.scrollEventsList} ballPos={this.state.ballPos}
            isEvents={this.state.isEvents} isStory={this.state.isStory} isMobile={this.isMobile} cooldownStory={this.state.cooldownStory}
            toggleStoryAndEvents={this.toggleSections} selectFromStoryToEvents={() => {this.changeYear(0); this.toggleSections();}}
            changeYear={this.changeYear} selectEventOnScroll={this.selectEventOnScroll} onInactiveListItemClick={this.selectEventOnClick}
            onMbYearClick={this.selectEventOnClick} listItemHeight={this.listItemHeight} scrollEventsList={this.state.scrollEventsList}
            toggleOpenEvent={this.toggleOpenEvent} isOpenEvent={this.state.isOpenEvent} getEventsElem={($el) => this.$Events = $el}
            getSlider={($slider) => this.$slider = $slider} years={this.years} />
        </div>
      </div>
    </div>;
  }
}
function mapStateToProps(state) {
  return { events: state.content.items, images: state.content.img, story: state.content.story };
}
export default connect(mapStateToProps, { fetchContent })(App);