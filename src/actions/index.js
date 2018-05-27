import axios from 'axios';
export const FETCH_CONTENT = 'FETCH_CONTENT';
const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 'dg95qcu2wwxg';
const API_TOKEN = 'fda19f419408d7646f4994e21db6c5fa9026bb9b38e8be102954091c692bb702';
export function fetchContent() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`);
  return {
    type: FETCH_CONTENT,
    payload: request
  };
}