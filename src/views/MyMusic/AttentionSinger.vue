<template>
  <div class="recently-play">
    <van-nav-bar title="歌手" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="wap-nav" size="18" />
      </template>
    </van-nav-bar>

    <div class="content">
      <div class="live-icon">
        <div class="img">
          <van-image lazy-load :src="singerList[0]?.picUrl" width="100" height="100">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <!-- <img v-lazy="singerList[0]?.picUrl" /> -->
          <van-icon class="like-img" color="#f5f5f5" name="like" size="45" />
        </div>

        <div class="title-box">
          <div class="title">我关注的歌手</div>
          <div class="user-name">
            <van-icon name="user-o" size="20" /> 雨落夜孤
            <van-icon name="arrow" />
          </div>
        </div>
      </div>

      <!-- 歌手列表 -->
      <div class="songer-class-list" v-if="show">
        <ul class="songer-img-title">
          <li v-for="s in singerList" :key="s.id" @click="gosingerDetailed(s.id)">
            <img class="singer-img" v-lazy="s.picUrl" alt="" />
            <div class="singer-name">
              <p class="s-name">{{ s.name }}</p>
              <span class="s-fanscount"
                >粉丝：{{
                  s.fansCount > 10000 ? s.fansCount / 1000 + "万" : s.fansCount
                }}</span
              >
            </div>
            <div class="close-fill" @click="onAttentionSinger(s)">
              <i v-if="s.attention == 0" class="close-guanzhu-icon"></i>
              <i v-if="s.attention == 1" class="yiguanzhu"></i>
             
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      singerList: [],
      show: false,
    };
  },
  created() {
    this.onLocalStorageSinger();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取歌手数据
    onLocalStorageSinger() {
      let singerList = JSON.parse(
        localStorage.getItem("ATTENTION_SINGER") ?? "[]"
      );

      if (singerList.length >= 1) {
        this.singerList = singerList;
        console.log(this.singerList);
        this.show = true;
      } else {
        this.show = false;
      }
    },

    // 关注/取消关注
    onAttentionSinger(s) {
      let singer = JSON.parse(localStorage.getItem("ATTENTION_SINGER") ?? "[]");

      let data = singer.filter((r) => r.id !== s.id);
      localStorage.ATTENTION_SINGER = JSON.stringify(data);
      this.singerList = data;
    },
     gosingerDetailed(id) {
      this.$router.push(`/singer/?singerid=${id}`);
    },
  },
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

  ::v-deep .van-ellipsis {
    color: #ddd;
  }
  .van-nav-bar {
    background-color: #1e2337;
    .ellipsis {
      margin-left: 10px;
      transform: rotateZ(90deg);
    }
    ::v-deep .van-icon {
      color: #ddd;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    ::v-deep .van-nav-bar__text {
      color: #ddd;
      font-size: 15px;
      letter-spacing: 2px;
      margin-left: 5px;
    }
  }

  .content {
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
      .img {
        position: relative;
        img {
          width: 100px;
          height: 100px;
          border-radius: 6px;
          overflow: hidden;
        }
        .like-img {
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
    .songer-class-list {
      .songer-img-title {
        padding-bottom: 50px;
        li {
          display: flex;
          align-items: center;
          padding: 10px 10px 10px 20px;
          .singer-img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 999px;
            display: block;
          }

          .singer-name {
            .s-fanscount {
              font-size: 12px;
              color: rgb(193, 193, 193);
            }
          }
          .close-fill {
            width: 40px;
            margin-left: auto;
            font-size: 12px;

            .close-guanzhu-icon {
              margin: auto;
              display: block;
              width: 20px;
              height: 20px;
              background-image: url("@/assets/imgs/guanzhu.png");
              background-position: center center;
              background-size: cover;
              background-repeat: no-repeat;
              content: "";
            }
            .yiguanzhu {
              margin: auto;
              display: block;
              width: 20px;
              height: 20px;
              // margin-left: 2px;
              background-position: center center;
              background-size: cover;
              background-repeat: no-repeat;
              content: "";
              background-image: url("@/assets/imgs/yiguanzhu.png");
            }
          }
        }
      }
    }
  }
}
</style>