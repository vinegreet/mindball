import { combineReducers } from 'redux';
import ContentReducer from './content_reducer';
const rootReducer = combineReducers({
  content: ContentReducer
});
export default rootReducer;
