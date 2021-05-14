
// import {ApiCallFetch}             from "../helpers/ApiCallFetch";
// import {ApiCallAxios}             from "../helpers/ApiCallAxios";
import {ENV, CommonUtil}            from "../helpers/CommonUtil";

const API_CALL = 'fetch';

export const ApiCall = {
  get,
  post
}

function get (url) {
  if(API_CALL === 'fetch'){
    return fetchApiGet(url)
  }
  else {
    return axiosApiGet(url)
  }
}

function post (url, data, callBack) {
  if(API_CALL === 'fetch'){
    return fetchApiPost(url,data,callBack)
  }
  else {
    return axiosApiPost(url,data,callBack)
  }
}

const requestOptions = {
    method: 'GET',
    mode: ENV.isProductionMode ? "same-origin" : "cors",
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + CommonUtil.getJWTToken()
    }
}

function fetchApiGet (url) {
  const requestOptions = {
      method: 'GET',
      mode: ENV.isProductionMode ? "same-origin" : "cors",
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + CommonUtil.getJWTToken()
      }
  };
  return fetch(url, requestOptions)
          .then(handleResponse)
          .catch((error) =>  console.error('error fetchApiGet for url : ' + url +', error : '+ error))
}

function fetchApiPost (url, data, callBack) {
  console.log(`ApiCall.fetchApiPost() sterted, data : ${data}`);
  const requestOptions = {
      method: 'POST',
      mode: ENV.isProductionMode ? "same-origin" : "cors",
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + CommonUtil.getJWTToken()
      },
      body: JSON.stringify(data)
  };
  return fetch(url, requestOptions)
          .then(handleResponse)
        .catch(
          (error) => {
            console.error(`ApiCall.fetchApiPost() catch: ${error}`)            
            return error;
          }
        )
}

function handleResponse(response) {
    console.log('ApiCall.handleResponse called.')
    if(response && response.text) {
      return response.text()
                    .then(text =>{
                      console.log('ApiCall.handleResponse data from server side:' + text);
                      let result='';
                      if(CommonUtil.isJsonString(text)) {
                        result = JSON.parse(text);
                        console.log('ApiCall.handleResponse, result:', result);
                      }
                      if (!response.ok) {                        
                        let error = (result && result.message) ? result : {message:`http error: ${response.statusText}`} ;
                        console.log('ApiCall.handleResponse, error:' + JSON.stringify(error));
                        return error;                        
                      }
                      return result;
      });
    }
    else {
      console.log("request call doesn't have any data.");
      return;
    }

}

//==============================================================================
function axiosApiGet (url) {
  const requestOptions = {
      method: 'GET',
      mode: ENV.isProductionMode ? "same-origin" : "cors",
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + CommonUtil.getJWTToken()
      }
  };
  return fetch(url, requestOptions)
          .then(handleResponse)
          .catch((error) =>  console.error('error axiosApiGet for url : ' + url +', error : '+ error))
}

function axiosApiPost (url, data, callBack) {
  const requestOptions = {
      method: 'POST',
      mode: ENV.isProductionMode ? "same-origin" : "cors",
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + CommonUtil.getJWTToken()
      },
      body: JSON.stringify(data)
  };
  return fetch(url, requestOptions)
          .then(handleResponse)
          .catch((error) =>  console.error('error axiosApiPost for url : ' + url +', error : '+ error))
}

//==============================================================================
