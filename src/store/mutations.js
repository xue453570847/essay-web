import Vue from 'vue'

export default {
  // HOME
  gethomelist: (state, data) => {
    state.homedata = data
  },
  // detail
  getDetails: (state, data) => {
    state.detail = data
  },
  clearDetails: (state) => {
    state.detail = ''
  },
  // project
  createArticle: (state, data) => {
    state.createArticleInfo = data
  },
  getArticleListById: (state,data) => {
    state.projectList = data
  }
}

