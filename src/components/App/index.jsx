import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import BgText from 'components/BgText';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Initial from 'components/Initial';
import Events from 'components/Events';
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
      scroll: 0
    };
  }

  componentDidMount() {
    this.setState({ isMobile: window.outerWidth < 988 });
    // if (window.location.href.search('localhost') >= 0) this.toggleSections(true);
  }

  scrollDown = () => {
    this.setState(state => ({
      isStory: !state.isStory,
      scroll: '-100%'
    }));
  }

  handleKeyDown = e => {
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
  }

  handleSandwichClick = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }));
  }

  handleMenuClick = idx => {
    console.log(idx);
    this.setState({ currentEventsListPos: idx });
  }

  toggleSections = (dev) => {
    if (dev === true) {
      this.setState(state => ({
        isStory: !state.isStory,
        // isEvents: !state.isEvents,
        scroll: '-100%'
      }));
      return;
    }
    // console.log(`isStory: ${this.state.isStory}\nisEvents: ${this.state.isEvents}`);
    this.setState(state => ({ isEvents: !state.isEvents, isStory: !state.isStory }));
  }

  handleYearChange = year => {
    this.setState({ currentYear: year });
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
    return <div className={styles.App} onKeyDown={this.handleKeyDown} tabIndex='0'>
      <div className={styles.wrapper}>
        <div className={styles.bubbles} style={{ opacity: (!this.state.isMenuOpen) ? 0.5 : 0 }}></div>
        <BgText text={bgText} />
        <Header onSandwichClick={this.handleSandwichClick} events={this.state.isEvents} />
        <Menu opacity={(this.state.isMenuOpen) ? 1 : 0} zIndex={(this.state.isMenuOpen) ? 6 : 0} onMenuClick={this.handleMenuClick} />
        {/*this.state.isMenuOpen && <Menu years={this.state.years} />*/}
        <div className={styles.innerContainer} style={{ top: this.state.scroll, opacity: (!this.state.isMenuOpen) ? 1 : 0 }}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          {/*<Story onButtonClick={this.handleStoryClick} />*/}
          <Events onYearChange={this.handleYearChange} currentYear={this.state.currentYear}
            currentEventsListPos={this.state.currentEventsListPos} toggleStoryAndEvents={this.toggleSections}
            isEvents={this.state.isEvents} isStory={this.state.isStory} />
        </div>
      </div>
    </div>;
  }
}

  /*handleBallFinish = () => {
    this.scrollDown();
  }

  handleButtonClick = () => {
    this.scrollDown();
  }*/
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>
// <Route exact path="/" component={Inside} />
