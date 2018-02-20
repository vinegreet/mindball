import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from 'actions/events';
import styles from './styles.css';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }
  renderPosts() {
    return this.props.events.map((event, idx) => {

      const pics = [];

      event.fields.photos.map((attributedImage) => {
        this.props.images.map((asset) => {
          if (asset.sys.id === attributedImage.sys.id) {
            const title = asset.fields.title;
            pics.push(
              <div key={asset.sys.id}><img src={`https:${asset.fields.file.url}?w=100`} alt={title} title={title} /></div>
            );
          }
        });
      });

      return (
        <article key={event.sys.id}>
          <h3>{event.fields.title}</h3>
          <div className={styles.images}>{pics}</div>
        </article>
      );
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Events test</h2>
        {this.renderPosts()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { events: state.posts.all, images: state.posts.img };
}
export default connect(mapStateToProps, { fetchEvents })(PostsIndex);