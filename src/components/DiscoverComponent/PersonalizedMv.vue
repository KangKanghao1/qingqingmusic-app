<template>
  <div class="personalized-mv">
    <div class="mv-content">
      <h3 class="mv-title">推荐MV</h3>
      <span>更多</span>
    </div>
    <div class="mv-title-contnet">
      <div v-for="r in personalizedmv" :key="r.id">
        <div class="permv">
          <img class="mv-img" v-lazy="r.picUrl" alt="" />
          <p class="mv-title">{{ r.artistName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    personalizedmv: Array,
  },
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  display: none;
}
.personalized-mv {
  // width: 100vw;
  // height: 20vh;
  padding: 15px;
 background-color: #222325;

  .mv-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 15px;
    font-weight: bold;
    font-size: 16px;
     color: #fff;
  }

  .mv-title-contnet {
    display: flex;
    justify-content: space-between;
    overflow: auto;
    color: #fff;
    padding: 10px 0;
    .permv {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 15px;
      overflow: hidden;
      margin: 0 10px 0 0;
      .mv-img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .mv-title {
        position: absolute;
        top: 40%;
        left: 50%;
        font-size: 16px;
        font-weight: bold;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
