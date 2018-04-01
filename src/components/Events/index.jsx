import React, { Component } from 'react';
import styles from './styles.css';
import Mindball from 'components/Mindball';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowPos: 0,
      currentYear: this.props.years[0],
      listPos: 0,
      scroll: 0
    };
    this.eventsList = ['Ericsson Ukraine', 'Yoga Studio Yoga23', 'SEMPRO', 'Mindball IDCEE', 'Art-Picnic', 'Microsoft Dev Day', 'Festival of Science', 'Active Day in Gulliver', 'Tea Cup Champ', 'Mindball in Bibliotech', 'Mindball in Atmasfera360', 'VedaLife']
  }

  componentDidMount() {
    this.props.onYearChange(this.props.years[0]);
  }
  
  onScroll = e => {
  }

  handleKeyDown = e => {
    let currentYear = this.props.years[0];
    const secondYearThreshold = 2;
    if (this.state.listPos > 2 && this.state.listPos < 9) {
      this.props.onYearChange(this.props.years[1]);
    } else if (this.state.listPos >= 9) {
      this.props.onYearChange(this.props.years[2]);
    } else {
      this.props.onYearChange(this.props.years[0]);
    }
    switch (e.key) {
      case 'ArrowDown':
        if (this.state.listPos === (this.eventsList.length - 1)) break;
        if (this.state.listPos < 3 || this.state.listPos > (this.eventsList.length - 5)) {
          this.setState(prevState => ({listPos: prevState.listPos + 1, arrowPos: prevState.arrowPos + 60}));
        } else {
          this.setState(prevState => ({scroll: prevState.scroll - 60, listPos: prevState.listPos + 1}));
        }
        break;
      case 'ArrowUp':
        if (this.state.listPos === 0) break;
        if (this.state.listPos < 4 || this.state.listPos > (this.eventsList.length - 4)) {
          this.setState(prevState => ({listPos: prevState.listPos - 1, arrowPos: prevState.arrowPos - 60}));
        } else {
          this.setState(prevState => ({scroll: prevState.scroll + 60, listPos: prevState.listPos - 1}));
        }
        break;
      default:
        return;
    }
  }

  render() {
    const events = this.eventsList.map((item, idx) => 
      <p key={item} className={(this.state.listPos === idx) ? styles.list_item__selected : styles.list_item}>{item}</p>
    );
    
    return (
      <section className={styles.Events} onWheel={this.onScroll} onKeyDown={this.handleKeyDown} tabIndex='0'>
        <div className={styles.list}>
          <div className={styles.list_wrapper} style={{top: this.state.scroll}}>
            {events}
          </div>
          <div className={styles.arrow} style={{top: this.state.arrowPos}}></div>
        </div>
        {/*<Mindball position={this.state.ballPosition || this.defaultBallPosition} />*/}
      </section>
    );
  }
}