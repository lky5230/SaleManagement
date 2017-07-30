<template>
<div class="title-wrap">
    <div class="line"></div>
    <div class="title" :style="{'font-size': fontSize + 'px'}">
        {{title}}
    </div>
    <div class="line"></div>
</div>  
</template>

<script>
export default {
  props:{
      title:{},
      fontSize:{
        default: 16
      }
  }
}
</script>

<style lang="scss" scoped>
$base: 75;
.title-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    .line{
        height: 3px;
        flex: auto;
        background-color: rgba(255, 255, 255, .2);
    }
    .title{
        padding-left: 24rem/$base;
        padding-right: 24rem/$base;
        text-align: center;
        color: #fff;
        font-weight: bold;
    }
}
</style>


