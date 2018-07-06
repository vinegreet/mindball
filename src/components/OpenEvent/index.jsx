import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from 'react-slick';
import playImg from 'img/play.svg';

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

const getPhotosFromContent = content => {
  const imagesUrlsGroupedById = content.images.reduce((acc, image) => {
    acc[image.sys.id] = image.fields.file.url;
    return acc;
  }, {});
  return content.events.map(event => event.fields.photos.map(photo => `https:${imagesUrlsGroupedById[photo.sys.id]}?w=700`));
};

export default function OpenEvent({ titles, content, currentEvent, getSlider, opacity, zIndex, isOpenEvent, closeEvent }) {
  const photos = getPhotosFromContent(content)[currentEvent] || [];
  const photoElems = photos.map((item, idx) => 
    <div key={`Event${currentEvent}/${idx}`}>
      <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
    </div>
  );

  /*const videoUrl = this.events[currentEvent].fields.videoLink;
  const attrPreviewUrl = this.events[currentEvent].fields.videoPreview;*/
  // const url =  
    /*console.log(videoUrl);
    console.log(attrPreviewUrl);*/

  // console.log(content.images);
  
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
// console.log(currentEvent);
  return (
    <div className={styles.OpenEvent} style={{ opacity: opacity, zIndex: zIndex }} >
      <div className={styles.gallery}>
        <Slider ref={$slider => getSlider($slider, currentEvent || null)} {...settings}>
          {isOpenEvent && null && video}
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
        <p className={styles.text}>{(content.events.length !== 0) && content.events[currentEvent].fields.text}</p>
        <Button caption='Back' onButtonClick={closeEvent} isEvent={true} />
      </div>
    </div>
  );
}
{/*&amp;origin=http%3A%2F%2Fmindball.com.ua&amp;widgetid=3*/}
/*<div className={styles.video} data-vid-id="[[+video]]"></div>*/
