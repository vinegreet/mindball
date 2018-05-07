import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import { titles, texts, photos } from 'components/items.js';

export default class OpenEvent extends Component {
  constructor() {
    super();
    this.state = {
      currentMedia: 0
    };
  }

  onScroll = e => {
  };

  render() {
    const currentEvent = (this.props.currentEvent >= 0) ? this.props.currentEvent : 0;
    return (
      <div className={styles.OpenEvent} style={{ opacity: this.props.opacity, zIndex: this.props.zIndex }} >
        <div className={styles.gallery} 
          style={{ 
            backgroundImage: `url(http://zotsmebel.com.ua/i/${currentEvent}/${photos[currentEvent][0]})`
          }}>
          <div className={styles.pager}>
            <div className={styles.dot_active}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
        <div className={styles.article}>
          <h2 className={styles.title}>{titles[this.props.currentEvent]}</h2>
          <p className={styles.text}>{texts[this.props.currentEvent]}</p>
          <Button caption='Back' onButtonClick={this.props.closeEvent} isEvent={true} />
        </div>
      </div>
    );
  }
}
//  style={{height: `${this.props.height}px`}}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />