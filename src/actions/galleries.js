import axios from 'axios';
export const FETCH_GALLERIES = 'FETCH_GALLERIES';
const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 'azyp628dwkb3';
const API_TOKEN = '0758b9c97e4c8ad32d7dcee77ae79bff2b6efcabf854a54daf3804b757ddc520';
export function fetchGalleries() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?order=sys.createdAt&access_token=${API_TOKEN}&content_type=gallery`);
  console.log(request);
  console.log(new Date().toLocaleTimeString());
  // console.log('^');
  return {
    type: FETCH_GALLERIES,
    payload: request
  };
}