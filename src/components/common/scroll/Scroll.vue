<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
 
  },
  data(){
    return {
      scroll:null
    }
  },
  //1.创建BScroll对象
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // this.scroll.scrollTo(,y)
    //2.监听滚动区域
    if(this.probeType === 2 || this.probeType === 3){
       this.scroll.on('scroll',(position) =>{
      // console.log(position)
         this.$emit('scroll', position);
      
    })
    }
   
    // console.log(this.scroll)
    //3.监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on("pullingUp",() =>{
        // console.log("监听到滚动底部")
        this.$emit("pullingUp")
      })
    }


  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
  
    refresh(){
      //刷新当前页面
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
  
</style>