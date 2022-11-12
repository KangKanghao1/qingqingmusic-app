<template>
  <div class="recently-play">
    <van-nav-bar left-text="我喜欢的音乐" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" />
        <van-icon class="ellipsis" name="ellipsis" />
      </template>
    </van-nav-bar>

    <div class="content">
      <div class="live-icon">
        <div class="img">
          <img :src="liveList[0]?.picUrl" />
          <van-icon class="like-img" color="#f5f5f5" name="like" size="45" />
        </div>
        
        <div class="title-box">
          <div class="title">我喜欢的音乐</div>
          <div class="user-name">
            <van-icon name="user-o" size="20" /> 雨落夜孤
            <van-icon name="arrow" />
          </div>
        </div>
      </div>

      <!-- 无播放歌曲 -->
      <div class="unplay-song" v-show="!show">暂无播放记录</div>
      <!-- 歌曲列表 -->
      <div class="single-box" v-show="show">
        <div class="single">
          <div class="single-nav">
            <div class="play">播放全部<span class="count">{{onLiveCount}}</span></div>
          </div>

          <div class="single-list">
            <div class="single-item" v-for="(l, i) in liveList" :key="l.id">
              <span class="ranking">{{ i + 1 }}</span>
              <div class="sing-name">
                <div class="song_n">{{ l.name }}</div>
                <div class="singer_n">{{ "singerName(r.ar)" }}</div>
              </div>
              <div class="mv" v-if="l.mv">
                <img src="@/assets/imgs/home_dq_bof.png" />
              </div>
              <van-icon color="#808080" class="ellipsis" name="ellipsis" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      liveList: [],
      liveCount: 0
    };
  },
  created() {
    this.onLivePlay();
  },
  methods: {
    // 获取本地存储数据
    onLivePlay() {
      let playList = JSON.parse(localStorage.getItem("live") ?? "[]");
      this.liveCount = playList.length;
      if (playList.length >= 1) {
        this.liveList = playList;
        this.show = true;
      } else {
        this.show = false;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
   computed: {
    onLiveCount(){
      return this.liveCount >= 1 ? `(${this.liveCount})` :  '';
    }
  }
};
</script>
<style lang="scss" scoped>
.recently-play {
  position: fixed;
  top: 0px;
  bottom: 49px;
  width: 100%;
  background-color: #151515;
  ::v-deep .van-hairline--bottom::after {
    border: none;
  }
  .van-nav-bar {
    background-color: #1e2337;
    .ellipsis {
      margin-left: 10px;
      transform: rotateZ(90deg);
    }
    ::v-deep .van-icon {
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    ::v-deep .van-nav-bar__text {
      color: #fff;
      font-size: 15px;
      letter-spacing: 2px;
      margin-left: 5px;
    }
  }

  .content{
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
    padding-top: 46px;
    overflow: auto;
  .live-icon {
    padding: 20px 20px 40px;
    display: flex;
    background-color: #1e2337;
    .img{
      position: relative;
       img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
    }
    .like-img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    }
   

    .title-box {
      margin-left: 20px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        font-size: 12px;
        color: #ddd;
        letter-spacing: 2px;
      }
      .user-name {
        color: #bbb;
        font-size: 12px;
      }
    }
  }

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

    .un-single {
      margin-top: 10px;
      margin-left: 10px;
      font-size: 14px;
      color: #bbb;
    }
    .single {
      width: 100%;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #151515;

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
          position: relative;
          .count{
            color: #bbb;
            position: absolute;
            right: -35px;
            top: 50%;
            transform: translateY(-50%);
          }
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

      .ranking {
        font-size: 12px;
        color: #ddd;
      }

      .single-item {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

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



}
</style>