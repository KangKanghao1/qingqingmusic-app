<template>
  <div class="box">
    <div class="announcement">
      <div class="announcement-header">
        <van-icon name="arrow-left" size="20" @click="gotoPreviousPage" />
        <div class="text">评论({{ total }})</div>
      </div>

      <div class="announcement-footer">
        <div class="announcement-minibox">
          <div class="announcement-img">
            <img :src="coverImgUrl" alt="" />
          </div>
          <div class="announcement-text-box">
            <div class="announcement-icon"></div>
            <div class="text">{{ rankingname }}</div>
          </div>
        </div>

        <van-icon name="arrow" @click="gotoPreviousPage" />
      </div>
    </div>

    <div class="comments-section-box">
      <div class="text">评论区</div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="comments-box" v-for="c in commentsdata" :key="c.commentId">
          <div class="comments-section-header">
            <div class="head-portrait">
              <img :src="c.user.avatarUrl" alt="" />
            </div>
            <div class="user-box">
              <div class="username">{{ c.user.nickname }}</div>
              <div class="date">
                {{ c.timeStr }} {{ c?.ipLocation.location }}
              </div>
            </div>
            <div class="praise-box">
              <div class="praise-amount">
                {{ c?.likedCount ? c?.likedCount : "" }}
              </div>
              <div class="praise-icon">
                <van-icon name="good-job-o" size="17" color="#ababab" />
              </div>
            </div>
          </div>

          <div class="comment-content">{{ c.content }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getRankingsComments } from "@/apis/rankinglist";
export default {
  props: {
    coverImgUrl: String,
    rankingname: String,
    standingsid: String,
  },
  data() {
    return {
      // 评论总数
      total: "",
      commentsdata: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.getRankingsComments();
     
  },
  methods: {
    async getRankingsComments() {
      let { data } = await this.$axios(getRankingsComments(this.standingsid));
      console.log(data);
      this.commentsdata = data.comments;
      this.total = data.total;
    },

    gotoPreviousPage() {
      this.$router.go(-1);
    },
    onLoad() {
      //  this.$axios(getRankingsComments(this.standingsid)).then(({data})=>{
      //   console.log(data);
      //    this.commentsdata = data.comments;
      //    this.loading = false;
      //    if (!data||data.length<1) {
      //       this.finished = true;
      //    }
      //  });

        this.finished = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 3;
  .announcement {
    padding: 15px;
    width: 100%;
    background-color: #222325;
    margin-bottom: 10px;
    margin-top: 40px;
    .announcement-header {
      position:fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      padding:0 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
       background-color: #222325;
       z-index: 2;
      .text {
        margin: 0 auto;
      }
    }
    .announcement-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .announcement-minibox {
        display: flex;
        .announcement-img {
          width: 80px;
          height: 80px;

          margin-right: 10px;
          img {
            display: block;
            width: 100%;
            border-radius: 5px;
          }
        }
        .announcement-text-box {
          .announcement-icon {
            background: url('@/assets/imgs/icon2.png')
              no-repeat -82px -198px;
            width: 41px;
            height: 24px;
            background-size: 220px;
          }
          .text {
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .comments-section-box {
    padding: 15px;
    width: 100%;
    background-color: #222325;
    font-size: 13px;
    .text {
      margin-bottom: 15px;
    }
    .comments-box {
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .comments-section-header {
        display: flex;
        align-items: center;
        .head-portrait {
          width: 35px;
          height: 35px;

          margin-right: 10px;
          img {
            display: block;
            width: 100%;
            border-radius: 999px;
          }
        }
        .user-box {
          .username {
            color: rgb(241, 229, 229);
          }
          .date {
            font-size: 18px;
            transform: scale(0.5);
            transform-origin: left center;
            color: rgba(169, 169, 169, 0.663);
          }
        }
        .praise-box {
          margin-left: auto;
          display: flex;
          align-items: flex-end;
          .praise-amount {
            color: rgba(169, 169, 169, 0.663);
            margin-right: 5px;
          }
        }
      }
      .comment-content {
        line-height: 20px;
        margin: 10px 0 15px 45px;
      }
    }
  }
}
</style>