<template>
  <div class="singer-song-com">
    <ul class="singer-ul">
      <li v-for="s in singersongdata" :key="s.id">
        <div class="singer-al-name">
          <!-- <img class="singer-al-img" :src="s.al.picUrl" alt="" /> -->
          <van-image
          lazy-load
          :src="s.al.picUrl"
          class="singer-al-img"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
          <div class="singer-song-name">
            <span>{{ s.name }}</span>
            <p class="singer-name">{{ singerartistdata.name }}</p>
          </div>
        </div>
        <i class="new-icon"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    singersongdata: Array,
    singerartistdata: Object,
  },
};
</script>

<style lang="scss" scoped>
.singer-song-com {
  overflow: auto;
  .singer-ul {
    li {
      margin-top: 15px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .singer-al-name {
        display: flex;
        align-items: center;
        .singer-al-img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 15px;
          margin-right: 10px;
        }
        .singer-song-name {
          .singer-name {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
          }
        }
      }

      .new-icon {
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background-image: url("@/assets/imgs/shengluehao.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        content: "";
      }
    }
  }
}
</style>