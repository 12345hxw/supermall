<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: {},
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //第一次获取，值不对
      //值不对的原因，(this.$refs.params.$el压根没有渲染
      //  this.themeTopYs = [];
      //         this.themeTopYs.push(0);
      //         this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //         this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //         this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //         console.log(this.themeTopYs);
      this.$nextTick(() => {
        //2.第二次获取：值不对
        //值不对的原因：图片没有计算在内
        //根据最新的数据，对应的dom是已经被渲染出来了
        //但是图片依然没有被加载完(目前获取到的offSetTop不包括图片)
        //offsetTop值不对的时候，都是因为图片原因
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    }),
      //3.请求推荐数据
      getRecommend().then((res) => {
        // console.log(res)
        this.recommend = res.data.list;
      });
    //4.给getThemeTopHY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position)

      //1.获取Y值
      const positionY = -position.y;

      //2.positionY和主题中的进行对比
      //[0, 15946, 17218, 17434，MAX.VALUE]
      //positionY在0和15946之间，index=0
      //positonY 在15946和17218，index=1
      // positonY 在17218和17434，index=2
      // positonY 在17218和非常大的值之间，index=3

      let length = this.themeTopYs.length;
       for (let i = 0; i <length -1; i++) {
        if (this.currentIndex !== i && ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))) {
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    }
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* 减号两边的空格不能省略 */
  height: calc(100% - 44px);
}
</style>
