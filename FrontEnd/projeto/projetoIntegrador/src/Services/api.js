import axios from 'axios';

const api = axios.create({
    //baseURL: "http://ec2-54-226-11-155.compute-1.amazonaws.com:8080",
    baseURL: "http://ec2-52-67-228-185.sa-east-1.compute.amazonaws.com:8080/",
    //baseURL: "http://localhost:8080",
});

export default api;