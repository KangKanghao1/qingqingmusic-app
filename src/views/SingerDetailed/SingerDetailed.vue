<template>
  <div class="singer-detailed">
    <div class="singer-nav">
      <i class="quit-ginger"></i>
    </div>
    <div class="singer-name-img">
      <img :src="singerartistdata.picUrl" alt="" />
      <div class="singer-mask">
        <div class="mask-singer-name">{{ singerartistdata.name }}</div>
      </div>
    </div>

    <van-tabs
      sticky
      color="#fff"
      background="black"
      title-inactive-color="#fff"
      title-active-color="red"
      offset-top="50px"
    >
      <van-tab class="single-song" title="单曲">
        <van-sticky :offset-top="100">
          <div>顺序播放</div>
        </van-sticky>
        <SingerSong
          :singersongdata="singersongdata"
          :singerartistdata="singerartistdata"
        />
      </van-tab>
      <van-tab title="专辑">
        <van-sticky :offset-top="100">
          <div>吸顶距离</div>
        </van-sticky>
        <div>456</div>
      </van-tab>
      <van-tab title="视频">
        <van-sticky :offset-top="100">
          <div>吸顶距离</div>
        </van-sticky>
        内容 3</van-tab
      >
      <van-tab title="详情">
        <van-sticky :offset-top="100"> <div>吸顶距离</div> </van-sticky>内容
        4</van-tab
      >
    </van-tabs>
  </div>
</template>
<script>
import { getsingleSong } from "@/apis/index";
import SingerSong from "@/components/SingersongComponents/SingerSong.vue";
export default {
  data() {
    return {
      // 歌手id
      singerid: "",
      //   歌手详情
      singerartistdata: {},
      //   歌手单曲
      singersongdata: [],
    };
  },

  components: {
    SingerSong,
  },

  created() {
    this.singerid = this.$route.query.singerid;
    this.getsingleSongdata();
  },

  methods: {
    // 获取歌手数据
    async getsingleSongdata() {
      let { data } = await this.$axios(getsingleSong(this.singerid));
      this.singerartistdata = data.artist;
      this.singersongdata = data.hotSongs;
      console.log("123", this.singersongdata);
      console.log(this.singerartistdata);
    },

  },
};
</script>
<style lang="scss" scoped>
.singer-detailed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #222325;
  padding-bottom: 100px;
  overflow: auto;

  .singer-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 20px;
    z-index: 3;
    .quit-ginger {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      background-image: url("@/assets/imgs/leftdci.png");
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      content: "";
    }
  }

  .singer-name-img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .singer-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 2;

      .mask-singer-name {
        position: absolute;
        bottom: 20px;
        left: 20px;
        font-size: 32px;
      }
    }
  }
}
</style>