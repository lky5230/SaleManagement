<template>
<div class="comment">
  <div class="com-top clearfix">
    <span class="time">
      {{formateDate(ratings.rateTime)}}
    </span>
    <img :src="ratings.avatar" alt="">

    <span class="user">
      {{ratings.username}}
    </span>
  </div>
  <div class="comment-info">
    <img v-if="ratings.rateType==1" src="../assets/img/bad.png" alt="">
    <img v-if="ratings.rateType==0" src="../assets/img/good.png" alt="">
      {{ratings.text}}
  </div>
</div>
</template>

<script>
import { formateDate } from '../util/index.js'
export default {
  props:["ratings"],
  methods:{
    formateDate: formateDate
  },

}
</script>

<style lang="scss" scoped>
$base: 75;
@import '../style/mixin.scss';
.comment{
  padding-top: 32rem/$base;
  padding-bottom: 32rem/$base;
  .comment-info{
    padding-top: 12rem/$base;
    padding-bottom: 12rem/$base;
    font-size: 20px;
    color: rgb(7, 17, 27);
    line-height: 1.5;
    @include font(20);
    img{
      height: 20rem/$base;
      float: left;
    }
  }
  .com-top{
    .time,.user,img{
      font-size: 20px;
      color: rgb(147, 153, 159);  
      height: 24rem/$base;
      line-height: 24rem/$base;
      @include font(20)
    }
    .time{
      float: left;
    }
    .user,img{
      float: right;
      margin-left: 12rem/$base;
    }
    img{
      border-radius: 50%; 
    }
  }
  
}
</style>
