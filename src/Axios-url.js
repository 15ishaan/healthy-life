import axios from "axios";

const instance = axios.create({
    baseURL: 'http://b85982506c64.ngrok.io'
});

export default instance;