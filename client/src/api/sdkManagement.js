import axios from 'axios';
// 此处不该如此直接使用axios
// 正确的做法是封装一个公共方法统一处理服务器错误 业务正常 业务异常

export const getSDKManagementList = () => {
  return axios.get('http://localhost:3000/api/sdks')
    .then(function (response) {
      return response.data;
    })
}

export const addSDKManagement = (data) => {
  return axios.post('http://localhost:3000/api/sdks', {
    ...data
  })
    .then(function (response) {
      return response.data;
    })
}