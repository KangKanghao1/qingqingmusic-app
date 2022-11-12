<template>
  <div class="new-music">
    <div class="music-title-icon">
      <h3 class="music-title">推荐歌曲</h3>
      <span @click="gotoDilySong">更多</span>
    </div>
    <div class="music-list">
      <div v-for="n in NewMusic" :key="n.id">
        <div class="music-img-title" @click="changeoverMusci(n)">
          <div class="music-mask">
            <!-- <img class="music-img" v-lazy="n.picUrl" /> -->
            <van-image lazy-load :src="n.picUrl" class="music-img">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
            <div class="mask">
              <div :class="{ maskimg: n.id !== playingMusic.id }"></div>
              <div v-show="n.id == playingMusic.id" class="mask-anime">
                <i class="anime1" :class="{ palyanime: audioPlayState }"></i>
                <i class="anime2" :class="{ palyanime: audioPlayState }"></i>
                <i class="anime3" :class="{ palyanime: audioPlayState }"></i>
                <i class="anime4" :class="{ palyanime: audioPlayState }"></i>
              </div>
            </div>
          </div>
          <p class="music-title van-ellipsis">{{ n.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    NewMusic: Array,
  },
  computed: {
    ...mapState(["playingMusic", "audioPlayState"]),
  },
  methods: {
    
    ...mapMutations(["changeoverMusci", "audioPlayandstop"]),
    
    gotoDilySong() {
      this.$router.push("/dailysongs")
    }

  },
};
</script>
<style lang="scss" scoped>
.new-music {
  background-color: #222325;
  .music-title-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  .music-list {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
    overflow: auto;
    padding: 10px 0;
    background-color: #222325;
    .music-img-title {
      margin: 0 10px;
      width: 100px;
      height: 100%;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 2px 0 7px 0;

      .music-mask {
        width: 100%;
        position: relative;
        .music-img {
          display: block;
          width: 100%;
        }

        .mask {
          .maskimg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(66, 77, 88, 0.6);
            background-image: url("@/assets/imgs/gdt_ic_play.png");
            background-position: center center;
            background-size: 20px;
            background-repeat: no-repeat;
          }
          // 推荐歌曲音乐播放 动画
          .mask-anime {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            padding-top: 10px;
            width: 30px;
            height: 30px;
            z-index: 1;
            display: flex;

            .anime1 {
              display: block;
              width: 4px;
              height: 15px;
              background-color: #fff;
              margin-left: 2px;
              border-radius: 15px;
              animation: maskanime 1.5s linear infinite;
              animation-play-state: paused;
              content: "";

              &.palyanime {
                animation-play-state: running;
              }
            }
            .anime2 {
              display: block;
              width: 4px;
              height: 15px;
              background-color: #fff;
              margin-left: 2px;
              border-radius: 15px;
              animation: maskanime 1.5s 0.5s linear infinite;
              animation-play-state: paused;
              content: "";
              &.palyanime {
                animation-play-state: running;
              }
            }
            .anime3 {
              display: block;
              width: 4px;
              height: 15px;
              background-color: #fff;
              margin-left: 2px;
              border-radius: 15px;
              animation: maskanime 1.5s 1s linear infinite;
              animation-play-state: paused;
              content: "";
              &.palyanime {
                animation-play-state: running;
              }
            }
            .anime4 {
              display: block;
              width: 4px;
              height: 15px;
              background-color: #fff;
              margin-left: 2px;
              border-radius: 15px;
              animation: maskanime 1.5s 1.5s linear infinite;
              animation-play-state: paused;
              content: "";
              &.palyanime {
                animation-play-state: running;
              }
            }
          }
        }
      }

      .music-title {
        text-align: center;
        font-size: 14px;
        white-space: 400;
        padding: 10px;
        background-color: #ddd;
      }
    }
  }
}

@keyframes maskanime {
  0% {
    transform: scaleY(1);
  }

  66% {
    transform: scaleY(1.5);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>