<template>
  <div id="app">
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
      :overlay-style="{ opacity: .5 }"
      @click-overlay="hideSongList"
    >
      <CurrentPalyList
    /></van-popup>
  </div>
</template>

<script>
// 引入vuex mapActions
import { mapActions, mapMutations, mapState } from "vuex";

import PlayControl from "@/components/PlayControl.vue";
import CurrentPalyList from "@/components/CurrentPalyList.vue";
export default {
  components: {
    PlayControl,
    CurrentPalyList,
  },

  computed: {
    ...mapState(["showSongList"]),
  },
  methods: {
    // 引入的vuex的方法数据

    ...mapMutations(["hideSongList"]),
    ...mapActions(["getNewSong"]),
  },

  created() {
    this.getNewSong({ axios: this.$axios });
  },
};
</script>

<style lang="scss" scoped>
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
</style>
