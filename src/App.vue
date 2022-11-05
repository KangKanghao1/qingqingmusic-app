<template>
  <transition name="fadeout" appear>
    <div class="app">
      <router-view />
      <PlayControl />
      <van-tabbar
        class="router-title"
        fixed
        route
        active-color="#fff"
        inactive-color="#fff"
      >
        <van-tabbar-item to="/discovr">发现</van-tabbar-item>
        <van-tabbar-item to="/mymusic">我的音乐</van-tabbar-item>
        <van-tabbar-item to="/video">视频</van-tabbar-item>
        <van-tabbar-item to="/user">我的</van-tabbar-item>
      </van-tabbar>

      <van-popup
        :value="showSongList"
        round
        position="bottom"
        :overlay-style="{ opacity: 0.5 }"
        @click-overlay="hideSongList"
      >
        <CurrentPalyList
      /></van-popup>
      <!-- @canplay="setMusicdurationdata" 获取音乐总时长 -->
      <audio :src="songUrl" ref="audio" @canplay="setMusicdurationdata" />
    </div>
  </transition>
</template>

<script>
// 引入vuex mapActions
import { mapActions, mapMutations, mapState } from "vuex";

import PlayControl from "@/components/PlayControl.vue";
import CurrentPalyList from "@/components/CurrentPalyList.vue";
import { getSongUrl } from "./apis/play";
export default {
  components: {
    PlayControl,
    CurrentPalyList,
  },

  computed: {
    ...mapState(["showSongList", "playingMusic", "audioPlayState"]),
    // 计算属性 获取playingMusic音乐的id来赋值给 getSongUrl里的id路径
    songUrl() {
      return getSongUrl(this.playingMusic.id);
    },
  },
  methods: {
    // 引入的vuex的方法数据
    ...mapMutations(["hideSongList", "setMusicduration"]),
    ...mapActions(["getNewSong"]),
    // 获取音乐的总播放时长
    setMusicdurationdata() {
      this.setMusicduration(this.$refs.audio.duration);
    },
  },

  created() {
    // 如果本地没有歌曲的话会做网络请求
    this.getNewSong({ axios: this.$axios });
  },

  // 监听播放
  watch: {
    // 接受一个新值和一个旧值
    audioPlayState(newVal, oldVal) {

      if (newVal !== oldVal) {
        if (newVal) {
          // 代表播放歌曲
          this.$refs.audio.play();
        } else {
          // 暂停歌曲
          this.$refs.audio.pause();
        }
      }
    },


  },
};
</script>

<style lang="scss" >
.app {
  .router-title {
    overflow: hidden;
    background-color: #222325 !important;
    font-weight: bold;
  }
  .van-tabbar-item--active {
    background-color: #222325 !important;
  }

  .van-tabbar-item {
    font-size: 16px !important;
  }

  .van-popup {
    // #414142
    // 背景透明
    background: transparent;
  }
}

.van-dialog {
  color: #fff !important;
  background-color: #222325 !important;
  .van-button--default {
    background-color: #aaa !important;
  }

  .fadeout-leave-to {
    transform: translateY(100%);
  }
  .fadeout-leave-active {
    transition: all 5s linear;
  }
  .fadeout-leave {
    transform: translateY(0);
  }
}
</style>
