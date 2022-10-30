<template>
  <div class="paly-control">
    <div class="song-disc">
      <img :src="playingMusic?.picUrl" alt="" />
    </div>
    <p class="song-desc">
      {{ playingMusic?.name }} <span class="artists">- {{ artists }}</span>
    </p>
    <div class="paly-icon">
      <i class="broadcast-icon"></i>
      <i @click="showSongList" class="list-icon"></i>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations} from "vuex";

export default {
  // 计算属性
  computed: {
    // 引入vuex playingMusic 数据
    ...mapState(["playingMusic"]),
    // 计算属性 如果是多个名字
    artists() {
      let arr = this.playingMusic?.song?.artists;
      if (arr) {
        return arr.map((a) => a.name).join("/");
      }
      return null;
    },
  },
  methods: {
    ...mapMutations(["showSongList"])
  },

  mounted() {
    console.log(this.playingMusic);
  },
};
</script>

<style lang="scss" scoped>
.paly-control {
  position: fixed;
  left: 0px;
  bottom: 49px;
  width: 100vw;
  padding: 5px 15px;
  background-color: #222325;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .song-disc {
    display: flex;

    // justify-content: space-between;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid #ddd;
    img {
      display: block;
      width: 100%;
    }
  }

  .song-desc {
    color: #fff;
    // display: flex;
    width: 50%;
    margin-left: 10px;
    // overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
</style>