import axios from "axios";

const instance = axios.create({
    baseURL: 'http://de70-103-61-113-219.ngrok.io'
});

export default instance;