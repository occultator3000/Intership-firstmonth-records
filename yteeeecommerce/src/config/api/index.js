const BASE_URL_1 = 'http://10.0.2.2:3000';
const BASE_URL_2 = 'http://10.0.225.106:3000';
const axios = require('axios');

export const axiosClient = axios.create({
  baseURL: BASE_URL_2,

});

export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const CREATE_SHOP = '/create_shop';
export const GET_NEARBY_SHOPS = '/get_nearby_shops';


