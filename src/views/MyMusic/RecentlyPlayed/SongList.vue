<template>
  <div class="playlist" v-show="show">
    <div class="playlist-item" v-for="s in songList" :key="s.id" @click="goGedanMusic(s)">
      <div class="playlist-img">
        <!-- <img :src="s.picUrl" /> -->
        <van-image
          lazy-load
          :src="s.picUrl"
          width="40"
          height="40"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>

      <div class="sing-name">
        <div class="song_n">{{ s.name }}</div>
        <div class="singer_n">
          <span class="name"> 播放<PlayCount :p_count="s?.playCount" />次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PlayCount from "@/components/SearchComponent/PlayCount.vue";
export default {
  data() {
    return {
      songList: [],
      show: false,
    };
  },
  created() {
    this.onLocalStorageSongList();
  },
  methods: {
    ...mapMutations(["getsongMusictitle"]),
    // 获取歌手数据
    onLocalStorageSongList() {
      let songList = JSON.parse(localStorage.getItem("SONGLIST") ?? "[]");

      if (songList.length >= 1) {
        this.songList = songList;
        this.show = true;
      } else {
        this.show = false;
      }
    },
    goGedanMusic(data) {
      
      this.$router.push(`/gedanmusic/?objid=${JSON.stringify(data)}`);
      // 把歌单标题等存进vuex
      this.getsongMusictitle(data);

    },
  },
  components: {
    PlayCount,
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  margin-top: 10px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #2b2b2b;
  .playlist-item {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .playlist-img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }

    .sing-name {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .song_n {
        font-size: 13px;
        color: #ececec;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .singer_n {
        width: 160%;
        color: #b0b0b0;
        height: 20px;
        // font-size: 12px;
        transform: scale(0.5);
        transform-origin: left;
      }
    }

    .ellipsis {
      transform: rotate(90deg);
    }
  }
}
</style>