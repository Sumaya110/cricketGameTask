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
    res
})



// API function to create a score
export const createNewMatch = (payload) => API.post('/api/matches', payload);

// // API function to update a score
// export const apiUpdateScore = (scoreId, payload) => API.patch(`/api/scores/${scoreId}`, payload);

// // API function to get a score by ID
// export const apiGetScore = (scoreId) => API.get(`/api/scores/${scoreId}`);



export default API;
