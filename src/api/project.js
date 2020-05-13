var userController = require('../../env');

const createArticle = `${userController}/article/createArticle`
const getArticleList = `${userController}/article/getArticleListId`
const updateArticle = `${userController}/article/updateArticle`
const deleteArticleById = `${userController}/article/deleteArticle`



module.exports = {
  createArticle,
  getArticleList,
  updateArticle,
  deleteArticleById
}