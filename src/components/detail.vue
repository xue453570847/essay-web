<template>
  <div class="detail" v-if="detail.data&&detail.data.content" v-cloak>
    <div class="detail--div detail--left" >
      <h1 class="detail--left__title">
        {{detail.data.title}}
      </h1>
      <div class="detail--left__author">
        <!-- <img src="../assets/images/2121212.jpg" alt=""> -->
          <span class="detail--left__name">{{detail.username}}</span>
      </div>
      <div class="detail--left__con">

        <mavon-editor
        class="detail--left__con__editor"
        :value="detail.data.content"
        :subfield="false"    
        :scrollStyle="false"                                
        :boxShadow="false"                                    
        defaultOpen="preview"                                    
        :toolbarsFlag="false"  
      />
      </div>
      <div class="detail--left__zan">
        <el-button :type="detail.data.isZan?'danger':''" round @click="dianzan(detail.data.isZan)">
          {{detail.data.isZan? '已喜欢': '喜欢'}}
        </el-button>
      </div>
    </div>
    <div class="detail--div detail--right"></div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import marked from 'marked'
var userController = require('../../env');
import axios from 'axios'
import showdown from 'showdown'
export default {
  name: 'detail',
  data() {
    return {
      content: ''
    }
  },
  async created () {
    await this.$store.dispatch('getDetail', this.$route.query)
  },
  mounted () {
  },
  methods: {
    ...mapActions(['getDetail', 'clearDetail']),
    async dianzan (item) {
      const {aid, uid} = this.$route.query
      this.detail.data.isZan = !this.detail.data.isZan
      let params = {
        aid,
        uid,
        type: !item
      }
      const data = await axios.post(`${userController}/user/zan`,params)
    }
  },
  watch: {
    detail (item) {
      // this.content = marked(item.data.content)
      let converter = new showdown.Converter();
      this.content = converter.makeHtml(item.data.content);
    }
  },
  computed: {
    ...mapGetters({
      detail: 'detail'
    })
  },
  destroyed () {
    this.clearDetail()
  }
}
</script>

<style lang="scss">
@import "../assets/css/markdown.css";
[v-cloak] {
  display: none;
}
.detail{
  // position: relative;
  width: 750px;
  margin: 0 auto;
  margin-top: 58px;
  &--div{
    float: left;
  }
  &--left{
    margin-top: 50px;
    width: 80%;
    margin-right: 2%;
    &__title{
      font-size: 34px;
      font-weight: 700;
      line-height: 1.3;
    }
    &__author{
      width: 100%;
      height: 60px;
      line-height: 60px;
      margin: 30px 0;
      img{
        width: 48px;
        height: 48px;
        border-radius: 100%;
        vertical-align: top;
      }
    }
    &__name{
      font-size: 18px;
      color: #000;
      margin-left: 20px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
    }
    &__con{
      color: #2f2f2f;
      word-break: break-word!important;
      word-break: break-all;
      font-size: 16px;
      font-weight: 400;
      line-height: 3;
      white-space: pre-wrap;
      &__editor{
        width: 100%;
        height: 100%;
      }
    }
    &__zan{
      height: 50px;
      margin: 50px 0;
      text-align: center;
    }
  }
  &--right{
    width: 18%;
  }
}
</style>
