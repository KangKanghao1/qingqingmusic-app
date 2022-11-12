<template>
  <div class="paly-control" :class="{display:PlayStyle}">
    <div
      class="song-disc"
      :class="{ discrotate: audioPlayState }"
    @click="gotoDetalil"
    > 
      <img class="disc-img" ref="img" :src="onPicUrl" alt="" />
    </div>
    <p class="song-desc" @click="gotoDetalil">
      {{ playingMusic?.name }} <span class="artists"> - {{ artists }}</span>
    </p>
    <div class="paly-icon">
      <i
        class="broadcast-icon"
        :class="{ pauseicon: audioPlayState }"
        @click="audioPlayandstop"
      ></i>
      <i @click="showSongList" class="list-icon"></i>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    PlayStyle:Boolean
  },
  // 计算属性
  computed: {
    // 引入vuex playingMusic 数据
    ...mapState(["playingMusic", "audioPlayState"]),
    // 计算属性 如果是多个名字
    artists() {
      let arr = this.playingMusic?.song?.artists;
      if (arr) {
        return arr.map((a) => a.name).join("/");
      }
      return null;
    },
    onPicUrl(){
      
     return this.playingMusic?.picUrl ? this.playingMusic.picUrl:this.playingMusic.al.picUrl;
     
    }
  },
  methods: {
    ...mapMutations(["showSongList", "audioPlayandstop"]),

    // 跳转到音乐详情页
    gotoDetalil() {
      this.$router.push(`/songdata/${this.playingMusic.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.paly-control {
  position: fixed;
  left: 0px;
  bottom: 48px;
  width: 100vw;
  padding: 5px 15px;
  background-color: #222325;
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD
  z-index: 2;
=======
  z-index: 20;

>>>>>>> 066c55ff42e8ae7e94e43f3b9577e3095fb06500
  &.display{
    position: fixed;
  left: 0px;
  bottom: 0;
  }
  .song-disc {
    display: flex;
    justify-content: space-between;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid #ddd;
    animation: discrotate 15s linear infinite;
    // 动画开始时暂停
    animation-play-state: paused;

    &.discrotate {
      // 动画播放
      animation-play-state: running;
    }

    img {
      display: block;
      width: 100%;
    }
  }

  .song-desc {
    color: #fff;
    width: 50%;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .artists {
      font-size: 12px;
      color: #ddd;
    }
  }


  .paly-icon {
    display: flex;
    align-items: center;

    .broadcast-icon {
      width: 28px;
      height: 28px;
      background-image: url("../assets/imgs/music_ico_play_white.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin-right: 10px;

      &.pauseicon {
        background-image: url("../assets/imgs/music_ico_pause_white.png");
      }
    }
    .list-icon {
      width: 28px;
      height: 28px;
      background-image: url("../assets/imgs/ic_player_current_playlist.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}

@keyframes discrotate {
  0% {
    transform: rotate(0);
  }
  100% {
    // 360deg 或者 trun
    transform: rotate(360deg);
  }
}
</style>