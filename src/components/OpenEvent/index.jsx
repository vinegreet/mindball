import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from 'react-slick';
import playImg from 'img/play.svg';

export default class OpenEvent extends Component {
  constructor() {
    super();
    /*this.state = {
      currentMedia: 0
    };*/
  }

  getPhotos = () => {
    return this.events.map(event => {
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
    console.log(this.events.length);
    const titles = this.events.map(item => item.fields.title); // Is done in App component --> must be received in props
    const photos = this.getPhotos();
    const currentEvent = this.props.currentEvent;
    const photoElems = (photos.length === 0) ? null : photos[currentEvent].map((item, idx) => 
      <div key={`Event${currentEvent}/${idx}`}>
        <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
      </div>
    );

    /*const videoUrl = this.events[currentEvent].fields.videoLink;
    const attrPreviewUrl = this.events[currentEvent].fields.videoPreview;*/
    // const url =  
      /*console.log(videoUrl);
      console.log(attrPreviewUrl);*/
    console.log(this.props.content.images);
    /*const video = (!videoUrls) ? null : (
      <div className={styles.vidWrapper} key={`video_${currentEvent}`}>
        <div className={styles.overlay} style={ backgroundImage: `url('${videoUrls[currentEvent]}')`}>
          <img src={playImg} alt='Play'>
        </div>
        <iframe className={styles.video}
          frameborder="0"
          allowfullscreen="1"
          allow="autoplay; encrypted-media"
          width="1109.42"
          height="454.7109375"
          src={`https://www.youtube.com/embed/${videoUrls[currentEvent]}?enablejsapi=1`}>
        </iframe>
      </div>
      );*/
    const settings = {
      autoplay: true,
      autoplaySpeed: 4000,
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
            {this.props.isOpenEvent && null && video}
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
{/*&amp;origin=http%3A%2F%2Fmindball.com.ua&amp;widgetid=3*/}
/*<div className={styles.video} data-vid-id="[[+video]]"></div>*/
