import React, { Component } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import Slider from 'react-slick';
import YouTubePlayer from 'youtube-player';
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
    if (this.videoUrl && this.$vidContainer) this.initVideo();
  }

  initVideo = () => {
    const videoUrl = this.videoUrl;
    let vidId;
    if (videoUrl) {
      let cutUrl = videoUrl.split('v=')[1];
      cutUrl = cutUrl || videoUrl.split('youtu.be/')[1];
      vidId = cutUrl.split('?')[0];
    }
    const aspectRatio = 16 / 9;
    const vidWidth = this.$gallery.offsetWidth;
    this.vidHeight = vidWidth / aspectRatio;
    this.ytPlayer = YouTubePlayer(this.$vidContainer, {
      height: this.vidHeight,
      width: vidWidth,
      videoId: vidId
    });
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
    this.isPlayClicked = true;
    this.setState(prev => ({ isOverlayOpen: !prev.isOverlayOpen }));
    this.ytPlayer.playVideo();
  }

  render() {
    const { titles, content, currentEvent, getSlider, opacity, zIndex, isOpenEvent, closeEvent } = this.props;
    this.videoUrl = (this.hasContentFetched) ? content.events[currentEvent].fields.videoLink : null;
    // console.log(this.videoUrl);
    const photos = (!this.hasContentFetched) ? [] : this.getPhotosFromContent(content).photos[currentEvent];
    const photoElems = photos.map((item, idx) => 
      <div key={`Event${currentEvent}/${idx}`}>
        <img className={styles.sliderImg} src={item} alt={`${titles[currentEvent]}, image ${idx}`} />
      </div>
    );

    const vidPreview = (this.hasContentFetched) ? this.getPhotosFromContent(content).vidPreview[currentEvent] : null;

    const settings = {
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
        if (this.ytPlayer && this.isPlayClicked) {
          this.isPlayClicked = false;
          this.ytPlayer.stopVideo();
          this.setState(prev => ({ isOverlayOpen: !prev.isOverlayOpen }));
        }
      }
    };


    return (
      <div className={styles.OpenEvent} style={{ opacity: opacity, zIndex: zIndex }} >
        <div className={styles.gallery} ref={$el => this.$gallery = $el}>
          <Slider ref={$slider => getSlider($slider, currentEvent || null)} {...settings}>
            {isOpenEvent && !!this.videoUrl && <section className={styles.vidWrapper} key={`video_${currentEvent}`}>
              {!!vidPreview && this.state.isOverlayOpen && <div className={styles.overlay} style={{ backgroundImage: `url('${vidPreview}')` }}>
                <img className={styles.play} src={playImg} onClick={this.handlePlayClick} alt='Play' />
              </div>}
              <div></div>{/*element for React's insertBefore to work (div.video element transforms into iframe, so React doesn't recognize it)*/}
              <div className={styles.video} style={{ marginTop: `calc(50% - ((100% / 16 * 9) / 2))` }} ref={$el => this.$vidContainer = $el}></div>
            </section>}
            {photoElems}
          </Slider>
        </div>
        <div className={styles.article}>
          <h2 className={styles.title}>{titles[currentEvent]}</h2>
          <p className={styles.text}>{(content.events.length !== 0) && content.events[currentEvent].fields.text}</p>
          <Button caption='Back' onButtonClick={() => {
            this.setState({ isOverlayOpen: true });
            closeEvent();
          }} isEvent={true} />
        </div>
      </div>
    );
  }
}
// `calc(50% - ${this.vidHeight / 2}px)`
