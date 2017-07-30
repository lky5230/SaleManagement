import axios from 'axios';
const url = 'http://localhost:8080/';
//获取
export function getAllData(){
    return axios.get(url+'static/data.json')
}