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
    this.scroll.on('scroll',(position) =>{
      // console.log(position)
      this.$emit('scroll', position);
      
    })
    // console.log(this.scroll)
    this.scroll.refresh()


  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      //刷新当前页面
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  
</style>