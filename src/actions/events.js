import axios from 'axios';
export const FETCH_EVENTS = 'FETCH_EVENTS';
const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 'azyp628dwkb3';
const API_TOKEN = '0758b9c97e4c8ad32d7dcee77ae79bff2b6efcabf854a54daf3804b757ddc520';
export function fetchEvents() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?order=sys.createdAt&access_token=${API_TOKEN}&content_type=gallery`);
  // const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}?access_token=${API_TOKEN}`);
  console.log(request);
  console.log(new Date().toLocaleTimeString());
  // console.log('^');
  return {
    type: FETCH_EVENTS,
    payload: request
  };
}