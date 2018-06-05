import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from "react-slick";

export default class OpenEvent extends Component {
  constructor() {
    super();
    this.state = {
      currentMedia: 0
    };
  }

  getPhotos = () => {
    return this.events.map((event, idx) => {
      const urls = [];
      event.fields.photos.forEach(attributedImage => {
        this.props.content.images.forEach(asset => {
          if (asset.sys.id === attributedImage.sys.id) {
            urls.push(`https:${asset.fields.file.url}?w=700`);
          }
        });
      });
      return urls;
    });
  }

  render() {
    this.events = this.props.content.events;
    const titles = this.events.map(item => item.fields.title); // Is done in App component --> must be received in props
    const photos = this.getPhotos();
    const currentEvent = this.props.currentEvent;
    const photoElems = (photos.length === 0) ? null : photos[currentEvent].map((item, idx) => 
      <div key={`Event${currentEvent}/${idx}`}>
        <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
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
      swipe: false
    };
    return (
      <div className={styles.OpenEvent} style={{ opacity: this.props.opacity, zIndex: this.props.zIndex }} >
        <div className={styles.gallery}>
          <Slider ref={$slider => this.props.getSlider($slider, currentEvent || null)} {...settings}>
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
          <p className={styles.text}>{(this.events.length !== 0) && this.events[currentEvent].fields.text}</p>
          <Button caption='Back' onButtonClick={this.props.closeEvent} isEvent={true} />
        </div>
      </div>
    );
  }
}