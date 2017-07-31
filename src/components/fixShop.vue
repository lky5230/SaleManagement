<template>
  <div class="fix-shop">
      <div class="place"></div>
      <div class="shop">
          <div :class="{ani: $store.state.isShopShow}" @click="$store.commit('changeShopShow')" class="shop-btn"></div>
          <div class="all-money">￥{{$store.getters.allPrice}}</div>

          <template v-if="$store.state.data.seller">

            <div class="other">
                另需配送费{{$store.state.data.seller.deliveryPrice}}元
            </div>

            <div v-if="$store.getters.allPrice < $store.state.data.seller.minPrice" key="minPrice" class="toBuy">￥{{$store.state.data.seller.minPrice}}&nbsp;起送</div>

            <div v-else key="buy" @click="buyGoods" class="toBuy2">购买</div>

          </template>

      </div>
  </div>
</template>

<script>
export default {
    methods:{
        buyGoods(){
            this.$store.dispatch('uploadOrder');
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
$base: 75;
@keyframes ani{
    from{}
    to{
        border-color: #219ee9;
        background-color: #219ee9;
        background-size: 90% 90%;        
    }
}
.fix-shop{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    .place{
        height: 24rem/$base;
    }
    .shop{
        background-color: #141d27;
        height: 92rem/$base;
        padding-left: 36rem/$base;
        display: flex;
        .shop-btn{
            width: 90rem/$base;
            height: 90rem/$base;
            background: url('../assets/img/shop-car.png') no-repeat center center, #3f4257;
            background-size: 60% 60%;
            border: 10rem/$base solid #222;
            border-radius: 50%;
            position: relative;
            top: -16rem/$base;
            margin-right: 36rem/$base;
            flex: none;
            &.ani{
                animation: ani 1.4s alternate ease-out infinite;
            }
        }
        .all-money{
            font-size: 32px;
            color: rgba(255, 255, 255, .4);
            font-weight: 700;
            @include font(32);
            line-height: 92rem/$base;
            padding-right: 16rem/$base;
            position: relative;
            flex: auto;
            &:after{
                display: block;
                content: ' ';
                position: absolute;
                height: 60rem/$base;
                width: 2rem/$base;
                background: rgba(255,255,255,.2);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .other{
            font-size: 24px;
            color: rgba(255, 255, 255, .4);
            font-weight: 400;
            @include font(24);
            line-height: 92rem/$base;
            padding-left: 16rem/$base;
            padding-right: 16rem/$base;
            flex: auto;
        }
        .toBuy,
        .toBuy2{
            width: 180rem/$base;
            font-size: 28px;
            text-align: center;
            color: rgba(255, 255, 255, .4);
            font-weight: 700;
            @include font(24);
            line-height: 92rem/$base;
            background-color: rgba(255, 255, 255, .2);
            flex: none;
        }
        .toBuy2{
            background-color: #00a0dc;
            color: #fff;
        }
    }
}

</style>
