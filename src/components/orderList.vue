<template>
  <div class="order-list" :class="{show: $store.state.isShopShow}">
      <div class="order-mark" @click="$store.commit('changeShopShow', false)" :class="{show: $store.state.isShopShow}"></div>
      <div class="title clearfix">
          <span class="shop-car">购物车</span>
          <span @click="$store.commit('clearBuyList')" class="clear">清空</span>
      </div>
      <div ref="order" class="order">
        <div>
            <div class="order-item" v-for="(list, index) in orderList" :key="index">
                <div class="item-info">
                    {{list.goodsName}}
                </div>
                <div class="btn">
                    <div class="btn-wrap">
                        <template v-if="$store.getters.buyListCount[list.goodsName]">
                            <span  @click="decPro(list.goodsName, list.price)" class="dec"></span>
                            <span class="number">{{list.count}}</span>
                        </template>
                        <span @click="addPro(list.goodsName, list.price)" class="inc"></span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import BS from 'better-scroll'
export default {
  data(){
      return{
          
      }
  },
  methods:{
    //减少商品
    decPro(goodsName){
        this.$store.commit('decreaseProduct', {goodsName});
    },
    //增加商品
    addPro(goodsName, price){
        this.$store.commit('addProduct', {goodsName, price})
    },
  },
  computed:{
      orderList(){
          return this.$store.state.buyList;
      }
  },
  mounted(){
    this.order = new BS(this.$refs.order, {
        startX: 0,
        startY: 0,
        click: true,
        HWCompositing: true,
    });
  },
  updated(){
    this.order.refresh();
  },
  destroyed(){
    this.order.destroy();
  }
}
</script>
<style lang="scss" scoped>
$base: 75;
@import '../style/mixin.scss';
.order-list{
    &.show{
        bottom: 0%;
    }
    .order-mark{
        display: none;
        position: absolute;
        width: 100%;
        content: ' ';
        height: 200vh;
        background: rgba(0, 0, 0, .1);
        bottom: 100%;
        left: 0;
        &.show{
            display: block;
        }
    }
    position: fixed;
    transition: all .3s;
    z-index: 998;
    bottom: -100%;
    width: 100%;
    background: #fff;
    padding-bottom: 100rem/$base;
    .title{
        height: 80rem/$base;
        line-height: 80rem/$base;
        background-color: #f3f5f7;
        padding-left: 36rem/$base;
        border-top: 1px solid #c7c8ca;
        border-bottom: 1px solid #c7c8ca;
        .shop-car{
            float: left;
            height: 100%;
            font-size: 28px;
            color: rga(7,17,27);
            @include font(28);
        }
        .clear{
            float: right;
            height: 100%;
            font-size: 28px;
            color: #00a0dc;
            padding-left: 36rem/$base;
            padding-right: 36rem/$base;
            @include font(28);
        }
    }
    .order{
        height: 450rem/$base;
        overflow: hidden;
    }
    .order-item{
        display: flex;
        padding-left: 36rem/$base;
        padding-right: 36rem/$base;
        height: 96rem/$base;
        align-items: center;
        .item-info{
            flex: auto;
            font-size: 28px;
            @include font(28);
        }
        .btn{
            flex: none;
            width: 124rem/$base;
            .btn-wrap{
                display: flex;
                justify-content: space-around;
            }
            .dec,.inc{
                display: inline-block;
                width: 64rem/$base;
                height: 64rem/$base;
                padding: 0 24rem/$base;
                background-size: cover;  
                border-radius: 50%;
            }
            .dec{
                background: url('../assets/img/dec.png') no-repeat center center;
                [data-dpr="3"] &{
                    background: url('../assets/img/dec@3x.png') no-repeat center center;
                }
            }
            .number{
                display: inline-block;
                width: 54rem/$base;
                height: 64rem/$base;
                text-align: center;
                line-height: 64rem/$base;
                margin-left: 10rem/$base;
                margin-right: 10rem/$base;
                color: #666;
            }
            .inc{
                background: url('../assets/img/inc.png') no-repeat center center;
                [data-dpr="3"] &{
                    background: url('../assets/img/inc@3x.png') no-repeat center center;
                }
            }
        }
    }
}
</style>

