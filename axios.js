import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-ecommerce-app-5a7a6.cloudfunctions.net/api'
    
    
    //'http://localhost:5001/ecommerce-app-5a7a6/us-central1/api' //THE api {cloud function} URL
});

export default instance;

