import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { isValidJSON } from '../helper/helperFunctions';

export const internetCheck = (resolve) => {

  let isInternetWorking = false;
  NetInfo.fetch().then(state => {
    if (__DEV__) {  //checking if App is in debug mode
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    }
    isInternetWorking = state.isConnected;
    resolve(isInternetWorking)
  });

};



export const GET = (config, params, resolve, errorCatch) => {

  internetCheck((isConnected) => {

    if (isConnected) {
      if (__DEV__) {  //checking if App is in debug mode
        console.log('Get request');
      }
      axios
        .get(config.url, {
          params: params,
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          }
        })
        .then((response) => {
          successResponse(response, resolve, errorCatch);
        })
        .catch(function (error) {
          errorResponse(error, errorCatch);
        });

    }
    else {
      let error = 'Internet is not working, please check your connection';
      if (__DEV__) {
        console.log('Internt Error', error);
      }
      errorCatch(error);
    }
  })
}; 

export const POST = (config, requestBody, resolve, errorCatch) => {
  
  internetCheck((isConnected) => {

    if (isConnected) {
      if (__DEV__) {  //checking if App is in debug mode
        console.log('Post request');
      }
  
      const qs = require('querystring')
      axios.post(config.url, qs.stringify(requestBody) , {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
        .then((response) => {
          successResponse(response, resolve, errorCatch);          
        })
        .catch((error) => {
            errorResponse(error, errorCatch);
        }) 
    }
    else {
      let error = 'Internet is not working, please check your connection'
      if (__DEV__) {
        console.log('Internt Error', error);
      }
      errorCatch(error)
    }
    
  })
 
   
};
 
const successResponse = (response, resolve, errorCatch) => {

  let hasError = false; // flag if the post request returns an error
  let requestError; //Error return from api response
  let userError;  // Error message that will be diplayed to user

  if (__DEV__) {  //checking if App is in debug mode
    console.log('Response', response);
  }
  if (response.status == 200) {
  /*  if(isValidJSON(response.data))
    {
      resolve(response);
    }
    else {
      requestError = "Json parse error, invalid json recieved in response"
      hasError = true;
      userError = "Something went wrong, please try again";
    } */

    resolve(response);
    
  }
  else if (response.status = 400 || response.status == 401) {
    requestError = response;
    hasError = true;
    userError = response;
  }
  else {
    requestError = response;
    hasError=true;
    userError = response.data.error;
  }

  if(hasError)
  {
    errorCatch(userError);
    if (__DEV__) {  
      console.log('Request Error : ', response);
      console.log('User Error : ', userError);    
    }
  }

}

const errorResponse = (error, errorCatch) => {

  let hasError = false; // flag if the post request returns an error
  let requestError; //Error return from api response
  let userError;  // Error message that will be diplayed to user

  if (__DEV__) {  
    console.log('Catch Error',  error);
  }
  if (error.response) {
    hasError = true;
    requestError = error;           
    userError= 'Unable to resolve host';
  } 
  else if(error.response.status >= 500)
  {
    hasError = true;
    requestError = error;                 
    userError= 'Unable to resolve host';
  }
  else if (error.request) {
    hasError = true;
    requestError = error; 
    userError= 'No response recieved';
  } 
  else {
    hasError = true;
    requestError = error; 
    userError = 'Something went wrong, please try again';
  }
  if(hasError)
  {
    errorCatch(userError);
    if (__DEV__) {  
      console.log('Request Error : ',  requestError);
      console.log('User Error : ', userError);    
    }
  }

}

