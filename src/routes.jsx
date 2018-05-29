import React from 'react';
import App from 'components/app';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex}/>
  </Route>
);
    // <Route path=component={PostsIndex}/>
