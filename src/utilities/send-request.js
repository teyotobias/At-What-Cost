import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('Request options:', options);
    const res = await fetch(url, options);
    // console.log('Server Response:', res);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    let errMsg = 'Bad Request';
    try {
        const errBody = await res.json();
        errMsg = errBody.message || 'Bad Request';
    } catch (e) { /* Optionally handle this error if needed */ }
    throw new Error(errMsg);
  }