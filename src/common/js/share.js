import axios from 'axios/index';
import {Toast} from 'mint-ui';

/**
 * Created by dell on 2017/8/19.
 */
document.addEventListener('DOMContentLoaded', function () {
  var IP1 = 'http://userapp.jinmailife.com';
// var IP1 = "http://user-app-dev.jinmailife.com";
  var base = new Base64();
  ajaxRequest({
    url: IP1 + '/ticket/urlJsApiInfo',
    type: 'get',
    data: {
      url: base.encode(window.location.href
      )
    },
    async: false,
    success: function (result) {
      var info = result.data;

      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxeeae5c0ace4e4501', // 必填，公众号的唯一标识
        timestamp: info.timestamp, // 必填，生成签名的时间戳
        nonceStr: info.noncestr, // 必填，生成签名的随机串
        signature: info.sgin, // 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    }
  });

  wx.ready(function () {
//        分享到朋友圈
    wx.onMenuShareTimeline({
      title: '111！', // 分享标题
      link: 'http://app.ugaming.com.cn/test/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://app.ugaming.com.cn/image/bofu.jpg', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
    //   分享给朋友
    wx.onMenuShareAppMessage({
      title: '111！', // 分享标题
      desc: 'U Gaming', // 分享描述
      link: 'http://app.ugaming.com.cn/test/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://app.ugaming.com.cn/image/bofu.jpg', // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  });
});

function Base64() {
  // private property
  var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  // public method for encoding
  this.encode = function (input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding
  this.decode = function (input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  };

  // private method for UTF-8 encoding
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  // private method for UTF-8 decoding
  var _utf8_decode = function (utftext) {
    var string = '';
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  };
}

export {
  Base64
};

function errorPrompt(info) {
  Toast({
    message: info,
    duration: 1000
  });
}

function ajaxRequest() {
  var option = arguments[0];
  var httpInfo = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: option.type || 'GET',
    url: option.url,
    withCredentials: true
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
};
