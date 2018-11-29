import { FETCH_CONTENT } from '../actions';
const INITIAL_STATE = { story: {}, events: [], images: [] };
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_CONTENT:
  	const data = action.payload.data;
    const story = data.items.find(item => item.sys.contentType.sys.id === 'story');
    const events = data.items.filter(item => item.sys.contentType.sys.id === 'event');
    events.sort((a, b) => new Date(a.fields.date) - new Date(b.fields.date));
    return { ...state, story: story, events: events, images: data.includes.Asset };
  default:
    return state;
  }
}