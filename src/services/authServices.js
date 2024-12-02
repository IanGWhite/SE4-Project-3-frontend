// import apiClient from "./services.js";

// const TOKEN_KEY = "token";

// export default {
//   loginUser(user) {
//     return apiClient.post("login", user).then(response => {
//       const token = response.data.token; // Assuming the response contains a token
//       if (token) {
//         localStorage.setItem(TOKEN_KEY, token); // Save the token
//       }
//       return response;
//     });
//   },
//   authorizeUser(code) {
//     return apiClient.post("authorize", code);
//   },
//   logoutUser(token) {
   
//     //localStorage.removeItem(TOKEN_KEY);
//     return apiClient.post("logout", token);
      
    
//   },
//   isLoggedIn() {
//     if(localStorage.getItem(TOKEN_KEY))
//       return true;
//     return false;
//   },
// };
import apiClient from "./services.js";
export default {
  loginUser(user) {
    //this.isLoggedIn = true;
    //console.log("log in " + apiClient.post("login", user));
    return apiClient.post("login", user);
  },
  authorizeUser(code) {
    //console.log("authorize");
    return apiClient.post("authorize", code);
  },
  logoutUser(token) {
    //this.isLoggedIn = false;
    return apiClient.post("logout", token);
  },
  isLoggedIn(){
    
    return this.isLoggedIn;
  }
};