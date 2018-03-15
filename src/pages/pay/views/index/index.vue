<template>
  <div class="index" v-if="isWx">
    <div class="phone-number-wrapper">
      <div>
        <input class="phone-number" type="number" oninput=" if(value.length>11)
      {value=value.slice(0,11)}" v-model="number1" placeholder="请输入要充值的手机号码">
      </div>
      <div>
        <input class="phone-number" type="number" oninput=" if(value.length>11)
      {value=value.slice(0,11)}" v-model="number2" placeholder="请输入要充值的手机号码">
      </div>
    </div>

    <div class="recharge-wrapper">
      <div class="recharge-title">请选择UG币充值数量</div>
      <div class="recharge-amount-wrapper">
        <div class="amount" v-for="(item,index) in amount" @click="nowIndex = index"
             :class="{active:index === nowIndex}">
          <p class="ugb">{{item.ug}}UG币</p>
          <p class="prize">￥{{item.amount}}</p>
        </div>
      </div>
    </div>
    <router-link :to="{name:'Rule'}">
      <div class="pic-wrapper"></div>
    </router-link>
    <div class="button-wrapper" @click="recharge">
      立即支付{{rechargeAmount}}元
    </div>
  </div>
</template>

<script>
  import {ajaxRequest} from '../../../../common/js/common';
  import config from '../../../../common/js/config';
  import {Base64, getname, getphone, getcode} from '../../../../common/js/pay';
  import {Toast} from 'mint-ui';

  export default {
    name: 'App',
    data() {
      return {
        isWx: true,
        code: '',
        number1: '',
        number2: '',
        nowIndex: 0,
        amount: [
          {
            id: '',
            kind: '',
            amount: '',
            ug: '',
            name: ''
          }
        ]
      };
    },
    computed: {
      rechargeAmount() {
        return this.amount[this.nowIndex].amount;
      },
      phone() {
        return this.number1;
      },
      name() {
        return this.amount[this.nowIndex].name;
      },
      url() {
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeeae5c0ace4e4501&redirect_uri=' +
          'http%3a%2f%2fapp.ugaming.com.cn%2ftest%2findex.html%3fphone%3d' + this.phone + '%26name%3d' + this.name +
          '&env=dev&response_type=code&scope=snsapi_userinfo&state=1wechat_redirect';
      }
    },
    methods: {
      recharge() {
        var URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeeae5c0ace4e4501&redirect_uri=' +
          encodeURI('http://app.ugaming.com.cn/test/index.html?name=1phone=17722546703') +
          '&env=dev&response_type=code&scope=snsapi_userinfo&state=1wechat_redirect';
        if (this.number1.length < 11) {
          Toast({
            message: '请输入手机号！'
          });
        } else if (this.number1 != this.number2) {
          Toast({
            message: '两次手机号不一致！'
          });
        } else {
          console.log(URL);
          window.location.replace(URL);
        }
      },
      isWX() {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (!isWeixin) {
          document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
          document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div></div>';
        } else {
          this.isWx = true;
        }
      },
      WxPay() {
        console.log('22222');
        var code = getcode();
        var phone = getphone();
        var name = getname();
        ajaxRequest({
          url: config.GET_MPCHARGE_URL,
          type: config.GET_MPCHARGE_TYPE,
          data: JSON.stringify({
            chargeInfoName: name,
            code: code,
            phone: phone
          }),
          successFun(result) {
            console.log('11111');
            wx.chooseWXPay({
              appId: 'wxeeae5c0ace4e4501',
              timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
              package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: result.sign, // 支付签名
              success: function () {
                // 支付成功后的回调函数
                document.location.replace('http://app.ugaming.com.cn/test/index.html');
                Toast({
                  message: '充值成功请到APP查看余额变化！'
                });
              },
              error: function () {
                alert('充值失败！');
                document.location.replace('http://app.ugaming.com.cn/test/index.html');
              },
              cancel: function () {
                alert('充值取消！');
                document.location.replace('http://app.ugaming.com.cn/test/index.html');
              }
            });
            if (wx.chooseWXPay) {
              console.log('333');
            }
          }
        });
      }
    },
    created() {
      this.isWX();
      var self = this;
      ajaxRequest({
        url: config.GET_CHARGEINFO_URL('mp'),
        type: config.GET_CHARGEINFO_TYPE,
        successFun(result) {
          self.amount = result.list;
        }
      });
      var base = new Base64();
      ajaxRequest({
        url: 'http://userapp.jinmailife.com/ticket/urlJsApiInfo',
//        url: 'http://api.jinmailife.com/user/ticket/urlJsApiInfo',
        type: 'get',
        data: {
          url: base.encode(window.location.href)
        },
        async: false,
        successFun: function (result) {
          console.log(result);
          var info = result;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxeeae5c0ace4e4501', // 必填，公众号的唯一标识
            timestamp: info.timestamp, // 必填，生成签名的时间戳
            nonceStr: info.noncestr, // 必填，生成签名的随机串
            signature: info.sgin, // 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () { // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: 'U Gaming 充值', // 分享标题
              link: 'http://app.ugaming.com.cn/test/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://app.ugaming.com.cn/image/icon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //   分享给朋友
            wx.onMenuShareAppMessage({
              title: 'U Gaming 充值', // 分享标题
              desc: '', // 分享描述
              link: 'http://app.ugaming.com.cn/test/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://app.ugaming.com.cn/image/icon.png', // 分享图标
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
        }
      });
    },
    mounted() {
      this.$nextTick(() => {
        var code = getcode();
        if (code) {
          this.WxPay();
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';
  .index
    width: 100%
    font-size: 24px
    color: #1d1d1d
    .phone-number-wrapper
      margin-top: 49px
      text-align: center
      .phone-number
        width: 86%
        height: 100px
        margin-bottom: 22px
        padding-left: 35px
        font-size: 28px
        line-height: 100px
        border-radius: 10px
        border: 1Px solid #9e9e9e
    .recharge-wrapper
      .recharge-title
        margin-top: 40px
        margin-left: 40px
      .recharge-amount-wrapper
        margin-top: 47px
        .amount
          display: inline-block
          width: 190px
          height: 85px
          margin-left: 44px
          margin-bottom: 36px
          border-radius 30px
          border: 1Px solid black
          text-align: center
          line-height: 30px
          .prize
            color: #9e9e9e
          .ugb
            margin-top: 15px
        .amount.active
          display: inline-block
          width: 190px
          height: 85px
          margin-left: 44px
          margin-bottom: 36px
          border-radius 30px
          border: 1Px solid black
          text-align: center
          line-height: 30 spx
          background-color: rgb(63, 59, 56)
          color: white
    .pic-wrapper
      display: block
      width: 90%
      height: 165px
      margin-left: 5%
      margin-top: 14px
      bg-image('../../../../assets/firstRecharge_01')
      background-size: 100% 165px
    .button-wrapper
      width: 90%
      height: 100px
      margin-top: 60px
      margin-left: 5%
      line-height: 100px
      text-align: center
      color: white
      bg-image('../../../../assets/alertBtn')
      background-size: 100% 100px
</style>
