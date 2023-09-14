import axios from 'axios';
import { BASE_URL } from './urls';



export const GETDATA = async (endpoint)=>{
    try{
        var url = BASE_URL + endpoint
        console.log('url=-------->',url)
        const {data} = await axios.get(url);
        return data;

    }catch(err){
        console.log("err",err)
    }
}

export const POSTDATA = async (url,body)=>{
    try{
        const {data} = await axios.get(url);
        return data;

    }catch(err){
        console.log("err",err)
    }
}

