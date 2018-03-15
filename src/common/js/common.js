import axios from 'axios';
import {Toast} from 'mint-ui';

function ajaxRequest() {
  var option = arguments[0];
  var httpInfo = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: option.type || 'GET',
    url: option.url,
    credentials: true
  };
  if (option.type === 'POST' || option.type === 'PUT') {
    httpInfo.data = option.data || '';
  } else {
    httpInfo.params = option.data || '';
  }
  axios(httpInfo).then((response) => {
    var result = response.data;
    if (result.meta.success === true) {
      try {
        if (typeof (option.successFun) === 'function') {
          option.successFun(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(result);
      try {
        if (typeof (option.failFun) === 'function') {
          option.failFun(result);
        } else {
          errorPrompt(result.meta.msg);
        }
      } catch (e) {
        errorPrompt('服务器繁忙，请稍后重试~');
      }
    }
  }, (response) => {
    console.log(response);
    errorPrompt('服务器繁忙，请稍后重试~');
  });
}

export {ajaxRequest};

function errorPrompt(info) {
  Toast({
    message: info,
    duration: 1000
  });
}

export {errorPrompt};
