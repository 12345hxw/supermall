<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">

    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

   <div  v-else>
      <slot name="item-icon-active"></slot>
   </div>
    
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    
    <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data(){
      return{
      // isActive:true,
      }
    },
    computed:{
      isActive(){
        //   /home  ->item(/home)  = true
        //   /home  ->item(/category)  = false
        //    .....
        //检索的字符串值没有出现，则该方法返回 -1。
        return this.$route.path.indexOf(this.path) !==-1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 去除图片下面的三个像素 */
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
