// var IP = document.location.hostname;
var UG_URL = 'http://ugaming-web-app-dev.jinmailife.com';
// if (IP === 'app.ugaming.com.cn') { // 正式
//   UG_URL = 'http://ugaming-web.jinmailife.com';
// } else if (IP === 'app-test.ugaming.com.cn') { // 测试
//   UG_URL = 'http://ugaming-web-test.jinmailife.com';
// } else {
//   UG_URL = 'http://ugaming-web-app-dev.jinmailife.com';
// };
const POST = 'POST';
const GET = 'GET';
// const DELETE = 'DELETE';
export default {
  /* 获取充值项 */
  GET_CHARGEINFO_URL(platform) {
    return `${UG_URL}/chargeInfo/platform/${platform}`;
  },
  GET_CHARGEINFO_TYPE: GET,
  /* 公众号充值 */
  GET_MPCHARGE_URL: UG_URL + '/balance/mpCharge',
  GET_MPCHARGE_TYPE: POST
};
