import axios from 'axios'
import { environment } from '../environment'

//set up our base environment for our webflicks connection
export const serverClient = axios.create({
    baseURL:environment.reimbursementsBaseUrl, //the base network address with no URI's on 
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})