import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import { titles, texts, photos } from 'components/items.js';
import Slider from "react-slick";

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
    // const currentEvent = (this.props.currentEvent >= 0) ? this.props.currentEvent : 0;
    const currentEvent = this.props.currentEvent;
    const photoElems = photos[currentEvent].map((item, idx) => 
      <div key={`${currentEvent}/${item}`}>
        <img className={styles.sliderImg} src={`http://zotsmebel.com.ua/i/${currentEvent}/${item}`} 
        alt={`${titles[currentEvent]} - ${item}`} />
      </div>
    );
    const settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      fade: true,
      dots: true,
      infinite: true,
      arrows: false,
      touchMove: false,
      swipe: true
    };
    return (
      <div className={styles.OpenEvent} style={{ opacity: this.props.opacity, zIndex: this.props.zIndex }} >
        <div className={styles.gallery} 
          style={{ 
            // backgroundImage: `url(http://zotsmebel.com.ua/i/${currentEvent}/${photos[currentEvent][0]})`
          }}>
          <Slider ref={$slider => this.props.getSlider($slider)} {...settings}>
            {photoElems}
          </Slider>
          {/*<div className={styles.pager}>
            <div className={styles.dot_active}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>*/}
        </div>
        <div className={styles.article}>
          <h2 className={styles.title}>{titles[currentEvent]}</h2>
          <p className={styles.text}>{texts[currentEvent]}</p>
          <Button caption='Back' onButtonClick={this.props.closeEvent} isEvent={true} />
        </div>
      </div>
    );
  }
}
//  style={{height: `${this.props.height}px`}}
// <Button caption='Scroll down' onClick={this.setState({ballPosition: 100})} />