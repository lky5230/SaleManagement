<template>
    <div class="goods">
        <div ref="gt" class="goods-title">
            <ul>
                <li @click="gtClick(index)" :class="{active: index == nowIndex}" v-for="(item, index) in goods" :key="index">
                    <span v-if="item.type != -1" class="icon" :class="[supportsType(item.type)]"></span>
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div ref="gc" class="goods-content">
            <ul>
                <li :ref="'gcLi'+index" v-for="(item, index) in goods" :key="index">
                    <h3>{{item.name}}</h3>
                    <div class="goods-content-info" v-for="(te, index2) in item.foods" :key="index2" @click="goodsDetails(te)">
                        <div :style="{'background-image': `url(${te.icon})`}" class="avatar"></div>
                        <div class="info">
                            <h4>{{te.name}}</h4>
                            <p v-if="te.description" class="buchong">
                                {{te.description}}
                            </p>
                            <p class="sale">
                                月售{{te.sellCount}}份&nbsp;&nbsp;好评率{{te.rating}}%
                            </p>
                            <p class="price">
                                <span class="new-price">￥{{te.price}}</span>
                                <span v-if="te.oldPrice" class="old-price">￥{{te.oldPrice}}</span>
                            </p>
                        </div>
                        <div class="btn">
                            <div class="btn-wrap">
                                <template v-if="$store.getters.buyListCount[te.name]">
                                    <span @click="decPro(te.name, $event)" class="dec"></span>
                                    <span class="number">{{$store.getters.buyListCount[te.name]}}</span>
                                </template>
                                <span @click="addPro(te.name, te.price, $event)" class="inc"></span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BS from 'better-scroll'
import { supportsType } from '../util/index.js'
export default {
    data() {
        return {
            nowIndex: 0,
            //右侧每列li高度，不叠加的集合
            gcList: [],
        }
    },
    computed: {
        goods() {
            return this.$store.state.data.goods;
        },
        //右侧每列li高度，叠加的集合
        gcList2() {
            if (this.gcList.length == 0) return [];
            return this.gcList.map((item, index) => {
                return this.gcList.slice(0, index * 1 + 1).reduce((a, b) => a + b);
            });
        },
        //异步数据请求成功
        getSuccess() {
            return this.$store.state.getSuccess;
        }
    },
    methods: {
        supportsType: supportsType,
        //左侧点击，右侧滚动
        gtClick(index) {
            let h = 0;
            if (index != 0) {
                h = this.gcList.slice(0, index).reduce((a, b) => a + b);
            };
            this.gc.scrollTo(0, -h, 400);
            this.nowIndex = index;
        },
        //收集右边li高度
        getLiHeight(){
            let index = 0;
            while (true) {
                let dom = this.$refs['gcLi' + index];
                if (!dom) break;
                this.gcList.push(dom[0].clientHeight)
                index++;
            };
        },
        //减少商品
        decPro(goodsName, e) {
            e.stopPropagation();
            this.$store.commit('decreaseProduct', { goodsName });
        },
        //增加商品
        addPro(goodsName, price, e) {
            e.stopPropagation();
            this.$store.commit('addProduct', { goodsName, price })
        },
        //展示右侧商品的详情
        goodsDetails(goods) {
            this.$store.commit('showGoodsDetails', goods)
        }
    },
    mounted() {
        // 将右侧各li高度收集
        this.$nextTick(() => {this.getLiHeight()});

        this.gc = new BS(this.$refs.gc, {
            startX: 0,
            startY: 0,
            probeType: 3,
            click: true,
            HWCompositing: true
        });
        this.gt = new BS(this.$refs.gt, {
            startX: 0,
            startY: 0,
            probeType: 3,
            click: true,
            HWCompositing: true
        });
        //右侧滚动,左侧对应项激活
        this.gc.on('scroll', pos => {
            let py = Math.abs(pos.y);
            if (this.scrollTimer) clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                for (let i = 0; i < this.gcList2.length; i++) {
                    if (py + 100 < this.gcList2[0]) this.nowIndex = 0;
                    if (py + 100 > this.gcList2[i] && py <= this.gcList2[i + 1]) {
                        this.nowIndex = i + 1;
                    }
                }
            }, 0);
        });

    },
    watch: {
        //因为加载第一次异步数据，没完成前mounted那的收集无效，所以这里请求成功后，再来重新收集li高度
        getSuccess(newVal) {
            if (newVal) {
                this.$nextTick(()=>{
                    this.getLiHeight()
                });
            }
        }
    },
    updated() {
        this.gc.refresh();
        this.gt.refresh();
    },
    destroyed() {
        this.gc.destroy()
        this.gt.destroy()
    }
}
</script>

<style lang="scss" scoped>
@import '../style/type.scss';
@import '../style/mixin.scss';
$base:75;
.goods {
    display: flex;
    height: 100%;
    .goods-title {
        flex: none;
        width: 160rem/$base;
        background-color: #f3f5f7;
        .icon {
            display: inline-block;
            align-self: top;
            width: 30rem/$base;
            height: 30rem/$base;
            margin-right: 2rem/$base;
            background-repeat: no-repeat;
            background-size: contain;
            background-position-x: left;
            background-position-y: center;
        }
        li {
            height: 108rem/$base;
            padding-left: 24rem/$base;
            padding-right: 24rem/$base;
            font-size: 24px;
            color: #666;
            display: flex;
            align-items: center;
            background-color: #f3f5f7;
            position: relative;
            @include font(24);
            &.active {
                color: #333;
                background-color: #fff;
            }
            &:after {
                position: absolute;
                content: " ";
                width: 112rem/$base;
                height: 1px;
                background: rgba(7, 17, 27, .1);
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .goods-content {
        flex: auto;
        h3 {
            height: 52rem/$base;
            line-height: 52rem/$base;
            border-left: 4rem/$base solid #d9dde1;
            font-size: 24px;
            background-color: #f3f5f7;
            text-indent: 28rem/$base;
            @include font(24);
        }
        .goods-content-info {
            padding: 36rem/$base;
            display: flex;
            .avatar {
                width: 114rem/$base;
                height: 114rem/$base;
                background-size: contain;
                background-repeat: no-repeat;
                flex: none;
                margin-right: 20rem/$base;
            }
            .info {
                flex: auto;
                h4 {
                    font-size: 28px;
                    color: rgb(7, 17, 27);
                    @include font(28);
                    margin-top: 4rem/$base;
                    margin-bottom: 14rem/$base;
                }
                p.buchong,
                p.sale {
                    font-size: 20px;
                    color: rgb(147, 153, 159);
                    margin-top: 14rem/$base;
                    @include font(20);
                }
                .price {
                    margin-top: 14rem/$base;
                    .new-price {
                        font-size: 24px;
                        color: #f01414;
                        @include font(24);
                    }
                    .old-price {
                        font-size: 20px;
                        color: #666;
                        text-decoration: line-through;
                        @include font(20);
                    }
                }
            }
            .btn {
                align-self: flex-end;
                .btn-wrap {
                    display: flex;
                    justify-content: space-around;
                }
                .dec,
                .inc {
                    display: inline-block;
                    width: 38rem/$base;
                    height: 38rem/$base;
                    background-size: cover;
                    border-radius: 50%;
                }
                .dec {
                    background: url('../assets/img/dec.png') no-repeat center center;
                    [data-dpr="3"] & {
                        background: url('../assets/img/dec@3x.png') no-repeat center center;
                    }
                }
                .number {
                    display: inline-block;
                    width: 48rem/$base;
                    height: 38rem/$base;
                    text-align: center;
                    line-height: 38rem/$base;
                    margin-left: 10rem/$base;
                    margin-right: 10rem/$base;
                }
                .inc {
                    background: url('../assets/img/inc.png') no-repeat center center;
                    [data-dpr="3"] & {
                        background: url('../assets/img/inc@3x.png') no-repeat center center;
                    }
                }
            }
        }
    }
}
</style>
