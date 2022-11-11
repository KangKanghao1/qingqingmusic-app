<template>
  <div class="song">
    <div class="unplay-song" v-show="!show">暂无播放记录</div>
    <!-- 歌曲列表 -->
    <div class="single-box" v-show="show">
      <div class="single">
        <div class="single-nav">
          <span class="play">播放全部</span>
        </div>

        <div class="single-list">
          <div class="single-item" v-for="r in recentlyPlay" :key="r.id" @click="toPlayControl(r)">
            <div class="sing-name">
              <div class="song_n">{{ r.name }}</div>
              <div class="singer_n">{{ "singerName(r.ar)" }}</div>
            </div>
            <div class="mv" v-if="r.mv">
              <img src="@/assets/imgs/home_dq_bof.png" />
            </div>
            <van-icon color="#808080" class="ellipsis" name="ellipsis" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false,
      recentlyPlay: [],
    };
  },
  created() {
    this.onRecentlyPlay();
  },
  methods: {
    ...mapMutations(["changeoverMusci"]),
    // 获取本地存储数据
    onRecentlyPlay() {
      let playList = JSON.parse(localStorage.getItem("recentlyPlay") ?? "[]");

      if (playList.length >= 1) {
        this.recentlyPlay = playList;
        console.log(this.recentlyPlay);
        this.show = true;
      } else {
        this.show = false;
      }
    },
    // 跳转播放详情页
    toPlayControl(s) {
      this.changeoverMusci(s);
      this.$router.push(`/songdata/${s.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.song {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  .unplay-song {
    color: #bbb;
    font-size: 12px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
  }

  .single-box {
    &.all-single {
      padding-bottom: 80px;
    }
    .single-loading {
      position: fixed;
      left: 50%;
      top: 20%;
      z-index: 44;
      transform: translateX(-50%);
    }
    .un-single {
      margin-top: 10px;
      margin-left: 10px;
      font-size: 14px;
      color: #bbb;
    }
    .single {
      margin-top: 10px;
      width: 100%;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #2b2b2b;

      .single-nav {
        padding: 20px 10px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          content: "";
          overflow: hidden;
          height: 1px;
          width: calc(100% - 20px);
          background-color: rgba(0, 0, 0, 0.1);
        }
        .title {
          font-weight: 600;
          font-size: 14px;
          color: #ececec;
          letter-spacing: 1px;
        }
        .play {
          font-size: 12px;
          color: rgba(242, 60, 66, 0.85);
          letter-spacing: 1px;
          padding: 5px 4px;
          border: 1px solid rgb(203, 118, 118);
          border-radius: 999px;
          margin-left: 5px;
          display: flex;
          width: 75px;
          justify-content: space-evenly;

          &::before {
            width: 0;
            height: 0;
            content: "";
            display: block;
            overflow: hidden;
            border-left: 7px solid red;
            border-top: 5px solid red;
            border-right: 7px solid red;
            border-bottom: 5px solid red;
            border-right-style: none;
            border-top-color: transparent;
            border-bottom-color: transparent;
            border-radius: 2px;
          }
        }
      }

      .single-item {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          content: "";
          overflow: hidden;
          height: 1px;
          width: calc(100% - 30px);
          background-color: rgba(255, 255, 255, 0.15);
        }

        &:last-child ::after {
          background-color: transparent;
        }

        .sing-name {
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          .song_n {
            font-size: 13px;
            color: #6183ac;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .singer_n {
            color: rgba(161, 161, 161);
            font-size: 12px;
            margin-top: 6px;
          }
        }

        .mv {
          width: 22px;
          height: 22px;

          img {
            width: 100%;
            display: block;
          }
        }

        .ellipsis {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>