import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const clockEntry = async (token) => {
    const res = await axios(apiUrl + '/api/entries/addentry', 
    {
        method: 'PUT', 
        headers: {authorization: token} 
    });

    return res.data;
}

export const getTimeCard = async ( token ) => {
    const res = await axios(apiUrl + '/api/entries/employeetimecard', { 
        method: 'GET',
        headers: {authorization: token}
    });
    return res.data;
}