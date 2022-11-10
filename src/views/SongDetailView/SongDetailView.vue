<template>
  <transition name="anime" appear>
    <div class="song-detail-View">
      <img class="postion-bg" v-lazy="onPicUrl" />
      <div class="song-detail">
        <div class="nav-icon-title">
          <i class="nav-quit-icon" @click="quitgodiscover"></i>
          <div class="nav-title">
            <p class="music-title">{{ playingMusic.name }}</p>
            <span class="artists-name">{{ artists }}</span>
          </div>
          <i class="plus-icon"></i>
        </div>
        <div class="music-content">
          <div
            class="music-content-img"
            :class="{ rotateanime: audioPlayState }"
          >
            <img class="content-img" v-lazy="onPicUrl" />
          </div>
          <div class="music-content-text">
            <div class="music-artists-title">
              <van-notice-bar
                scrollable
                color="#fff"
                background="transparent"
                speed="40"
                :text="artists + ' - ' + playingMusic.name"
              />
              <!-- 歌词 -->
              <div class="company" @click="show = true">
                <p
                  :class="{ active: i == currentTwoIndex }"
                  v-for="(l, i) in lyricTwo"
                  :key="l?.time"
                >
                  {{ l?.lrc }}
                </p>
              </div>
            </div>

            <div class="right-icon">
              <div
                class="live-icon-one"
                :class="{ live: liveShow }"
                @click="liveSong()"
              >
                <img
                  v-if="!liveShow"
                  class="no-live"
                  src="@/assets/imgs/未收藏 .png"
                />
                <img
                  v-if="liveShow"
                  class="live"
                  src="@/assets/imgs/已收藏.png"
                />
              </div>
              <div class="live-icon-tow"></div>
            </div>
          </div>
        </div>
        <div class="footer-paly-list">
          <div class="slider-content-ipt">
            <van-slider
              v-model="progressValue"
              button-size="14"
              bar-height="4px"
              class="slider"
              active-color="linear-gradient(to right, #eec9a3 0%, #ef629f 100%)"
            />
            <div class="duration">
              <p class="initial-duration">{{ currentTimedata }}</p>
              <p class="end-duration">{{ palyTime }}</p>
            </div>
          </div>

          <div class="music-paly-icon">
            <div class="lastone-icon" @click="NextsongMusic"></div>
            <div
              class="paly-icon"
              :class="{ pausemusic: audioPlayState }"
              @click="audioPlayandstop"
            ></div>
            <div class="nex-icon" @click="NextsongMusic"></div>
          </div>
          <div class="footer-random-icon">
            <i class="random-icon"></i>
            <p class="footer-text">当前歌曲</p>
            <i class="list-icon" @click="showSongList"></i>
          </div>
        </div>
      </div>
      <!-- 歌词 -->
      <van-overlay
        :lock-scroll="false"
        class-name="lyric"
        :show="show"
        @click="show = false"
      >
        <img class="bg-img" v-lazy="playingMusic.picUrl" />
        <div class="wrapper" ref="lyc">
          <LyricView :lyric="lyric" :currentIndex="currentIndex" />
        </div>
      </van-overlay>
    </div>
  </transition>
</template>
<script>
import LyricView from "./LyricView.vue";
import { mapState, mapMutations } from "vuex";
import { getLryic } from "@/apis/play";

export default {
  data() {
    0;
    return {
      lyric: [], // 高亮歌词,
      lyricTwo: [], // 显示二项歌词
      currentIndex: 0, // 歌词
      currentTwoIndex: 0, // 高亮二项歌词
      show: false,
      liveShow: false,
    };
  },

  computed: {
    ...mapState([
      "songsList",
      "playingMusic",
      "audioPlayState",
      "duration",
      "currentTime",
    ]),
    // 计算属性 如果是多个名字
    artists() {
      let arr = this.playingMusic?.song?.artists;
      if (arr) {
        return arr.map((a) => a.name).join("/");
      }
      return null;
    },

    // 播放总时长
    palyTime() {
      let m = Math.floor(this.duration / 60);
      let s = Math.floor(this.duration % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    },
    // 当前播放时长
    currentTimedata() {
      let m = Math.floor(this.currentTime / 60);
      let s = Math.floor(this.currentTime % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    },

    // 计算属性修改 需要用到 get 和 set 方法，根据当前的duiation 和currentTime 计算当前进度条的值
    progressValue: {
      // 自动进度条
      get() {
        return (this.currentTime / this.duration) * 100;
      },
      // 拖拽进度条 需要 接收一个 由app 在路由传过来的方法
      set(value) {
        let currentTime = (value / 100) * this.duration;
        // 反向传值接收的方法
        this.$emit("setAudioCurrentTimevalue", currentTime);
      },
    },

    // 拖拽进度条
    onPicUrl() {
      return this.playingMusic.picUrl
        ? this.playingMusic.picUrl + ""
        : this.playingMusic.al.picUrl;
    },
  },

  methods: {
    ...mapMutations(["audioPlayandstop", "NextsongMusic", "showSongList"]),
    // 路由跳转到上一个页面
    quitgodiscover() {
      this.$router.go(-1);
    },

    // 歌词
    getLyricFun() {
      this.$axios.get(getLryic(this.playingMusic.id)).then(({ data }) => {
        let lrc = data.lrc.lyric;
        this.lyric = [];

        let lrcReg = /^\[(\d+):(\d+\.\d+)\]([\S ]+)$/gim;

        while (lrcReg.test(lrc)) {
          this.lyric.push({
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lrc: RegExp.$3,
          });
        }
      });
    },
    // 高亮歌词
    getCurrentActiveLyric() {
      this.currentIndex = 0;
      this.lyricTwo = [];
      for (let i = 0; i < this.lyric.length; i++) {
        let time = this.lyric[i].time;

        if (
          i + 1 == this.lyric.length ||
          (this.currentTime >= time &&
            this.currentTime < this.lyric[i + 1].time)
        ) {
          // 第i条高亮
          this.currentIndex = i;

          this.lyricTwo.push(
            this.lyric[i],
            this.lyric[i + 1] ? this.lyric[i + 1] : "1"
          );
          this.lyricTwoFun();
          break;
        }
      }
    },

    // 高亮两项歌词数据
    lyricTwoFun() {
      this.currentTwoIndex = 0;

      for (let i = 0; i < this.lyricTwo.length; i++) {
        let time = this.lyricTwo[i].time;

        if (
          this.currentTime >= time &&
          this.currentTime < this.lyricTwo[i + 1].time
        ) {
          // 第i条高亮
          this.currentTwoIndex = i;
          break;
        }
      }
    },

    // 喜欢歌曲
    liveSong() {
      let live = JSON.parse(localStorage.getItem("live") ?? "[]");
      if (this.liveShow) {
        this.liveShow = false;
        let newSongList = live.filter((c) => c.id !== this.playingMusic.id);
        localStorage.live = JSON.stringify(newSongList);
      } else {
        this.liveShow = true;
        if (live.length < 1) {
          localStorage.live = JSON.stringify([this.playingMusic]);
        }

        let res = live.find((c) => c?.id == this.playingMusic.id);
        if (!res) {
          localStorage.live = JSON.stringify([
            this.playingMusic,
            ...live,
          ]);
        } else {
          let data = live.filter((c) => c.id !== this.playingMusic.id);
          localStorage.live = JSON.stringify([this.playingMusic, ...data]);
        }
      }
    },
  },
  created() {
    this.getLyricFun();
    let song = JSON.parse(localStorage.getItem("live") ?? "[]");
    let res = song.find((s) => s.id == this.playingMusic.id);
    if (!res) {
      this.liveShow = false;
    } else {
      this.liveShow = true;
    }
  },

  watch: {
    currentTime() {
      this.getCurrentActiveLyric();
    },
    playingMusic(newSong) {
      this.getLyricFun();
      let song = JSON.parse(localStorage.getItem("live") ?? "[]");
      let res = song.find((s) => s.id == newSong.id);
      if (!res) {
        this.liveShow = false;
      } else {
        this.liveShow = true;
      }
    },
  },
  components: {
    LyricView,
  },
};
</script>
<style lang="scss" scoped>
.lyric {
  position: fixed;
  width: 100%;
  height: 69%;
  top: 10%;
  left: 0;
  margin: auto 0;
  background: transparent;
  backdrop-filter: blur(40px);
  
  .bg-img {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: block;
    filter: blur(50px);
  }
  .wrapper {
    height: 95%;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
  }
}
.song-detail-View {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 25;
  background-color: #fff;
  overflow: auto;
  overflow: hidden;

  .footer-paly-list {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 20vh;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .postion-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(50px);
    box-shadow: 0px 9px 37px 15px;
  }

  .song-detail {
    .slider-content-ipt {
      .duration {
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .nav-icon-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 20px;
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      text-align: center;

      .nav-quit-icon {
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background-image: url("@/assets/imgs/dci.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 0px 0 3px 0;
        content: "";
      }

      .nav-title {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .music-title {
          font-size: 18px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .artists-name {
          font-size: 12px;
          color: #666;
        }
      }

      .plus-icon {
        width: 20px;
        height: 20px;
        background-image: url("../../assets/imgs/jiahao.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }

    .music-content {
      width: 100%;
      height: 65vh;
      padding: 20vh 20px 0;

      .music-content-img {
        margin: 0 auto;
        width: 65vw;
        animation: imgrotateanime 15s linear infinite;
        animation-play-state: paused;

        &.rotateanime {
          animation-play-state: running;
        }

        .content-img {
          display: block;
          width: 100%;
          border-radius: 999px;
          border: 3px solid #fff;
          box-shadow: 2px 0 7px 0;
        }
      }

      .music-content-text {
        padding: 5vh 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        .music-artists-title {
          width: 88%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .company {
            margin-top: 20px;
            font-size: 13px;
            color: #fff;
            text-align: center;
            p {
              line-height: 20px;

              &.active {
                font-size: 14px;
                font-weight: 600;
                color: rgb(243, 89, 89);
              }
            }
          }
        }
        .right-icon {
          .live-icon-one {
            margin-top: 50px;
            width: 28px;
            height: 28px;

            .no-live {
              width: 100%;
              display: block;
              animation: coll .5s linear;
            }

            .live {
              width: 100%;
              display: block;
              animation: move .5s linear;
            }
            @keyframes coll {
              0% {
                transform: scale(0.8);
              }
              50% {
                transform: scale(1.2);
              }

              100% {
                transform: scale(1);
              }
            }
            @keyframes move {
              0% {
                transform: scale(0.8);
              }
              50% {
                transform: scale(1.2);
              }

              100% {
                transform: scale(1);
              }
            }
          }

          .live-icon-tow {
            margin-top: 20px;
            width: 28px;
            height: 28px;
            background-image: url("../../assets/imgs/shengluehao.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      }
    }

    .music-paly-icon {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .lastone-icon {
        width: 40px;
        height: 40px;
        background-image: url("../../assets/imgs/leftjiantouicon.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .paly-icon {
        width: 50px;
        height: 50px;
        background-image: url("../../assets/imgs/music_ico_play_white.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;

        &.pausemusic {
          background-image: url("../../assets/imgs/music_ico_pause_white.png");
        }
      }

      .nex-icon {
        width: 40px;
        height: 40px;
        background-image: url("../../assets/imgs/exo_icon_next.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }

  .footer-random-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .random-icon {
      width: 35px;
      height: 35px;
      background-image: url("../../assets/imgs/ic_player_mode_random1.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .footer-text {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }

    .list-icon {
      width: 35px;
      height: 35px;
      background-image: url("../../assets/imgs/ic_player_current_playlist.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}

.van-notice-bar {
  font-size: 20px !important;
  padding: 0 !important;
  margin-bottom: 20px;
  font-weight: bold;
}

@keyframes imgrotateanime {
  0% {
    transform: rotate(0);
  }
  100% {
    // 360deg 或者 trun
    transform: rotate(360deg);
  }
}

// 进入退出动画
.anime-enter,
.anime-leave-to {
  transform: translateY(100%);
}
.anime-enter-active,
.anime-leave-active {
  transition: all 0.25s linear;
}
.anime-enter-to,
.anime-leave {
  transform: translateY(0);
}
</style>