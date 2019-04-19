import Config from '../config.js'
import BaseService from './base-service.js'

function get (url, request) { return BaseService.get(url, request).then(response => { return response }) }
function post (url, request) { return BaseService.post(url, request).then(response => { return response }) }
function put (url, request) { return BaseService.put(url, request).then(response => { return response }) }
function patch (url, request) { return BaseService.patch(url, request).then(response => { return response }) }
function del (url, request) { return BaseService.del(url, request).then(response => { return response }) }
/******************************/
function createService (url) {
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
const getTopics = (request) => { return get('get_topics', request) }; // 获取练习题
const doTopic = (request) => { return get('do_topic', request) }; // 答题记录
/******************************/


export default {
  getStudentDetails,
  getTopics,
  doTopic
}
