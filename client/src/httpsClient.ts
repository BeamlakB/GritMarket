import axios from "axios";

const httpsClient = axios.create({
    // baseURL: 'http://localhost:5000',
    // headers:{
    //     'Content-Type': 'application/json',
    // },
    withCredentials: true,
});

export default httpsClient