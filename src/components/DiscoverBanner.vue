<template>
  <div class="discover-banner">
    <van-swipe :autoplay="3000">
      <van-swipe-item
        class="banner-content"
        v-for="(b, i) in bannerimgdata"
        :key="i"
      >
        <img class="banner-img" v-lazy="b.img" />
      </van-swipe-item>
    </van-swipe>


  </div>
</template>
<script>
export default {
  props: {
    bannerimgdata: Array,
    HomepageItemList: Array,
  },
};
</script>

<style lang="scss" scoped>
.discover-banner {
  width: 100vw;
  height: 20vh;
  padding: 0 10px;
  // overflow: auto;
  background-color: rgb(253, 188, 188);

  .van-swipe {
    height: 100%;
    border-radius: 15px;
    overflow: hidden;

    .banner-content {
      width: 80%;
      height: 100%;
    }

    .banner-img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }


}
</style>