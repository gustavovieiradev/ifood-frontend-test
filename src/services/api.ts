import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  responseType: "json"
});

const auth = axios.create({
  baseURL: 'https://accounts.spotify.com',
});

const mock = axios.create({
  baseURL: 'http://www.mocky.io/v2'
})

export { api, auth, mock };