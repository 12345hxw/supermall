<template>
  <div id="detail">
    <deatil-nav-bar/>
    <deatil-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DeatilNavBar from './childComps/DeatilNavBar'
import {getDetail,Goods} from 'network/detail'
import DeatilSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

export default {
  name:'Detail',
  components:{
    DeatilNavBar,
    DeatilSwiper,
    DetailBaseInfo
   
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{}
    }
  },
  created(){
    //1.保存传入的Iid
    this.iid=this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
     //1.获取顶部的轮播数据
     const data=res.result
     this.topImages=res.result.itemInfo.topImages

     //2.获取商品数据
     this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style scoped>
  
</style>