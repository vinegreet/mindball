import React, { Component } from 'react';
import styles from './styles.css';
import Story from 'components/Story';
import Mindball from 'components/Mindball';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowPos: 0,
      listPos: 0,
      scroll: 0,
      wheel: 0
    };
    this.isFirefox = typeof InstallTrigger !== 'undefined';
    this.wheel = 0;
    this.ticking = false;
    this.eventsList = ['Ericsson Ukraine', 'Yoga Studio Yoga23', 'SEMPRO', 'Mindball IDCEE', 'Art-Picnic', 'Microsoft Dev Day', 'Festival of Science', 'Active Day in Gulliver', 'Tea Cup Champ', 'Mindball in Bibliotech', 'Mindball in Atmasfera360', 'VedaLife']
    this.defaultBallPosition = 22;
  }

  changeYear(idx = 0) {
    this.props.onYearChange(this.props.years[idx]);
  }

  componentDidMount() {
    this.changeYear();
  }
  
  handleScroll = delta => {
    // if (this.state.listPos === 0 && delta < 0) return this.ticking = false;
    if (this.state.listPos === 0 && delta < 0) return this.props.toggleStoryAndEvents();
    if (this.state.listPos === (this.eventsList.length - 1) && delta > 0) return this.ticking = false;
    if (this.state.listPos > 2 && this.state.listPos < 9) {
      this.changeYear(1);
    } else if (this.state.listPos >= 9) {
      this.changeYear(2);
    } else {
      this.changeYear();
    }
    const newDelta = (this.isFirefox) ? delta * 34 : delta;
    this.wheel += newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        if (this.state.listPos < 3 || this.state.listPos > (this.eventsList.length - 5)) {
          this.setState(prev => ({ listPos: prev.listPos + 1 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos + 1, scroll: prev.scroll - 60 }));
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (this.state.listPos < 4 || this.state.listPos > (this.eventsList.length - 4)) {
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
    const events = this.eventsList.map((item, idx) => 
      <div key={item} className={(this.state.listPos === idx) ? styles.listItem_selected : styles.listItem}>
        <p className={styles.text}>{item}</p>
        <div className={styles.line}></div>
        <div className={styles.arrow}></div>
      </div>
    );
    
    return (
      <section className={styles.Events} onWheel={this.onWheel}>
        <Story onButtonClick={this.props.toggleStoryAndEvents} opacity={(this.props.isStory) ? 1 : 0} zIndex={(this.props.isStory) ? 10 : -1}
          onWheelDown={() => {this.props.toggleStoryAndEvents; console.log('Events, roger')}} />
        <div className={styles.list} style={{opacity: (this.props.isEvents) ? 1 : 0, zIndex: (this.props.isEvents) ? 10 : -1}}>
          <div className={styles.listWrapper} style={{top: this.state.scroll}}>
            {events}
          </div>
        </div>
        <Mindball position={this.defaultBallPosition} years={this.props.years}
          currentYear={this.props.isEvents && this.props.currentYear} size={0.3} />
      </section>
    );
  }
}