<template>
  <div class="list-content">
      <div class="avatar">
          <div class="img">
              <img class="center-block" :src="ratings.avatar" alt="">
          </div>
      </div>
      <div class="info">
        <div class="info-tip clearfix">
            <span class="info-user">{{ratings.username}}</span>
            <span class="info-time">{{formateDate(ratings.rateTime)}}</span>
        </div>
        <div class="score-wrap">
            <div class="sc">
                <score w="0.2667" :score="ratings.score"></score>
            </div>
            <template v-if="ratings.deliveryTime && ratings.deliveryTime != ''">
                <div class="deliver-time">{{ratings.deliveryTime}}分钟送达</div>
            </template>
        </div>
        <p class="info-content">{{ratings.text || ""}}</p>
        <div class="badge clearfix">
            <span v-for="(item, index) in ratings.recommend" :key="index" class="badge-info nowrap">{{item}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import score from "@/components/score"
import { formateDate } from '../util/index.js'
export default {
  props:["ratings"],
  components:{
      score
  },
  methods:{
      formateDate: formateDate,
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
$base: 75;
.list-content{
    margin: 36rem/$base;
    margin-bottom: 0;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    .avatar{
        flex: none;
        width: 56rem/$base;
        .img{
            width: 56rem/$base;
            height: 56rem/$base;
            overflow: hidden;
            border-radius: 50%;
        }
    }
    .info{
        flex: auto;
        margin-bottom: 8rem/$base;
        margin-left: 24rem/$base;
        .info-tip{
            .info-user{
                float: left;
                display: inline-block;
                font-size: 20px;
                color: rgb(7, 17, 27);
                @include font(20);
            }
            .info-time{
                float: right;
                display: inline-block;
                font-size: 20px;
                color: rgb(147, 153, 159);
                font-weight: 200;
                @include font(20);
            }
        }
        .score-wrap{
            height: 20rem/$base;
            display: flex;
            margin-top: 10rem/$base;
            margin-bottom: 12rem/$base;
            .sc{
                width: 144rem/$base;
            }
            .deliver-time{
                flex: auto;
                font-size: 20px;
                line-height: 1;
                margin-left: 16rem/$base;
                @include font(20);
                font-weight: 200;
                color: rgba(7, 17, 27, .9);
            }
        }
        .info-content{
            font-size: 24px;
            color: rgb(7, 17, 27);
            line-height: 1.5;
            margin-bottom: 16rem/$base;
        }
        .badge{
            .badge-info{
                float: left;
                height: 40rem/$base;
                max-width: 140rem/$base;
                line-height: 40rem/$base;
                padding-left: 14rem/$base;
                padding-right: 14rem/$base;
                text-align: center;
                border: 1px solid rgba(7, 17, 27, .4);
                color: rgba(7, 17, 27, .6);
                margin: 8rem/$base;
                margin-left: 0;
                background-color: #fff;
            }   
        }
    }
}
</style>
