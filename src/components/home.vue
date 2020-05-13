<template>
  <div class="home">
     <div class="home--div">
       <ul class="home--div__left">
         <li class="home--div__left--li" v-for="(item, index) in homedata" :key="index">
          <router-link :to="{path: 'detail', query: {aid: item.article_id,uid:item.user_id }}">
           <p class="home--div__left--title">{{item.title}}</p>
           <div class="home--div__left--desc">
             {{item.content}}
          </div>
           <p class="home--div__left--like">
             <i class="el-icon-star-on"></i>
              {{item.favorite}}人喜欢
            </p>
          </router-link>
         </li>
         
       </ul>
       <ul class="home--div__right"></ul>
     </div>
  </div>
</template>
<script>
import { init } from '../api/home'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  title: '首页',
  data() {
    return {
      introduction: 'sssss'
    }
  },
  created() {
    this.$store.dispatch('getHomeData')
  },
  methods: {
    ...mapActions(['getHomeData'])
  },
  computed: {
    ...mapGetters([
      'homedata',
    ]),
  },
  mounted() {

  }
}
</script>

<style lang="scss">

.home{
  @import "../assets/css/markdown.css";
  width:750px;
  margin: 0 auto;
  margin-top: 58px;
  &--div{
    width: 100%;
    float: left;
    &__left{
      width: 70%;
      margin-right: 2%;
      &--li{
        padding: 30px 0;
        border-bottom: 1px solid #e7e7e7;
      }
      &--title{
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        color: #000;
      }
      &--desc{
        margin: 4px 0 12px;
        font-size: 13px;
        line-height: 24px;
        overflow:hidden;

        text-overflow:ellipsis;
        color: #999;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      &--like{
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        color: #ea6f5a;
        i{
          color: #ea6f5a;
        }
      }
    }
    &__right{
      width: 28%;
    }
  }
}
</style>