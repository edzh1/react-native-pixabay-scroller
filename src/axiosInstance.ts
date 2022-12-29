// @ts-ignore
import {PIXABAY_URL} from '@env';
import axios from 'axios';

const instance = axios.create({
  baseURL: PIXABAY_URL,
});

export default instance;
