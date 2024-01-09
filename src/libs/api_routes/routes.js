import axios from 'axios';

// Create an Axios instance with a baseURL
const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

API.interceptors.request.use((req)=>{
    req.headers["Content-Type"] = "application/json";
    return req;
})

API.interceptors.response.use((res)=>{
    return res;
})



export const createNewMatch = (payload) => API.post('/api/matches', payload);

export const updateNewMatch = (payload) => API.patch('/api/matches', payload);

export const getNewMatch = (payload) => API.get('/api/matches', {params:{id: payload}});


