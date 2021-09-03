import axios from "axios";

const instance = axios.create({
    baseURL: 'http://f0a2-112-196-163-70.ngrok.io'
});

export default instance;