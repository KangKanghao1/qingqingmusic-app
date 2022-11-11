<template>

  <div class="my-music">
    <div class="nav"><span>我的音乐</span></div>
<!-- 是 -->
    <!-- 歌单列表 -->
    <div class="song-list">
      <div class="recent-play">
        <div class="icon">
          <img src="@/assets/imgs/pop_ico_play.png" alt="" />
        </div>
        <div class="setting-layer" @click="recentlyPlay">
          <div>最近播放</div>
          <van-icon name="arrow" color="#ddd" />
        </div>
      </div>
      <div class="user-collect">
        <div class="icon">
          <img src="@/assets/imgs/music_ico_collected.png" alt="" />
        </div>
        <div class="setting-layer" @click="toCollectPage()">
          <div>我喜欢的音乐<span class="count">{{onLiveCount}}</span></div>
          <van-icon name="arrow" color="#ddd" />
        </div>
      </div>

    </div>

   <router-view />
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      liveCount: 0
    }
  },
  created(){
   this.liveCount = JSON.parse(localStorage.getItem('live')??"[]").length;
   console.log(this.liveCount);
  },
  methods: {

    recentlyPlay(){

      this.$router.push(`mymusic/recently-played`)

    },
    toCollectPage(){
      this.$router.push(`mymusic/live`)
    }

  },
  computed: {
    onLiveCount(){
      return this.liveCount >= 1 ? `(${this.liveCount})首` :  '';
    }
  }
}
</script>
<style lang="scss" scoped>
.my-music {
  width: 100vw;
  height: 100vh;
  background: #383737;
  .nav {
    position: relative;
    font-size: 15px;
    color: #fff;
    height: 60px;
    background-color: #141414;

    span {
      letter-spacing: 3px;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .song-list {
    color: #edeef0;
    width: 100%;
    padding: 20px 0px 0px 10px;
    background-color: #2b2b2b;
    align-items: center;
    .recent-play,
    .user-collect {
      width: 100%;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 26.5px;
        height: 26.5px;

        img {
          width: 100%;
          display: block;
        }
      }

      .setting-layer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 10px;
        border-bottom: 1px solid #ddd;
        letter-spacing: 3px;

        .count {
          color: #bbb;
          font-size: 12px;
        }
        div {
          color: #edeef0;;
          font-size: 14px;
        }
      }
    }
    .user-collect {
      .setting-layer {
        border: none;
      }
    }
  }
}
</style>



