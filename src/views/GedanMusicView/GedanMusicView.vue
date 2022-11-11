<template>
  <transition name="anime" appear>
    <div class="gedan-music">
      <div class="gedan-icon">
        <div class="quit-icon-title">
          <i class="quit-icon" @click="gothePreviouspage"></i>
          <span>歌单</span>
        </div>
        <i></i>
      </div>
      <div class="gedan-bg-box">
        <img
          class="gedan-bg"
          :src="
            songMusictitle.picUrl
              ? songMusictitle.picUrl
              : songMusictitle.coverImgUrl
          "
        />
        <div class="gedan-introduce">
          <img
            class="gedan-introduce-bg"
            :src="
              songMusictitle.picUrl
                ? songMusictitle.picUrl
                : songMusictitle.coverImgUrl
            "
          />
          <div class="introduce-content">
            <div class="introduce-title van-multi-ellipsis--l2">
              {{ songMusictitle.name }}
            </div>
            <div class="collect-icon-text">
              <span class="collect-icon"></span>
              <p class="collect-text">收藏</p>
            </div>
          </div>
        </div>
      </div>

      <div class="gedan-information">
        <van-sticky :offset-top="50">
          <div class="offset-demo">全部播放</div>
        </van-sticky>
        <div class="gedan-play-list">
          <van-loading
            v-show="showloading"
            class="spinnerloading"
            type="spinner"
            color="red"
          />
          <div v-for="s in songsdata" :key="s.id">
            <div class="songsdata-content">
              <i class="songdata-left-icon"></i>
              <img class="songsdata-img" :src="s.picUrl" alt="" />
              <div
                class="songsdata-title"
                :class="{ songscolor: s.id == playingMusic.id }"
                @click.stop="changeoverMusci(s)"
              >
                <p class="song-name">{{ s.name }}</p>
                <p class="alin-name" :class="{ alin: s.id == playingMusic.id }">
                  {{ s.alg.name }}
                </p>
              </div>
              <div class="songdata-right-icon">
                <i class="songdata-right1" @click.stop="changeoverMusci(s)"></i>
                <i class="songdata-right2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayControl class="PlayControl-bottm" />
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getSongListdetailed } from "@/apis/index.js";
import PlayControl from "@/components/PlayControl.vue";
export default {
  data() {
    return {
      geadnMusic: "",
      songsdata: [],
      container: null,
      // show loading显示
      showloading: true,
    };
  },
  created() {
    this.geadnMusic = this.$route.query.objid;
    this.getgeadnMusic();
  },
  mounted() {
    this.container = this.$refs.container;
  },

  computed: {
    ...mapState(["songMusictitle", "playingMusic", "audioPlayState"]),
  },

  methods: {
    ...mapMutations(["changeoverMusci", "audioPlayandstop"]),
    // 获取歌单歌曲
    async getgeadnMusic() {
      let { data } = await this.$axios(getSongListdetailed(this.geadnMusic));
      this.songsdata = data.songs.map((d) => {
        return {
          id: d.id,
          name: d.name,
          picUrl: d.al.picUrl,
          alg: d.al,
          song: {
            artists: [
              {
                name: d.al.name,
              },
            ],
          },
        };
      });
      this.showloading = !this.showloading;
    },

    gothePreviouspage() {
      this.$router.go(-1);
    },
  },

  components: {
    PlayControl,
  },
};
</script>
<style lang="scss" scoped>
.gedan-music {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 0 50px;
  width: 100vw;
  height: 100%;
  background-color: #242121;
  z-index: 25;
  color: #fff;
  overflow: auto;

  .PlayControl-bottm {
    bottom: 0;
  }

  .gedan-icon {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    display: flex;
    background-color: black;
    justify-content: space-between;
    align-items: center;
    z-index: 999;

    .quit-icon-title {
      display: flex;
      align-items: center;
      .quit-icon {
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
  }

  .gedan-bg-box {
    position: relative;
    width: 100vw;
    .gedan-bg {
      width: 100%;
      filter: blur(30px);
      display: block;
    }

    .gedan-introduce {
      position: absolute;
      top: 28%;
      left: 0;
      width: 100vw;
      z-index: 1;
      .gedan-introduce-bg {
        width: 40%;
        border-radius: 15px;
        margin: auto;
        display: block;
      }

      .introduce-content {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .introduce-title {
          width: 80%;
          font-size: 20px;
          text-align: center;
        }

        .collect-icon-text {
          .collect-icon {
            display: block;
            width: 35px;
            height: 35px;
            margin-right: 5px;
            background-image: url("@/assets/imgs/未收藏 .png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
          }
          .collect-text {
            margin-top: 5px;
            width: 40px;
          }
        }
      }

      .Playlist-introduced {
        width: 100%;
        margin-top: 20px;
        padding: 0 30px;
        text-align: center;
        display: flex;
        align-items: center;
      }
    }
  }
  .gedan-information {
    .offset-demo {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      background-color: #000;
    }
    .gedan-play-list {
      width: 100vw;
      overflow: auto;
      background-color: rgb(6, 6, 6);

      .songsdata-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;

        .songdata-left-icon {
          margin-right: 10px;
          width: 20px;
          height: 20px;
          background-image: url("@/assets/imgs/jiahao.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .songsdata-img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: block;
        }

        .songsdata-title {
          margin-left: 10px;
          width: 40vw;

          &.songscolor {
            color: red !important;
          }
          .song-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .alin-name {
            margin-top: 5px;
            font-size: 12px;
            color: #ddd;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &.alin {
              color: red;
            }
          }
        }

        .songdata-right-icon {
          margin-left: 20px;
          display: flex;
          align-items: center;
          .songdata-right1 {
            display: block;
            width: 25px;
            height: 25px;
            margin-right: 10px;
            background-image: url("@/assets/imgs/未收藏 .png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
          }
          .songdata-right2 {
            display: block;
            width: 25px;
            height: 25px;
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
  }
}
.spinnerloading {
  width: 100vw !important;
  margin: 50px 45% !important;
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