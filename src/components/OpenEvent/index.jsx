import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import playImg from 'img/play.svg';

export default class OpenEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayOpen: true
    };
    this.gallerySettings = {
      autoplay: false,
      autoplaySpeed: 4000,
      speed: 1000,
      fade: true,
      dots: true,
      infinite: true,
      arrows: false,
      touchMove: false,
      swipe: false,
      afterChange: idx => {
        if (this.ytPlayer && idx !== 0) {
          this.setState({ overlayOpen: true });
          // this.ytPlayer.stopVideo();
        } else {
          this.forceUpdate();
        }
      }
    };
  }

  componentDidUpdate() {
    const { content, currentEvent } = this.props;
    this.hasContentFetched = content.events[currentEvent];
    // this.videoUrl = (this.hasContentFetched) ? content.events[currentEvent].fields.videoLink : null;
    if (this.videoUrl) this.initVideo();
  }

  initVideo = () => {
    const videoUrl = this.videoUrl;
    if (videoUrl) {
      let cutUrl = videoUrl.split('v=')[1];
      cutUrl = cutUrl || videoUrl.split('youtu.be/')[1];
      this.vidId = cutUrl.split('?')[0];
    }
    const aspectRatio = 16 / 9;
    const vidWidth = this.$gallery.offsetWidth;
    this.vidHeight = vidWidth / aspectRatio;
    this.vidOpts = {
      height: this.vidHeight,
      width: vidWidth
    };
  }

  getPhotosFromContent = content => {
    const imagesUrlsGroupedById = content.images.reduce((acc, image) => {
      acc[image.sys.id] = image.fields.file.url;
      return acc;
    }, {});
    const urls = {};
    urls.vidPreview = [];
    urls.photos = content.events.map(event => {
      const eventFields = event.fields;
      const vidPreview = ('videoPreview' in eventFields) ? `https:${imagesUrlsGroupedById[eventFields.videoPreview.sys.id]}?w=700` : null;
      urls.vidPreview.push(vidPreview);
      return eventFields.photos.map(photo => `https:${imagesUrlsGroupedById[photo.sys.id]}?w=700`);
    });
    return urls;
  }

  handlePlayClick = () => {
    this.setState({ overlayOpen: false });
    if (!this.ytPlayer) {
      this.initVideo();
    }
    // this.ytPlayer.playVideo();
    setTimeout(() => {
      this.ytPlayer.playVideo();
    }, 2000);
  }

  getYtPlayer = e => {
    this.ytPlayer = e.target;
    if (!this.state.overlayOpen) this.ytPlayer.playVideo();
  }

  render() {
    const { props, state, handlePlayClick, hasContentFetched, gallerySettings, getPhotosFromContent, getYtPlayer, vidId, vidOpts, $slider } = this;
    const { titles, content, currentEvent, getSlider, opacity, zIndex, isOpenEvent, closeEvent } = props;
    const { overlayOpen } = state;
    const { events } = content;
    this.videoUrl = (hasContentFetched) ? events[currentEvent].fields.videoLink : null;
    const photos = (hasContentFetched) ? getPhotosFromContent(content).photos[currentEvent] : [];
    const photoElems = photos.map((item, idx) => 
      <div key={`Event${currentEvent}/${idx}`}>
        <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
      </div>
    );

    let isFirstSlide = true;
    if ($slider) {
      const $activeSlide = $slider.innerSlider.list.querySelector('.slick-active');
      if ($activeSlide) {
        const currentSlide = $activeSlide.dataset.index;
        isFirstSlide = currentSlide === '0';
        if (isFirstSlide) this.initVideo();
      }
    }

    const vidPreview = (hasContentFetched) ? getPhotosFromContent(content).vidPreview[currentEvent] : null;



    const { article, gallery, OpenEvent, overlay, play, text, title, video, vidWrapper } = styles;

    return (
      <div className={OpenEvent} style={{ opacity: opacity, zIndex: zIndex }} >
        <div className={gallery} ref={$el => this.$gallery = $el}>
          <Slider ref={$slider => {
            this.$slider = $slider;
            getSlider($slider, currentEvent || null);
          }} {...gallerySettings}>
            {isOpenEvent && this.videoUrl && <section className={vidWrapper} key={`video_${currentEvent}`}>
              {vidPreview && overlayOpen && <div className={overlay} style={{ backgroundImage: `url('${vidPreview}')` }}>
                <img className={play} src={playImg} onClick={this.handlePlayClick} alt='Play' />
              </div>}
              {vidOpts && isFirstSlide && <YouTube className={video} videoId={this.vidId} opts={vidOpts} onReady={getYtPlayer} />}
            </section>}
            {photoElems}
          </Slider>
        </div>
        <div className={article}>
          <h2 className={title}>{titles[currentEvent]}</h2>
          <p className={text}>{(events.length !== 0) && events[currentEvent].fields.text}</p>
          <Button caption='Back' onButtonClick={() => {
            this.setState({ overlayOpen: true });
            closeEvent();
          }} isEvent={true} />
        </div>
      </div>
    );
  }
}
