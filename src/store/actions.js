import { gethomelist } from '../api/home'
import { getDetail } from '../api/detail'
import { createArticle, getArticleList, updateArticle } from '../api/project'


import axios from 'axios'
export default {
  /**
   * 
   * home
   */
  async getHomeData({ commit }) {
    const data = await axios.post(gethomelist)
    commit('gethomelist', data.data.data)
  },
  /**
   * detail
  */
  async getDetail({ commit },data) {
    const response = await axios.post(getDetail,data)
    commit('getDetails', response.data)
  },
  async clearDetail({ commit },data) {
    commit('clearDetails', '')
  },
  /**
   * peoject  
  */
  async createArticle({ commit, state }, data) {
    const response = await axios.post(createArticle,data)
    commit('createArticle', response.data)
  },
  async updateArticle({ commit, state }, data) {
    const response = await axios.post(updateArticle,data)
    commit('createArticle', response.data)
  },
  async getArticleList({ commit, state }, data) {
    const response = await axios.post(getArticleList,data)
    commit('getArticleListById', response.data.data)
  },
}
