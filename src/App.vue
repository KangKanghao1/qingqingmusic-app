<template>
  <transition name="fadeout" appear>
    <div class="app">
      <!-- 路由也可以反向传值 -->
      <router-view @setAudioCurrentTimevalue="setAudioCurrentTimevalue" />
      <PlayControl :PlayStyle="PlayStyle" />
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
      <!-- @canplay="setMusicdurationdata" 获取音乐总时长  -->
      <audio
        :src="songUrl"
        ref="audio"
        @canplay="getMusicdurationdata"
        @timeupdate="getcurrenpalytTime"
      />
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
  data(){
    return{
      PlayStyle: false
    }
  },
  components: {
    PlayControl,
    CurrentPalyList,
  },

  computed: {
    ...mapState(["showSongList", "playingMusic", "audioPlayState",'musiclyric']),
    // 计算属性 获取playingMusic音乐的id来赋值给 getSongUrl里的id路径
    songUrl() {
      return getSongUrl(this.playingMusic.id);
    },
  },
  methods: {
    // 引入的vuex的方法数据
    ...mapMutations(["hideSongList", "Musicduration", "currenpalytTime",'getmusiclyricdata']),
    ...mapActions(["getNewSong"]),
    // 获取音乐的总播放时长
    getMusicdurationdata() {
      this.Musicduration(this.$refs.audio.duration);
    },
    // 获取当前播放时间
    getcurrenpalytTime() {
      this.currenpalytTime(this.$refs.audio.currentTime);
    },
    // 控制播放进度条
    setAudioCurrentTimevalue(currentTime) {
      this.$refs.audio.currentTime = currentTime;
    },

  },

  created() {
    // 如果本地没有歌曲的话会做网络请求
    this.getNewSong({ axios: this.$axios });
  },

  // 监听播放
  watch: {
    $route(to){
      if (to.name == "discovr") {
        console.log('a');
        this.PlayStyle = false;

      }else if(to.name == "mymusic"){
        console.log('a');
        this.PlayStyle = false;
      }else if(to.name == "video"){
        console.log('a');
        this.PlayStyle = false;
      }else if(to.name == "user"){
        console.log('a');
        this.PlayStyle = false;
      }else{
        this.PlayStyle = true;
      }
    },
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
    // 监听歌曲变化,添加最近播放本地存储
    playingMusic(){
     let music = JSON.parse(localStorage.getItem('changerMusci')??"{}")
     let recently = JSON.parse(localStorage.getItem('recentlyPlay')??"[]")

      if (recently.length < 1) {
        localStorage.recentlyPlay = JSON.stringify([music]);
      }

       let res = recently.find(r => r?.id == music.id);
       if (!res) {

         localStorage.recentlyPlay = JSON.stringify([music,...recently]);

       }else{

        let data = recently.filter(r => r.id !== music.id);
        localStorage.recentlyPlay = JSON.stringify([music, ...data]);

       }
        
    }
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
