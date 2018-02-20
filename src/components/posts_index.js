import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { fetchImages } from '../actions/images';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchImages();
  }
  renderPosts() {
    return this.props.posts.map((post, idx) => {
      //<img src={'https:' + post.fields.featuredImage.url} />
      return (
        <article key={post.sys.id}>
          <h3>{post.fields.title}</h3>
          <p>{post.fields.description}</p>
          <img src={'https:' + this.props.images[idx].fields.file.url} />
        </article>
      );
    });
  }
  render() {
    return (
      <div>
        <h2>Blog Posts</h2>
        {this.renderPosts()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state.posts.img);
  // console.log(Date.parse("2018-02-16T17:26:42.681Z"));
  return { posts: state.posts.all, images: state.posts.img };
}
export default connect(mapStateToProps, { fetchPosts, fetchImages })(PostsIndex);