<template>
  <div class="cart">
    <!--导航 -->
   
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{ length }})</div>
      </nav-bar>
  

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from './childComps/CartBottomBar'
//将store中的getters函数映射到computed
import { mapGetters } from "vuex";


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      //key是自己取别名
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}



</style>