import axios from '../axios';
let token = window.localStorage.getItem('token')

export const getAPI = function(url){
    return axios.get(url, {headers: {'Authorization': 'Bearer ' +  token}})
}
export const postAPI = function(url, data){
    return axios.post(url,data)
}
export const postAPItoken = function(url, data){
    // return axios.post(url,data)
    return axios.post(url,data, {headers: {'Authorization': 'Bearer ' +  token}})
}
export const patchAPI = function(url, data){
    return axios.patch(url,data, {headers: {'Authorization': 'Bearer ' +  token}})
}
export const putAPI = function(url, data){
    return axios.put(url,data, {headers: {'Authorization': 'Bearer ' +  token}})
}
export const deleteAPI = function(url){
    return axios.delete(url, {headers: {'Authorization': 'Bearer ' +  token}})
}
