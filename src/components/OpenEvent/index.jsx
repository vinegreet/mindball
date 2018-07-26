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
      isOverlayOpen: true
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
    this.setState(prev => ({ isOverlayOpen: !prev.isOverlayOpen }));
    this.ytPlayer.playVideo();
  }

  getYtPlayer = e => {
    this.ytPlayer = e.target;
  }

  render() {
    const { titles, content, currentEvent, getSlider, opacity, zIndex, isOpenEvent, closeEvent } = this.props;
    this.videoUrl = (this.hasContentFetched) ? content.events[currentEvent].fields.videoLink : null;
    const photos = (!this.hasContentFetched) ? [] : this.getPhotosFromContent(content).photos[currentEvent];
    const photoElems = photos.map((item, idx) => 
      <div key={`Event${currentEvent}/${idx}`}>
        <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
      </div>
    );

    const vidPreview = (this.hasContentFetched) ? this.getPhotosFromContent(content).vidPreview[currentEvent] : null;

    const gallerySettings = {
      autoplay: false,
      autoplaySpeed: 4000,
      speed: 1000,
      fade: true,
      dots: true,
      infinite: true,
      arrows: false,
      touchMove: false,
      swipe: false,
      afterChange: () => {
        if (this.ytPlayer) {
          this.ytPlayer.stopVideo();
          if (!this.state.isOverlayOpen) this.setState(prev => ({ isOverlayOpen: !prev.isOverlayOpen }));
        }
      }
    };

    return (
      <div className={styles.OpenEvent} style={{ opacity: opacity, zIndex: zIndex }} >
        <div className={styles.gallery} ref={$el => this.$gallery = $el}>
          <Slider ref={$slider => getSlider($slider, currentEvent || null)} {...gallerySettings}>
            {isOpenEvent && !!this.videoUrl && <section className={styles.vidWrapper} key={`video_${currentEvent}`}>
              {!!vidPreview && this.state.isOverlayOpen && <div className={styles.overlay} style={{ backgroundImage: `url('${vidPreview}')` }}>
                <img className={styles.play} src={playImg} onClick={this.handlePlayClick} alt='Play' />
              </div>}
              {this.vidOpts && <YouTube className={styles.video} videoId={this.vidId} opts={this.vidOpts} onReady={this.getYtPlayer} />}
            </section>}
            {photoElems}
          </Slider>
        </div>
        <div className={styles.article}>
          <h2 className={styles.title}>{titles[currentEvent]}</h2>
          <p className={styles.text}>{(content.events.length !== 0) && content.events[currentEvent].fields.text}</p>
          <Button caption='Back' onButtonClick={() => {
            if (this.ytPlayer) this.ytPlayer = null;
            this.setState({ isOverlayOpen: true });
            closeEvent();
          }} isEvent={true} />
        </div>
      </div>
    );
  }
}
