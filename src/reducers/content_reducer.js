import { FETCH_CONTENT } from '../actions';
const INITIAL_STATE = { story: {}, items: [], img: [] };
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_CONTENT:
  	const data = action.payload.data;
    const story = data.items.find(item => item.sys.contentType.sys.id === 'story');
    const filteredItems = data.items.filter(item => item.sys.contentType.sys.id === 'event');
    filteredItems.sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));
    return { ...state, story: story, items: filteredItems, img: data.includes.Asset };
  default:
    return state;
  }
}