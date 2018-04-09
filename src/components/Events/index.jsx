import React, { Component } from 'react';
import styles from './styles.css';
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
  }

  changeYear(idx = 0) {
    this.props.onYearChange(this.props.years[idx]);
  }

  componentDidMount() {
    this.changeYear();
  }
  
  handleScroll = delta => {
    if (this.state.listPos === 0 && delta < 0) return this.ticking = false;
    if (this.state.listPos === (this.eventsList.length - 1) && delta > 0) return this.ticking = false;
    if (this.state.listPos > 2 && this.state.listPos < 9) {
      this.changeYear(1);
    } else if (this.state.listPos >= 9) {
      this.changeYear(2);
    } else {
      this.changeYear();
    }
    const newDelta = (this.isFirefox) ? delta * 34 : delta;
    this.wheel = this.wheel + newDelta;
    if (newDelta > 0) {
      if (this.wheel >= 100) {
        if (this.state.listPos < 3 || this.state.listPos > (this.eventsList.length - 5)) {
          this.setState(prev => ({ listPos: prev.listPos + 1, arrowPos: prev.arrowPos + 60 }));
        } else {
          this.setState(prev => ({ listPos: prev.listPos + 1, scroll: prev.scroll - 60 }));
        }
        this.wheel = 0;
      }
    } else {
      if (this.wheel <= -100) {
        if (this.state.listPos < 4 || this.state.listPos > (this.eventsList.length - 4)) {
          this.setState(prev => ({ listPos: prev.listPos - 1, arrowPos: prev.arrowPos - 60 }));
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
      <p key={item} className={(this.state.listPos === idx) ? styles.listItem_selected : styles.listItem}>{item}</p>
    );
    
    return (
      <section className={styles.Events} onWheel={this.onWheel}>
        <div className={styles.list}>
          <div className={styles.listWrapper} style={{top: this.state.scroll}}>
            {events}
          </div>
          <div className={styles.arrow} style={{top: this.state.arrowPos}}></div>
        </div>
        {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
      </section>
    );
  }
}