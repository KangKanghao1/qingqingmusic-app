<template>
  <transition name="anime" appear>
    <div class="song-detail-View">
      <img class="postion-bg" v-lazy="playingMusic.picUrl" />
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
            <img class="content-img" v-lazy="playingMusic.picUrl" />
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
              <span class="company"
                >企业：{{ playingMusic.song.album.company }}</span
              >
            </div>

            <div class="right-icon">
              <div class="live-icon-one"></div>
              <div class="live-icon-tow"></div>
            </div>
          </div>
        </div>
        <div class="footer-paly-list">
          <div class="slider-content-ipt">
            <van-slider
              v-model="value"
              button-size="10"
              bar-height="4px"
              class="slider"
              active-color="rgb(72, 163, 253)"
            />
            <div class="duration">
              <p class="initial-duration">00:00</p>
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
            <i class="list-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: 0,
    };
  },

  computed: {
    ...mapState(["playingMusic", "duration", "audioPlayState"]),
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
  },

  methods: {
    ...mapMutations(["audioPlayandstop", "NextsongMusic"]),
    // 路由跳转到上一个页面
    quitgodiscover() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.song-detail-View {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
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
          width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .company {
            margin-top: 20px;
            font-size: 20px;
            color: #666;
            font-weight: bold;
          }
        }
        .right-icon {
          .live-icon-one {
            margin-top: 50px;
            width: 28px;
            height: 28px;
            background-image: url("../../assets/imgs/未收藏 .png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
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