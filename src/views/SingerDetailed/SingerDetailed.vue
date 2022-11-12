<template>
  <transition name="anime" appear>
    <div class="singer-detailed">
      <div class="singer-nav">
        <i class="quit-ginger" @click="goqiutsinger"></i>
      </div>
      <div class="singer-name-img">
        <img class="singer-img" :src="singerartistdata.picUrl" alt="" />
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
          <van-sticky class="offset-title" :offset-top="90">
            <div>
              <div class="offset-content">
                <i class="offset1-icon"></i>
                <p>顺序播放</p>
              </div>
              <div class="offset-song-icon"></div>
            </div>
          </van-sticky>
          <van-loading
            v-show="showloading"
            class="spinnerloading"
            type="spinner"
            color="red"
          />
          <SingerSong
            :singersongdata="singersongdata"
            :singerartistdata="singerartistdata"
          />
        </van-tab>
        <van-tab title="专辑" class="single-song">
          <SingerHotAlbums :singerHotAlbums="singerHotAlbums" />
        </van-tab>
        <van-tab title="视频" class="single-song">
          <SingerMV :singertMv="singertMv" />
        </van-tab>
        <van-tab title="详情" class="single-song">
          <SingerDetailed :singerdesc="singerdesc" />
        </van-tab>
      </van-tabs>
      <PlayControl class="PlayControl-bottm" />
    </div>
  </transition>
</template>
<script>
import {
  getsingleSong,
  getArtistAlbum,
  getartistmvdata,
  getsingerdesc,
} from "@/apis/index";
import SingerSong from "@/components/SingersongComponents/SingerSong.vue";
import SingerHotAlbums from "@/components/SingerHotAlbumsComponent/SingerHotAlbums.vue";
import SingerMV from "@/components/SingerMVComponent/SingerMV.vue";
import SingerDetailed from "@/components/SingerDetailedComponed/SingerDetailed.vue";
import PlayControl from "@/components/PlayControl.vue";
export default {
  data() {
    return {
      // 歌手id
      singerid: "",
      // 歌手详情
      singerartistdata: {},
      // 歌手单曲
      singersongdata: [],
      // show loading显示
      showloading: true,
      // 专辑数据
      singerHotAlbums: [],
      // 歌手mv
      singertMv: [],
      // 详情
      singerdesc: {},
    };
  },

  components: {
    SingerSong,
    SingerHotAlbums,
    SingerMV,
    SingerDetailed,
    PlayControl,
  },

  created() {
    this.singerid = this.$route.query.singerid;
    this.getsingleSongdata();
    // 专辑
    this.getArtistAlbumdata();

    // mv
    this.getsingerartistmvdata();

    // 描述
    this.getsingerdescdata();
  },

  methods: {
    goqiutsinger() {
      this.$router.go(-1);
    },

    // 获取歌手数据
    async getsingleSongdata() {
      let { data } = await this.$axios(getsingleSong(this.singerid));
      this.singerartistdata = data.artist;
      // 单曲
      this.singersongdata = data.hotSongs.map((d) => {
        return {
          id: d.id,
          name: d.name,
          picUrl: d.al.picUrl,
          alg: d.al,
          song: {
            artists: [
              {
                name: this.singerartistdata.name,
              },
            ],
          },
        };
      });
      console.log("单曲 ==>", this.singersongdata);
      this.showloading = !this.showloading;
    },
    // 专辑
    async getArtistAlbumdata() {
      let { data } = await this.$axios(getArtistAlbum(this.singerid));
      this.singerHotAlbums = data.hotAlbums;
    },
    // mv
    async getsingerartistmvdata() {
      let { data } = await this.$axios(getartistmvdata(this.singerid));
      this.singertMv = data.mvs;
    },

    async getsingerdescdata() {
      let data = await this.$axios(getsingerdesc(this.singerid));
      this.singerdesc = data.data;
      // console.log("描述 ==>", data.data);
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
  padding-bottom: 50px;
  overflow: auto;
  z-index: 25;

  .PlayControl-bottm {
    bottom: 0;
  }

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
    height: 320px;
    position: relative;
    .singer-img {
      width: 100%;
      height: 100%;
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

  .single-song {
    .offset-title {
      div {
        padding: 0 25px 0px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 30px;
        line-height: 30px;
        background-color: #000;

        .offset-content {
          .offset1-icon {
            display: block;
            width: 28px;
            height: 28px;
            background-image: url("@/assets/imgs/ic_player_mode_all1.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
          }
        }
        .offset-song-icon {
          display: block;
          width: 20px;
          height: 20px;
          background-image: url("@/assets/imgs/jiarugedan.png");
          background-position: center center;
          background-size: 20px;
          background-repeat: no-repeat;
          content: "";
        }
      }
    }
  }
  .spinnerloading {
    width: 100vw !important;
    margin: 50px 45% !important;
  }
}
// 进入退出动画
.anime-enter,
.anime-leave-to {
  transform: translateX(100%);
}
.anime-enter-active,
.anime-leave-active {
  transition: all 0.25s linear;
}
.anime-enter-to,
.anime-leave {
  transform: translateX(0);
}
</style>