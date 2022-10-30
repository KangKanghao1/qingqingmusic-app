<template>
  <div class="current-palylist">
    <div class="present-paly">
      <div class="present-title">
        当前播放队列<span class="present-count"> ({{ songsList.length }}</span
        >)
      </div>
      <div>1123</div>
    </div>
    <div v-for="(s, i) in songsList" :key="s.id">
      <div class="songsList">
        <span class="song-list-top">{{ i + 1 }}</span>
        <div class="songslist-name">
          <p class="music-name">{{ s.name }}</p>
          <div class="artists">{{ s.song.artists[0].name }}</div>
        </div>
        <span class="del-icon">X</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["songsList"]),
  },
};
</script>

<style lang="scss" scoped>
.current-palylist {
  width: 95vw;
  max-height: 65vh;
  margin: 0 auto 15px;
  border-radius: 15px;
  overflow: auto;
  padding: 15px;
  color: #fff;
  background-color: #242121;

  .present-paly {
    height: 30px;
    font-size: 18px;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .present-count {
      margin-left: 10px;
    }
  }

  .songsList {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .song-list-top {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      color: #f6750b;
      font-size: 20px;
      margin-right: 10px;
    }
    .songslist-name {
      margin-right: auto;
      width: 50%;
      padding: 10px 0;

      .music-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 100;
        color: #fff;
      }
      .artists {
        margin-top: 5px;
        font-size: 12px;
        transform-origin: top left;
        color: #999;
        font-weight: 100;
      }
    }
  }
}
</style>