import { FETCH_EVENTS } from '../actions/events';
const INITIAL_STATE = { all: [], img: [] };
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_EVENTS:
    return { ...state, all: action.payload.data.items, img: action.payload.data.includes.Asset };
    /*var obj = { ...state, all: action.payload.data.items };
    obj.all.map((item, idx) => {
      item.fields.images = {...item.fields.images, ...action.payload.data.includes.Asset[idx].fields.file};
      // Object.assign(item.fields.featuredImage, action.payload.data.includes.Asset[idx].fields.file);
      console.log(item.fields.images);
    });
    return obj;*/
  default:
    return state;
  }
}