<template>
    <transition 
        enter-active-class="animated fadeInLeft" 
        leave-active-class="animated fadeOutRight">
        <div v-show="isShow" style="animation-duration: .3s" class="notice-mark">
            <div class="content">
                <h2 class="mark-title">{{seller.name}}</h2>
                <div class="score-wrap">
                    <score :score="seller.foodScore"></score>
                </div>
                <common-title :title="'优惠信息'" :fontSize="28"></common-title>
                <ul class="info">
                    <li class="clearfix" v-for="(item, index) in seller.supports" :key="index">
                        <span class="icon" :class="[supportsType(item.type)]"></span>
                        <span class="desc">{{item.description}}</span>
                    </li>
                </ul>
                <common-title :title="'商家公告'" :fontSize="28"></common-title>
                <p class="bulletin">
                    {{seller.bulletin}}
                </p>
            </div>
            <div class="close" @click="$emit('changeMark', false)"></div>
        </div>
    </transition>
</template>

<script>
import score from './score'
import commonTitle from './commonTitle'
import { supportsType } from '../util/index.js'
export default {
    props: {
        isShow:{},
        seller:{
            default: function(){
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        supportsType: supportsType
    },
    components: {
        score,
        commonTitle
    }

}
</script>

<style lang="scss" scoped>
@import '../style/type.scss';
@import '../style/mixin.scss';
$base: 75;
.notice-mark {
    position: fixed;
    z-index: 10001;
    background-color: rgba(7, 17, 27, .6);
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: 128rem/$base 72rem/$base 64rem/$base;
    .close {
        position: absolute;
        z-index: 10002;
        width: 120rem/$base;
        height: 120rem/$base;
        background: url('../assets/img/close-empty.png') no-repeat center center;
        background-size: 70% 70%;
        left: 50%;
        bottom: 50rem/$base;
        transform: translateX(-50%);
    }
    .content {
        .mark-title {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            line-height: 32px;
            text-align: center;
            line-height: 1;
            @include font(32);
        }
        .score-wrap {
            padding: 32rem/$base 80rem/$base;
        }
        .info {
            margin-top: 48rem/$base;
            margin-bottom: 56rem/$base;
            li {
                margin-bottom: 24rem/$base;
            }
            .icon {
                float: left;
                width: 32rem/$base;
                height: 32rem/$base;
                margin-left: 24rem/$base;
                margin-right: 14rem/$base;
                background-repeat: no-repeat;
                background-size: contain;
                background-position-x: left;
                background-position-y: center;
            }
            .desc {
                float: left;
                font-size: 24px;
                color: #fff;
                @include font(24);
            }
        }
        .bulletin {
            padding: 48rem/$base 24rem/$base 0;
            font-size: 24px;
            color: #fff;
            line-height: 1.6;
            @include font(24);
        }
    }
}
</style>