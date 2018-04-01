import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.css';
import BgText from 'components/BgText';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Initial from 'components/Initial';
import Story from 'components/Story';
import Events from 'components/Events';
// import Inside from 'components/Inside';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bgText: '',
      currentYear: '',
      isEvents: false,
      isInitial: true,
      // isStory: false,
      isMenuOpen: false,
      isMobile: null,
      isStory: false,
      scroll: 0,
      years: [2015, 2014, 2013]
    };
  }

  componentDidMount() {
    this.setState({isMobile: window.outerWidth < 988});
  }

  scrollDown = () => {
    // this.setState({scroll: '-100%'});
    this.setState(prevState => ({
      isInitial: false,
      isStory: !prevState.isStory,
      scroll: '-100%'
    }));
  }

  /*handleBallFinish = () => {
    this.scrollDown();
  }

  handleButtonClick = () => {
    this.scrollDown();
  }*/

  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        // this.scrollDown();
        break;
      case 'ArrowUp':
        // this.setState({scroll: 0});
        break;
      default:
        return;
    }
  }

  handleMenuClick = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  }

  handleStoryClick = () => {
    // this.setState(prevState => ({isEvents: !prevState.isEvents}));
    // this.setState({scroll: '-200%'});
    this.setState(prevState => ({
      isEvents: !prevState.isEvents,
      isStory: !prevState.isStory,
      scroll: '-200%'
    }));
  }

  handleYearChange = year => {
    this.setState({currentYear: year});
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
        <div className={styles.bubbles} style={{opacity: (!this.state.isMenuOpen) ? 0.5 : 0}}></div>
        <BgText isInitial={this.state.isInitial} text={bgText} />
        <Header onMenuClick={this.handleMenuClick} events={this.state.isEvents} />
        <Menu years={this.state.years} opacity={(this.state.isMenuOpen) ? 1 : 0} zIndex={(this.state.isMenuOpen) ? 6 : 0} />
        {/*this.state.isMenuOpen && <Menu years={this.state.years} />*/}
        <div className={styles.innerContainer} style={{top: this.state.scroll, opacity: (!this.state.isMenuOpen) ? 1 : 0}}>
          <Initial onBallFinished={this.scrollDown} onButtonClick={this.scrollDown} />
          <Story onButtonClick={this.handleStoryClick} />
          <Events years={this.state.years} onYearChange={this.handleYearChange} />
        </div>
      </div>
    </div>;
  }
}
// opacity={(this.state.isEvents) ? 0 : 1} zIndex={(this.state.isEvents) ? 0 : 6}
// opacity={(!this.state.isEvents) ? 1 : 0} zIndex={(!this.state.isEvents) ? 6 : 0}
// isMobile={this.state.isMobile}
// <Route exact path="/" component={Inside} />
// <h1 style={{color: '#fff', margin: '0px'}}>{this.state.scroll}</h1>