import * as usersAPI from './users-api';
//no try/catch block because any error will propagate up to the “consumer” of the service - in this case the consumer is the handleSubmit method in the <SignUpForm> component.

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  //persist token
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  // Delegate the AJAX request to the users-api.js
  // module.
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem('token');
      return null;
    }
    return token;
}
  
export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

// export async function checkToken() {
//   //Key to know how to use .then with promises
//     //Below is a promise: usersAPI.checkToken() returns a string
//     // containing the exp date of the token, then we use .then to 
//     // turn it into a date object
//   return usersAPI.checkToken()
//     .then(dateStr => new Date(dateStr));
// }
