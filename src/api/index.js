import axios from 'axios';
const url = 'https://lky5230.github.io/';
//获取
export function getAllData(){
    return axios.get(url+'static/elemedata.json')
}