import axios from "axios";

const instance = axios.create({
    baseURL: 'http://c81f2005992f.ngrok.io'
});

export default instance;