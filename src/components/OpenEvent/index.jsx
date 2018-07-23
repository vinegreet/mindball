import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from 'react-slick';
import playImg from 'img/play.svg';

const settings = {
  autoplay: false,
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
  // const photos = content.events.map(event => event.fields.photos.map(photo => `https:${imagesUrlsGroupedById[photo.sys.id]}?w=700`));
  // const videoPreview = 
  const urls = {};
  urls.vidPreview = [];
  urls.photos = content.events.map(event => {
    const eventFields = event.fields;
    const vidPreview = ('videoPreview' in eventFields) ? `https:${imagesUrlsGroupedById[eventFields.videoPreview.sys.id]}?w=700` : null;
    urls.vidPreview.push(vidPreview);
    return eventFields.photos.map(photo => `https:${imagesUrlsGroupedById[photo.sys.id]}?w=700`);
  });
  return urls;
};

export default function OpenEvent({ titles, content, currentEvent, getSlider, opacity, zIndex, isOpenEvent, closeEvent }) {
  const hasContentFetched = content.events[currentEvent];
  const photos = (!hasContentFetched) ? [] : getPhotosFromContent(content).photos[currentEvent];
  const photoElems = photos.map((item, idx) => 
    <div key={`Event${currentEvent}/${idx}`}>
      <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
    </div>
  );

  const videoUrl = (hasContentFetched) ? content.events[currentEvent].fields.videoLink : null;
  const vidPreview = (hasContentFetched) ? getPhotosFromContent(content).vidPreview[currentEvent] : null;
  const aspectRatio = 16 / 9;
  const vidWidth = 455;
  const vidHeight = vidWidth / aspectRatio;
  let vidId;
  if (hasContentFetched && videoUrl) {
    let cutUrl = videoUrl.split('v=')[1];
    cutUrl = cutUrl || videoUrl.split('youtu.be/')[1];
    vidId = cutUrl.split('?')[0];
  }
  const video = (!videoUrl) ? null : (
    <div className={styles.vidWrapper} key={`video_${currentEvent}`}>
      {!!vidPreview && <div className={styles.overlay} style={{ backgroundImage: `url('${vidPreview}')` }}
        onClick={null}>
        <img className={styles.play} src={playImg} alt='Play' />
      </div>}
      <iframe className={styles.video}
        style={{ marginTop: `calc(50% - ${vidHeight / 2}px)` }}
        frameBorder="0"
        allowFullScreen="1"
        allow="autoplay; encrypted-media"
        width={vidWidth}
        height={vidHeight}
        src={`https://www.youtube.com/embed/${vidId}?enablejsapi=1`}>
      </iframe>
    </div>
  );

  return (
    <div className={styles.OpenEvent} style={{ opacity: opacity, zIndex: zIndex }} >
      <div className={styles.gallery}>
        <Slider ref={$slider => getSlider($slider, currentEvent || null)} {...settings}>
          {isOpenEvent && !!videoUrl && video}
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
