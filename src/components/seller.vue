<template>
    <div class="seller">
        <div class="title">
            <div class="title-info">
                <div class="name">{{seller.name}}</div>
                <div class="score-wrap">
                    <div>
                        <score :score="seller.score" :w="0.48"></score>
                    </div>
                    <span class="num">({{seller.ratingCount}})</span>
                    <div class="lang">月售{{seller.sellCount}}单</div>
                </div>
            </div>
            <div @click="shouchang" class="shouchang">
                <div class="love" :class="{active: love}"></div>
                <h3 v-if="love">已收藏</h3>
                <h3 v-else>收藏</h3>
            </div>
        </div>
        <div class="show-info">
            <div class="information">
                <div class="infomation-title">起送价</div>
                <p class="infomation-content">{{seller.minPrice}}
                    <span>元</span>
                </p>
            </div>
            <div class="information">
                <div class="infomation-title">商家配送</div>
                <p class="infomation-content">{{seller.deliveryPrice}}
                    <span>元</span>
                </p>
            </div>
            <div class="information">
                <div class="infomation-title">平均配送时间</div>
                <p class="infomation-content">{{seller.deliveryTime}}
                    <span>分钟</span>
                </p>
            </div>
        </div>
        <div class="divider"></div>
        <div ref="scroll" class="scroll-content">
            <div>
                <div class="scroll-1">
                    <h3 class="seller-title">商家实景</h3>
                    <div class="swiper1">
                        <swiper :options="swiperOption">
                            <swiper-slide :key="index" v-for="(item,index) in seller.pics">
                                <img class="center-block" :src="item" alt="" />
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="scroll-1">
                    <h3 class="seller-title">公告与活动</h3>
                    <p class="seller-intro">{{seller.bulletin}}</p>
    
                    <div class="spe-list">
                        <div class="icon-wrap clearfix" v-for="(item, index) in seller.supports" :key="index">
                            <span class="icon" :class="supportsType(item.type)"></span>
                            <span class="icon-ifo">{{item.description}}</span>
                        </div>
                    </div>
    
                </div>
                <div class="divider"></div>
                <div class="scroll-1">
                    <h3 class="seller-title">商家信息</h3>
                    <div class="spe-list">
                        <div class="icon-wrap clearfix" v-for="(item, index) in seller.infos" :key="index">
                            <span class="icon-ifo">{{item}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import score from '@/components/score'
import BS from 'better-scroll'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { supportsType } from '../util/index.js'
export default {
    data() {
        return {
            love: false,
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 30
            }
        }
    },
    computed: {
        seller() {
            return this.$store.state.data.seller || {};
        },
        getSuccess() {
            return this.$store.state.getSuccess;
        }
    },
    methods: {
        supportsType: supportsType,
        shouchang(){
            this.love = !this.love;
            console.log(this.love?'收藏': '未收藏')
        },
        init_scroll() {
            this.scroll = new BS(this.$refs.scroll, {
                startX: 0,
                startY: 0,
                click: true,
                HWCompositing: true
            });
        }
    },
    watch: {
        getSuccess(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.init_scroll()
                });
            }
        }
    },
    mounted() {
        this.init_scroll();
        
    },
    destroyed() {
        this.scroll.destroy();
    },
    components: {
        score,
        swiper,
        swiperSlide
    },
}
</script>

<style lang="scss" scoped>
@import '../style/type.scss';
@import '../style/mixin.scss';
$base: 75;
.seller {
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        flex: none;
        margin: 36rem/$base 36rem/$base 0 36rem/$base;
        padding-bottom: 36rem/$base;
        border-bottom: 1px solid rgba(7, 17, 27, .2);
        display: flex;
        justify-content: space-between;
        .title-info {
            flex: auto;
            .name {
                font-size: 28px;
                color: rgb(7, 17, 27);
                line-height: 1;
                margin-bottom: 24rem/$base;
                @include font(28);
            }
            .score-wrap {
                display: flex;
                .num {
                    display: inline-block;
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                    line-height: 0.43rem;
                    margin-left: 16rem/$base;
                    @include font(20);
                }
                .lang {
                    padding-left: 24rem/$base;
                    padding-right: 24rem/$base;
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                    @include font(20);
                    line-height: 0.43rem;
                }
            }
        }
        .shouchang {
            margin-left: 125rem/$base;
            width: 100rem/$base;
            height: 100rem/$base;
            .love {
                background: url('../assets/img/love_gray.png') no-repeat center center;
                background-size: cover;
                margin: 0 auto;
                width: 60rem/$base;
                height: 60rem/$base;
                &.active {
                    background: url('../assets/img/love.png') no-repeat center center;
                }
            }
            h3 {
                text-align: center;
                margin-top: 8rem/$base;
                @include font(20);
                font-size: 20px;
                color: rgb(77, 85, 93);
                line-height: 1;
            }
        }
    }
    .spe-list {
        .icon-wrap {
            padding: 32rem/$base 0;
            margin-left: 24rem/$base;
            margin-right: 24rem/$base;
            @include font(24);
            font-size: 24px;
            color: #676280;
            border-bottom: 1px solid rgba(7, 17, 27, .2);
        }
        .icon {
            display: inline-block;
            width: 32rem/$base;
            float: left;
            height: 32rem/$base;
            background-repeat: no-repeat;
            background-position: left center;
        }
        .icon-ifo {
            float: left;
            height: 32rem/$base;
            display: inline-block;
        }
    }
    .show-info {
        flex: none;
        padding: 36rem/$base 48rem/$base;
        display: flex;
        justify-content: center;
        .information {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, .2);
            &:nth-last-of-type(1) {
                border-right: none;
            }
            .infomation-title {
                font-size: 20px;
                color: rgb(147, 153, 159);
                line-height: 1;
                @include font(20);
                margin-bottom: 10rem/$base;
            }
            .infomation-content {
                font-size: 48px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 1;
                @include font(48);
                span {
                    font-size: 20px;
                    @include font(20);
                }
            }
        }
    }
    .scroll-content {
        flex: auto;
        overflow: hidden;
        .scroll-1 {
            padding: 36rem/$base;
        }
        .seller-intro {
            padding: 24rem/$base;
            font-size: 24px;
            font-weight: 200;
            color: rgb(240, 20, 20);
            line-height: 2;
        }
    }


    .divider {
        height: 32rem/$base;
        border-top: 1px solid #ddd8d8;
        border-bottom: 1px solid #ddd8d8;
        background-color: #f3f5f7;
        float: none;
    }
    .seller-title {
        font-size: 28px;
        color: rgb(7, 17, 27);
        line-height: 1;
        padding-bottom: 16rem/$base;
    }
}
.swiper1{
    margin-top: 24rem/$base;
}
.swiper-slide {
    width: 240rem/$base;
    height: 180rem/$base;
}
</style>
