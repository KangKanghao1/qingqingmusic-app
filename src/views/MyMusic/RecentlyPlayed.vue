<template>
  <div class="recently-play">
    <van-nav-bar left-text="最近播放" left-arrow @click-left="onClickLeft">
      
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.recently-play {
  position: fixed;
  top: 0px;
  bottom: 100px;
  width: 100%;
  background-color: #383737;

   .van-nav-bar {
    background-color: #383737;
   ::v-deep .van-icon{
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;

    }
   ::v-deep .van-nav-bar__text{
      color: #fff;
      font-size: 15px;
      letter-spacing: 2px;
      margin-left: 5px;
    }

  }
}
</style>