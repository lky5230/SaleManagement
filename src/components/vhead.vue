<template>
  <div>
    <div>
      <div class="header-wrap clearfix">
        <div class="avatar">
          <img class="center-block" :src="seller.avatar" alt="brand">
        </div>
        <div class="info">
          <p class="clearfix">
            <span class="brand"></span>
            <span style="float: left">{{seller.name}}</span>
          </p>
          <p>{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
          <p class="clearfix">
            <span class="type" :class="[icon]"></span> 
            <span style="float: left">{{seller.supports && seller.supports[0].description}}</span>
          </p>
        </div>
        <div class="button" @click="showMark">
          {{seller.supports && seller.supports.length}}个 >
        </div>
        <div class="filter" :style="{'background-image':`url(${seller.avatar})`}"></div>
      </div>
      <div @click="showMark" class="notice clearfix">
        <img src="../assets/img/bulletin@2x.png" alt="">
        <span class="nowrap">{{seller.bulletin}}</span>
        <i>&nbsp;></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllData } from '../api/index.js'
import { supportsType } from '../util/index.js'
export default {
  data() {
    return {
      //头部信息
      seller: {},
      //特殊项，第一项是 减
      firstType: '',
      //小图片类型
      icon:''
    }
  },
  methods: {
    supportsType: supportsType,
    showMark(){
      this.$store.commit('changeMark', true);
    }
  },
  created() {

  },
  mounted() {
    getAllData().then(res => {
      this.seller = res.data.seller;
      this.icon = supportsType(this.seller.supports[0].type);
      this.$store.commit('getData', res.data);
    });
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '../style/type.scss';
$base: 75;

.notice {
  padding-left: 24rem/$base;
  padding-right: 24rem/$base;
  height: 56rem/$base;
  line-height: 56rem/$base;
  font-size: 0px;
  color: #fff;
  background-color: rgba(74, 44, 27, .6);
  display: flex;
  align-items: center;
  span,
  i,
  img {
    display: inline-block;
    [data-dpr="1"] & {
      font-size: 12px;
      line-height: 12px;
    }
    [data-dpr="3"] & {
      font-size: 32px;
      line-height: 32px;
    }
  }
  img {
    width: 44px;
    margin-right: 8px;
    [data-dpr="1"] & {
      width: 30px;
    }
    [data-dpr="3"] & {
      width: 64px;
    }
  }
  span {
    width: calc(98% - 52px);
    font-size: 20px;
  }
  i {
    width: 2%;
    font-size: 20px;
  }
}

.header-wrap {
  padding: 48rem/$base 24rem/$base 36rem/$base 48rem/$base;
  background-color: rgba(0, 0, 0, .2);
  position: relative;
  .avatar {
    width: 128rem/$base;
    height: 128rem/$base;
    border-radius: 4rem/$base;
    overflow: hidden;
    margin-right: 32rem/$base;
    display: inline-block;
    float: left;
  }
  .info {
    display: inline-block;
    height: 128rem/$base;
    float: left;
    .type{
      
      background-repeat: no-repeat;
      background-position-x: left;
      background-position-y: top;
      background-size: contain;
      display: inline-block;
      height: 26rem/$base;
      width: 26rem/$base;
      float: left;
      margin-right: 6rem/$base;
    }
    .brand {
      background: url('../assets/img/brand@2x.png') no-repeat left top;
      background-size: contain;
      display: inline-block;
      height: 32rem/$base;
      width: 60rem/$base;
      margin-top: 4px;
      float: left;
      [data-dpr="3"] & {
        height: 48rem/$base;
        background: url('../assets/img/brand@3x.png') no-repeat left top;
      }
    }

    >p:nth-of-type(1) {
      margin-top: 4rem/$base;
      font-size: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: bold;
      [data-dpr="1"] & {
        font-size: 18px;
        line-height: 18px;
      }
      [data-dpr="3"] & {
        font-size: 48px;
        line-height: 48px;
      }
    }
    >p:nth-of-type(2) {
      font-size: 24px;
      color: #fff;
      font-weight: 200;
      line-height: 24px;
      margin-top: 16rem/$base;
      margin-bottom: 20rem/$base;
      [data-dpr="1"] & {
        font-size: 14px;
        line-height: 14px;
      }
      [data-dpr="3"] & {
        font-size: 36px;
        line-height: 36px;
      }
    }
    >p:nth-of-type(3) {
      font-size: 20px;
      color: #fff;
      font-weight: 200;
      line-height: 24px;
      margin-bottom: 4rem/$base;
      img {
        height: 20rem/$base;
      }
      [data-dpr="1"] & {
        font-size: 12px;
        line-height: 12px;
      }
      [data-dpr="3"] & {
        font-size: 30px;
        line-height: 30px;
      }
    }
  }
  .button {
    position: absolute;
    bottom: 24rem/$base;
    right: 20rem/$base;
    height: 48rem/$base;
    line-height: 48rem/$base;
    padding-left: 16rem/$base;
    padding-right: 16rem/$base;
    font-size: 20px;
    color: #fff;
    font-weight: 200;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 24rem/$base;
    [data-dpr="1"] & {
      font-size: 12px;
    }
    [data-dpr="3"] & {
      font-size: 30px;
    }
  }
  .filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    filter: blur(15px);
  }
}
</style>
