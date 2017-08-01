<template>
  <div ref="judge" class="judge-page">
      <div>
      <div class="store-wrap">
        <div class="score">
            <h3>{{seller.score}}</h3>
            <div>综合评分</div>
            <p>高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="line"></div>
        <div class="rate">
            <div class="item">
                <span class="taidu">食物评分</span>
                <score class="score0" :score="seller.foodScore"></score>
                <span class="all-score">{{seller.foodScore}}</span>
            </div>
            <div class="item">
                <span class="taidu">服务态度</span>
                <score class="score0" :score="seller.serviceScore"></score>
                <span class="all-score">{{seller.serviceScore}}</span>
            </div>
            <div class="item">
                <span class="taidu">送达时间</span>
                <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="rate-wrap">
        <div class="judge">
            <span @touchend="filter(0)" class="judge-all" :class="{active:active ==0}">全部{{filterCount.all}}</span>
            <span @touchend="filter(1)" class="judge-1" :class="{active:active ==1}">推荐{{filterCount.tuijian}}</span>
            <span @touchend="filter(-1)" class="judge-0" :class="{active:active ==-1}">吐槽{{filterCount.tucao}}</span>
        </div>
      </div>
      <div ref="comment" class="comment">
          <div>
            <comment-list2 :ratings="item" v-for="(item, index) in filter(active)" :key="index"></comment-list2>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import score from '@/components/score'
import commentList2 from '@/components/commentList2'
import BS from 'better-scroll'
export default {
  data(){
    return {
        active: 0,
        filterCount: {}
    }
  },
  computed:{
    ratings() {
        return this.$store.state.data.ratings || [];
    },
    seller() {
        return this.$store.state.data.seller || {};
    },
    getSuccess(){
        return this.$store.state.getSuccess;
    }
  },
  methods:{
    filter(type){
        let d = this.ratings;
        let tuijian = d.filter(item=>{
            return item.rateType == 0;
        });
        let tucao = d.filter(item=>{
            return item.rateType == 1;
        });

        if(type == 0) {
            this.active = 0;
            return d
        };
        if(type == 1) {
            this.active = 1;
            return tuijian;
        }
        if(type == -1) {
            this.active = -1;
            return tucao;
        }
    },
    initFilter_Scroll(){
        let d = this.ratings;
        let tuijian = d.filter(item=>{
            return item.rateType == 0;
        });
        let tucao = d.filter(item=>{
            return item.rateType == 1;
        });
        
        this.$set(this.filterCount,'all',d.length);
        this.$set(this.filterCount,'tuijian',tuijian.length);
        this.$set(this.filterCount,'tucao',tucao.length);
        this.scroll = new BS(this.$refs.judge, {
            startX: 0,
            startY: 0,
            click: true,
            HWCompositing: true
        });
    }
  },
  components:{
      score,
      commentList2
  },
  updated(){
    this.$nextTick(() => {
        if(this.scroll){
            this.scroll.refresh();
        }
    })
  },
  mounted(){
    this.initFilter_Scroll();
  },
  watch: {
    getSuccess(newVal) {
        if (newVal) {
            this.initFilter_Scroll();
        }
    }
  },
  destroyed(){
      this.scroll.destroy();
  }

}
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
$base: 75;
.judge-page{
    height: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    .store-wrap{
        margin: 0 auto;
        display: flex;
        flex: none;
        justify-content: center;
        .score{
            flex: none;
            padding: 36rem/$base 48rem/$base;
            width: 275rem/$base;
            text-align: center;
            h3{
                font-size: 48px;
                color: rgb(255, 153, 0);
                line-height: 1.3;
                @include font(48);
                margin-bottom: 12rem/$base;
            }
            div{
                font-size: 24px;
                color: rgb(7, 17, 27);
                line-height: 1;
                @include font(24);
                margin-bottom: 16rem/$base;
            }
            p{
                font-size: 20px;
                color: #59626a;
                line-height: 1;
                @include font(20);
            }

        }
        .line{
            width: 2rem/$base;
            margin-top: 36rem/$base;
            margin-bottom: 36rem/$base;
            background: #b6b6b6;
        }
        .rate{
            flex: none;
            width: 474rem/$base;
            padding: 36rem/$base 48rem/$base;
            .item{
                display: flex;
                align-items: center;
                margin-bottom: 16rem/$base;
                .taidu{
                    font-size: 24px;
                    color: rgb(7, 17, 27);
                    line-height: 1;
                    @include font(24);
                }
                .score0{
                    padding: 0;
                    width: 180rem/$base;
                    margin-left: 18rem/$base;
                    margin-right: 18rem/$base;
                }
                .all-score{
                    font-size: 24px;
                    color: rgb(255,153,0);
                    line-height: 1;
                    @include font(24);
                }
                .time{
                    font-size: 24px;
                    color: rgb(147, 153, 159);
                    @include font(24);
                    margin-left: 24rem/$base;
                }
            }
        }
    }
    .divider {
        height: 32rem/$base;
        border-top: 1px solid #ddd8d8;
        border-bottom: 1px solid #ddd8d8;
        background-color: #f3f5f7;
        flex: none;
    }
    .rate-wrap{
        padding-left: 36rem/$base;
        padding-right: 36rem/$base;
        .judge{
            border-bottom: 1px solid rgba(77, 83, 93, .4);
            padding-top: 36rem/$base;
            padding-bottom: 36rem/$base;
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
                color: #3bdcc6;
                font-size: 26px;
                @include font(26); 
            }
        }
        .judge-all{
            background-color: #00a0dc;
            color: rgb(77, 85, 93);
        }
        .judge-0{
            color: rgb(77, 85, 93);
            background-color: #e9ebec;
        }   
        .judge-1{
            color: rgb(77, 85, 93);
            background-color: #ccecf8;
        }
    }
    .comment{
        flex: auto;
        // overflow: hidden;
    }
}
</style>
