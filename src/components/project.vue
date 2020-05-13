<template>
  <div class="project">
    <div class="project__left">
      <ul>
        <li @click="addCreate" :class="currentindex==-1?'active':''" style="padding-right:20%"> <i class="el-icon-circle-plus-outline" style="padding-right:5px"></i>新增文章</li>
        <li @click="changeArticle(item,index)" v-for="(item,index) in projectList" :key="index" :class="index==currentindex?'active':''">
          <span>{{item.title}}</span>
          <i class="el-icon-delete" v-show="index==currentindex" @click="deleteArticle(item)"></i>
        </li>
      </ul>
    </div>
    <div class="project__right">
      <div  class="project__right--save">
        <!-- <el-button type="success" icon="el-icon-check" circle></el-button> -->
          <el-button type="success" plain @click="save">保存并发布</el-button>
      </div>

      <div>
        <input type="text" class="project__right__title" v-model="title">
      </div>
      <mavon-editor class="mavonEditor" v-model="content"/>
    </div>

    <!-- <div v-html="content"></div> -->
  </div>
</template>

<script>
import marked from 'marked'
import {mapActions, mapGetters} from 'vuex'
import Tools from '../util/tools.js'
import {deleteArticleById} from '../api/project.js'
import axios from 'axios';
export default {
  title: 'Project',
  data() {
    return{
        content: '',
        currentindex: -1,
        title:'',
        aid: 0
    }
  },
  // watch: {
  //   value (value) {
  //     this.content = marked(value)
  //   }
  // },
  async created () {
    if (Tools.getCookie('username')) {
      const params = {
          uid: Tools.getCookie('username')
      }
      await this.getArticleList(params)
    } else {
      this.$message.error('请先登录')
    }

  },
  methods: {
    ...mapActions(['createArticle', 'getArticleList','getDetail', 'updateArticle']),
    addCreate () {
      this.currentindex = -1
      this.content = ''
      this.title = ''
      // 创建新的
    },
    async deleteArticle (item) {
      let params = {
        aid: item.article_id,
      }
      var s = await this.open('将永久删除此文件，是否继续？','警告')
      if (s == 2) return
      const data = await axios.post(deleteArticleById,params)
      if (data.data.code ==0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        setTimeout(()=>{
          window.location.reload()
        },500)
      } else {
          this.$message.error(data.data.desc);
          setTimeout(()=>{
            window.location.reload()
          },500)

      }
    },
    async changeArticle (item,index) {
      this.currentindex = index
      let params = {
        aid: item.article_id,
        uid: item.user_id
      }
      this.aid = item.article_id
      await this.getDetail(params)
      this.content = this.detail.data.content
      this.title = this.detail.data.title
    },
    /**
     * 保存并发布
    */
    async save () {
      if (!Tools.getCookie('username')) { 
          this.$message.error('请先登录')
          return
      }

      if (!this.title || !this.content) {
          this.$message.error('标题或者内容不能为空');
          return
      }
      /**
       * 全部满足 请求接口
      */
      const params = {
        id: Tools.getCookie('username'),
        content: this.content,
        title: this.title,
        aid: this.aid,
      }
      if (this.currentindex == -1) {
        await this.createArticle(params)
      } else {
        await this.updateArticle(params)  
      }
      if (this.createArticleInfo.code == 0) {
        this.$router.push('/home')
      } else {
        this.$message.error(this.createArticleInfo.desc);
      }
    },
    open(message, title) {
      return new Promise((resolve,reject)=>{
        this.$confirm(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve(1)
        }).catch(() => {
          resolve(2)    
        });
      })
    }
  },
  computed: {
    ...mapGetters(['createArticleInfo', 'projectList', 'detail'])
  }
}
</script>

<style lang="scss">
// @import "../assets/css/markdown.css";

.project{
  // margin-top: 58px;
    top: 58px;
    position: relative;
  &__left{
    float: left;
    width: 20%;
    height: 95vh;
    background-color: #404040;
    overflow: auto;
    li{
      position: relative;
      line-height: 40px;
      list-style: none;
      font-size: 15px;
      color: #f2f2f2;
      padding: 0 15px;

      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
        font-size: 16px;
      text-align: center;
      min-height: 30px;
      max-height: 50px;
      span{
        float: left;
        display: inline-block;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: none;
        white-space: nowrap;
      }
    }
    .active{
      background-color: #666;
      border-left: 3px solid #ec7259;
      padding-left: 12px;
    }
  }
  &__right{
    height: 95vh;
    float: right;
        overflow: auto;

    width: 80%;
    &__title{
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      padding: 5px 10px;
    }
    &--save{
      position: fixed;
      top: 68px;
      right: 20px;
      z-index:2000;
    }
    .mavonEditor {
      width: 100%;
      height: 100%;
    }
  }
}
</style>