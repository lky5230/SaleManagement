<template>
    <div class="score">
        <span :style="{width: w+'rem', height: w+'rem'}" :class="[item]" v-for="(item, index) in scoreArr" :key="index"></span>
    </div>
</template>

<script>
import { scoreFormat } from '@/util/index.js'
export default {
    props: ["score"],
    props:{
        score:{},
        w:{
            default: 0.64
        }
    },
    computed: {
        scoreArr() {
            return scoreFormat(this.score);
        }
    }
}
</script>

<style lang="scss" scoped>
$base: 75;
.score {
    display: flex;
    justify-content: space-around;
    width: 100%;
    span {
        display: inline-block;
        background-size: contain;
        background-position-y: center;
        background-repeat: no-repeat;
        &.all {
            background-image: url("../assets/img/star36_on@2x.png");
            [data-dpr="1"] & {
                background-image: url("../assets/img/star36_on@2x.png");
            }
            [data-dpr="3"] & {
                background-image: url("../assets/img/star36_on@3x.png");
            }
        }
        &.half {
            background-image: url("../assets/img/star36_half@2x.png");
            [data-dpr="1"] & {
                background-image: url("../assets/img/star36_half@2x.png");
            }
            [data-dpr="3"] & {
                background-image: url("../assets/img/star36_half@3x.png");
            }
        }
        &.none {
            background-image: url("../assets/img/star36_off@2x.png");
            [data-dpr="1"] & {
                background-image: url("../assets/img/star36_off@2x.png");
            }
            [data-dpr="3"] & {
                background-image: url("../assets/img/star36_off@3x.png");
            }
        }
    }
}
</style>