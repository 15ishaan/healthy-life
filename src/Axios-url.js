import axios from "axios";

const instance = axios.create({
    baseURL: 'http://a8a6-112-196-163-58.ngrok.io'
});

export default instance;