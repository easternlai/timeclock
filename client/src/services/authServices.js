import axios from 'axios';

const apiUrl = `http://localhost:8080`;

//receives {user, token }  from '/api/auth/login
export const loginAuthentication = async (usernameOrEmail, password, token) => {
    try {

        const request = token ?  {headers: { token }}: {data: {usernameOrEmail, password}};
        const res = await axios(apiUrl + '/api/auth/login', { 
            method: 'POST', 
            ...request
        });
        return res.data;
    } catch (err) {
       throw new Error(err.response.data.error);
    }
}

export const register = async (fullName, email, username, password) => {
    try {
        // post signup fields to '/api/auth/register
        const res = await axios(apiUrl + '/api/auth/register', {
            method: 'POST',
            data: { fullName, email, username, password }
        });

        return res.data;
    } catch (err) {
       throw new Error(err.response.data.error);
    }
}