<template>
  <div id="app">
    <div style="height:100%" :class="{blur:$store.state.isMark || $store.state.isShopShow}">
      <vhead></vhead>
      <div class="tab">
        <router-link tag="span" to="/" exact>商品</router-link>
        <router-link tag="span" to="/judge">评价</router-link>
        <router-link tag="span" to="/seller">商家</router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
      
    </div>
    <fix-shop></fix-shop>
    <notice-mark @changeMark="$store.commit('changeMark', false)" :seller="$store.state.data.seller" :isShow="$store.state.isMark"></notice-mark>
    <order-list></order-list>
  </div>
</template>

<script>
import vhead from '@/components/vhead'
import noticeMark from '@/components/noticeMark'
import fixShop from '@/components/fixShop'
import orderList from '@/components/orderList'
export default {
  name: 'app',
  data(){
    return {
      //显示遮罩
      showMark: false,
    }
  },
  components:{
    vhead,
    noticeMark,
    fixShop,
    orderList,
  }
}
</script>

<style lang="scss" scoped>
@import './style/mixin.scss';
$base: 75;
#app {
  height: 100vh;
  .blur {
    filter: blur(10px);
  }
  .tab{
    display: flex;
    justify-content: center;
    align-items: stretch;
    height: 80rem/$base;
    line-height: 80rem/$base;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
    > span{
      flex: 1;
      text-align: center;
      color: rga(77,85,93);
      font-size: 28px;
      @include font(28);
    }
    > span.router-link-active{
      color: rgb(240,20,20);
    }
  }
  .content{
    height: calc(100% - 5.88rem);
    overflow: hidden;
  }
}
</style>
