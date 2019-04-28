import Config from '../config.js'
import BaseService from './base-service.js'

function get(url, request) { return BaseService.get(url, request).then(response => { return response }) }
function post(url, request) { return BaseService.post(url, request).then(response => { return response }) }
function put(url, request) { return BaseService.put(url, request).then(response => { return response }) }
function patch(url, request) { return BaseService.patch(url, request).then(response => { return response }) }
function del(url, request) { return BaseService.del(url, request).then(response => { return response }) }
/******************************/
function createService(url) {
  return {
    get: (request) => { return get(url, request) },
    details: (id, request) => { return get(url + '/' + id, request) },
    add: (request) => { return post(url, request) },
    edit: (id, request) => { return put(url + '/' + id, request) },
    del: (id) => { return del(url + '/' + id) }
  }
}
/******************************/
const getStudentDetails = (request) => { return post('client_index', request) }; // 获取学生用户信息
const getTopics = (request) => { return post('get_topics', request) }; // 获取练习题
const doTopic = (request) => { return post('do_topic', request) }; // 答题
const getWrongTopics = (request) => { return get('wrong_log', request) }; // 获取练习题(错题)
const doWrongTopic = (request) => { return post('update_wrong_log', request) }; // 答题(错题)
const signIn = (request) => { return post('insert_log', request) }; // 签到

const getNotices = () => { return get('notice', {}) }; // 获取培训考试通知
const bindingUser = (request) => { return post('get_client_login', request) }; // 绑定
const unitChange = (request) => { return get('change_unit', request) }; // 单位变更
const addUnitChange = (request) => { return post('change_unit', request) }; // 新增单位变更
const company = () => { return get('company', {}) }; // 公司列表
const images = (request) => { return post('images', request) }; // 图片上传
const cert = (id) => { return createService('cert').details(id, {}) }; // 合格证信息

const getOpenId = (request) => { return post('get_open_id', request) }; // code获取openid
/******************************/


export default {
  getStudentDetails,
  getTopics,
  doTopic,
  getWrongTopics,
  doWrongTopic,
  signIn,
  getNotices,
  bindingUser,
  unitChange,
  addUnitChange,
  company,
  images,
  cert,
  getOpenId,
}
