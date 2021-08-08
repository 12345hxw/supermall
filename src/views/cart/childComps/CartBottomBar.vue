<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
      class="check-button"
      :is-checked="isSelectAll"
    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="count">合计¥:{{ totalprice }}</div>
    <div class="calc">结算:{{ checklength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true));
      }
      // this.$toast.methods.isShow
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalprice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    checklength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      return (
        this.cartList.length !== 0 &&
        this.cartList.every((item) => item.checked)
      );
      // if(this.cartList.length === 0) return false
      // for (let item of this.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  background-color: #dbe5ec;
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.check-content {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.count {
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
  font-size: 13px;
}
.calc {
  width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 14px;
}
</style>