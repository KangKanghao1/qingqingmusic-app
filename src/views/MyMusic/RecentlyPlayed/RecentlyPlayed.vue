<template>
  <div class="recently-play">
    <van-nav-bar left-text="最近播放" left-arrow @click-left="onClickLeft">
    </van-nav-bar>

      <van-tabs v-model="active" offset-top="45px" sticky background="#383737" lazy-render ref="tabs" swipeable color="#e4393c" title-inactive-color="#d6d6d6" title-active-color="#e7e7e7">
   <van-tab :title="`歌曲(${playListCount})`"><SongleView /></van-tab>
   <van-tab title="视频"><RecentlyVideo /></van-tab>
   <van-tab :title="`歌单(${songListCount})`"><SongList /></van-tab>
   <van-tab title="专辑"><RecentlyAlbum /></van-tab>
   <van-tab title="电台"><RecentlyTransceiver /></van-tab>
   
</van-tabs>
    
  </div>
</template>
<script>
import SongleView from "./SongView.vue";
import RecentlyVideo from "./RecentlyVideo.vue";
import SongList from "./SongList.vue";
import RecentlyAlbum from "./RecentlyAlbum.vue"
import RecentlyTransceiver from "./RecentlyTransceiver.vue";

export default {
  data() {
    return{
      show: false,
      recentlyPlay: [],
      active: 0,
      playListCount: 0, // 单曲
      songListCount: 0 // 歌单
    }
  },
  created(){
    this.onRecentlyPlay();
  },
  methods: {
    // 获取本地存储数据
    onRecentlyPlay(){
      
      // 单曲
     let playList = JSON.parse(localStorage.getItem('recentlyPlay')??"[]");
     // 歌单
     let songList = JSON.parse(localStorage.getItem('SONGLIST')??"[]");
     
      this.playListCount = playList.length
      this.songListCount = songList.length
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
    components: {
    SongleView,
    RecentlyVideo,
    SongList,
    RecentlyAlbum,
    RecentlyTransceiver

  },
};
</script>
<style lang="scss" scoped>
.recently-play {
  position: fixed;
  top: 0px;
  bottom: 100px;
  width: 100%;
  background-color: #383737;

   .van-nav-bar {
    background-color: #383737;
   ::v-deep .van-icon{
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;

    }
   ::v-deep .van-nav-bar__text{
      color: #fff;
      font-size: 15px;
      letter-spacing: 2px;
      margin-left: 5px;
    }

  }
}

</style>