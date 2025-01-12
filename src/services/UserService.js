import axois from "axios";

const REST_API_BASE_URL = 'http://192.168.124.69:8080/allUser';

export const listStore = () => axois.get(REST_API_BASE_URL);
