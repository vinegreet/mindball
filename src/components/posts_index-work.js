import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchPosts } from '../actions/index';
import { fetchPosts } from '../actions/images';
// import { contentful } from 'contentful';
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'azyp628dwkb3',
  accessToken: '0758b9c97e4c8ad32d7dcee77ae79bff2b6efcabf854a54daf3804b757ddc520'
});

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    client.getEntries({'sys.id': '8kcLX3d82sY6O6ikIkm2G'})
          .then(function(entry) {
            if(entry.includes) {
              console.log(entry)
            }
          })
  }
  renderPosts() {
    console.log(this.props.posts);
    return this.props.posts.map((post, index) => {
          // <p>{post.fields.featuredImage}</p>
      return (
        <article key={post.sys.id}>
          <h3>{post.fields.title}</h3>
          <p>{post.fields.description}</p>
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
  return { posts: state.posts.all };
}
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);