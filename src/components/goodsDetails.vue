<template>
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
        <div v-if="showDetails" style="animation-duration: .3s" class="goods-details">
            <div ref="wrap" class="wrap">
                <div>
                    <div class="back" @touchend="$store.commit('closeGoodsDetails')"></div>
                    <img :src="detailsData.image" alt="" class="details-img">
                    <div class="info">
                        <h4 class="title">{{detailsData.name}}</h4>
                        <span class="buchong">月售{{detailsData.sellCount}}份</span>
                        <span class="buchong">好评率{{detailsData.rating}}%</span>
                        <div class="toShop">
                            <span class="price">￥{{detailsData.price}}</span>
                            <span v-if="detailsData.oldPrice" class="old-price">￥{{detailsData.oldPrice}}</span>
    
                            <div @touchend="addPro(detailsData.name,detailsData.price)" class="addTo">加入购物车</div>
                            <span class="count" v-if="$store.getters.buyListCount[detailsData.name]">
                                共{{$store.getters.buyListCount[detailsData.name]}}份
                            </span>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="info">
                        <h4 class="title">商品介绍</h4>
                        <p class="info2">{{detailsData.info || '略...'}}</p>
                    </div>
                    <div class="divider"></div>
                    <div class="info">
                        <div class="title">商品评价</div>
                        <div class="judge">
                            <span @touchend="filterJudge(-1)" class="judge-all" :class="{active: active==-1}">全部</span>
                            <span @touchend="filterJudge(0)" class="judge-1" :class="{active: active==0}">推荐</span>
                            <span @touchend="filterJudge(1)" class="judge-0" :class="{active: active==1}">吐槽</span>
                        </div>
                        <div>
                            <comment-list :ratings="ratingList" v-for="(ratingList, index) in filterJudge(active)" :key="index"></comment-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import BS from 'better-scroll'
import commentList from '@/components/commentList'
export default {
    data(){
        return {
            // 哪类用户评论
            active: -1,
            //存储滚动实例
            wrap: null,
        }
    },
    computed: {
        showDetails() {
            return this.$store.state.isShowGoodsDetails;
        },
        detailsData() {
            return this.$store.state.goodsDetailsData;
        }
    },
    methods: {
        addPro(goodsName, price) {
            this.$store.commit('addProduct', { goodsName, price });
        },
        filterJudge(type){
            let d = this.detailsData.ratings;
            //推荐
            if(type==0){
                this.active = 0;
                return d.filter(item=>{
                    return item.rateType == 0
                })
            }
            //吐槽
            if(type==1){
                this.active = 1;
                return d.filter(item=>{
                    return item.rateType == 1
                })
            }
            //全部
            this.active = -1;
            return d;
        }
    },
    updated() {

    },
    watch: {
        //进入时给dom加滚动插件
        showDetails(newVal, oldVal){
            if(newVal == true){
                this.$nextTick(()=>{
                    this.wrap = new BS(this.$refs['wrap'], {
                        HWCompositing: true,
                        preventDefault: true,
                    });
                })
            }
        }
    },
    components:{
        commentList
    }
}
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
$base: 75;
.goods-details {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #fcfcfc;
    left: 0;
    top: 0;
    z-index: 1001;
    overflow: hidden;
    .wrap {
        height: 100%;
        .back {
            position: absolute;
            left: 80rem/$base;
            top: 80rem/$base;
            width: 140rem/$base;
            height: 80rem/$base;
            background: url('../assets/img/back.png') no-repeat left center;
        }
    }
    .details-img {
        width: 100%;
        height: 750rem/$base;
    }
    .info {
        padding: 36rem/$base;
        .judge{
            padding-bottom: 36rem/$base;
            border-bottom: 1px solid rgba(77, 83, 93, .4);
        }
        .judge-all,
        .judge-0,
        .judge-1{
            padding:16rem/$base 24rem/$base;
            margin-right: 16rem/$base;
            font-size: 24px;
            @include font(24); 
            line-height: 1; 
            display: inline-block;
            border-left: 3rem/$base solid transparent;
            &.active{
                border-left-color: #2035cc;
            }
        }
        .judge-all{
            background-color: #00a0dc;
            color: #fff;
        }
        .judge-0{
            color: rgb(77, 85, 93);
            background-color: #e9ebec;
        }   
        .judge-1{
            color: rgb(77, 85, 93);
            background-color: #ccecf8;
        }
        .info2 {
            font-size: 24px;
            font-weight: 200;
            color: rgb(77, 85, 93);
            line-height: 1.5;
            @include font(24);
        }
        .title {
            font-size: 28px;
            color: rgb(7, 17, 27);
            font-weight: bold;
            margin-bottom: 36rem/$base;
            @include font(28);
        }
        .buchong {
            display: inline-block;
            color: rgb(147, 153, 159);
            font-size: 20px;
            @include font(20);
            margin-right: 24rem/$base;
        }
        .toShop {
            margin-top: 36rem/$base;
            height: 48rem/$base;
            .price {
                font-size: 28px;
                line-height: 48px;
                @include font(28);
                color: rgb(240, 20, 20);
                font-weight: 700;
            }
            .old-price {
                font-size: 20px;
                line-height: 48px;
                @include font(20);
                color: rgb(147, 153, 159);
                font-weight: 400;
                text-decoration: line-through;
            }
            .count {
                float: right;
                margin-right: 24rem/$base;
                height: 48rem/$base;
                line-height: 48rem/$base;
                font-size: 24px;
                @include font(24);
                color: #406d7d;
            }
            .addTo {
                float: right;
                height: 48rem/$base;
                line-height: 1;
                padding: 14rem/$base 18rem/$base;
                text-align: center;
                border-radius: 24rem/$base;
                font-size: 20px;
                @include font(20);
                color: #fff;
                background-color: #00a0dc;
            }
        }
    }
    .divider {
        height: 32rem/$base;
        border-top: 1px solid #ddd8d8;
        border-bottom: 1px solid #ddd8d8;
        background-color: #f3f5f7;
    }
}
</style>
