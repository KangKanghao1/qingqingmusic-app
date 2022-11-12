
<template>

<div  class="mv-module">
    <div class=" mv-title">MV</div>        
        <div class="video-list"  v-for="m in mvList" :key="m.id" >
          <!-- <div> 视频 {{m.id}}</div> -->
          <!-- v-for="m in mvList" :key="m.id" -->

           <div class="toggle-play"   @click="playMV(m.id)"></div>

            <!-- 视频 -->
            
              <div class="video-container" >        
                    <video 
                        :poster="m.cover"
                        :src="m.url"
                        width="300px" height="160px"
                        controls 
                        >
            
                    </video>
              </div>  

              <!-- 视频文本区     -->
              <div class="mv-text">
                <div class="song-name">{{m.name}}
                </div>
                <div class="author ">
                   <h3>{{m.artistName}}</h3>

                   <div class="like-comments">  
                    <div class="like">
                    <img src="../../assets/imgs/me_ico_chuanshao.png" alt="">
                    <span>{{m.playCount}}</span>
                   
                  </div>
                  <div class="comments" @click="goToComments">
                    <img src="../../assets/imgs/me_ico_comment.png" alt="">
                  </div>
                   </div>
                 
                </div>
              </div>

  <div class="main">
    <van-swipe
      class="my-swipe"
      :show-indicators="false"
      :loop="false"
      @change="onChange"
      style="height: 94vh"
      vertical
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in mvList" :key="index">
        <div class="right_menus">
          <div class="menuClick">
            <img class="avatar" :src='item.cover'>
            <div class="follow"></div>
          </div>
          <div class="click-info">
            <img class="icon" src="../../assets/imgs/good.png"  >
            <!-- <div class="text">{{ item.fabulousNum }}</div> -->
          </div>
          <div class="click-info">
            <img class="icon" src="../../assets/imgs/me_ico_comment.png"  @click="goToComments(commentID)">
            <!-- <div class="text">{{ item.commentNum }}</div> -->
          </div>
          <div class="click-info">
            <van-icon name="share" size="30" />
            <!-- <div class="text">{{ item.shareNum }}分享</div> -->
          </div>
        </div>
        <div class="text-container">
          <div class="nickname">@{{ item.artistName }}</div>
          <div class="msg">{{ item.name }}</div>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="video-box">
            <video
              class="video-content"
              ref="video"
               :poster="item.cove"
              :id="`player${index}`"
              :src="playId"
              width="100%"
              height="100%"
              controls
            ></video>
          </div>
        </van-pull-refresh>
      </van-swipe-item>
    </van-swipe>
  </div>

        </div>
</div>
</template>
<script>
import { Toast } from "vant";
import { getMVList} from "../../apis/mvList";
import {playMV} from "../../apis/mvList";
export default {
  data() {
    return {
      playing: false,
      // 获得的mvid
      commentID: "",
      // 下拉刷新
      isLoading: false,
      // 视频MV数据数据
      mvList:[],
      playId:"",
   
    };
  },
  created() {
 
    this.getMVList()
    
  },
  mounted() {
    setTimeout(() => {}, 1000);
   
  },
  methods: {
     // 获取全部mv
     async getMVList() {
      let { data } = await this.$axios(getMVList);
      this.mvList = data.data;
      console.log('视频数据列表  ==>', this.mvList); 
      
    },
    // 视频播放与上拉切换
    onChange(index) {
      console.log(index);
      var player = document.getElementById(`player${index}`);
      if (player.paused) {
        this.mvList.forEach((item, s_index) => {
          this.commentID = item.id;

          if (s_index == index) {
            // document.getElementById(`player${s_index}`).play();
            item.subed = true;
             this.playMV (this.commentID)
            console.log(this.commentID);
          } else {
            document.getElementById(`player${s_index}`).pause();
            item.subed = false;
          }
        });
      } else {
        this.mvList.forEach((item, s_index) => {
          document.getElementById(`player${s_index}`).pause();
          item.subed = false;
        });
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast("暂无更多更新");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
     // 获取MV播放地址
     async  playMV(id) {
      let { data } =  await this.$axios(playMV(id));
      this.playId = data.data.url
      console.log(data);
      // mv地址id随路由跳转给评论页面
        this.commentID=id
            return
    },
 
       // 跳转到评论列表
     goToComments(id) {
      this.$router.push(`Comments-list?mv=${id}`);
      console.log("我进来了");
      //  console.log( '我拿到评论了',this.mvcomments);
    },
     
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 999;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 14px;
    text-align: center;
    background-image: url(../../assets/imgs/shy.jpg);
    //  background-size: 50px 50px;
    //  background-repeat: no-repeat;
    //  background-position: center center;
    // background-color: #222325;
    position: relative;
    z-index: 2;
    .video-content {
      width: 100%;
      height: 50%;
    }
    .right_menus {
      position: absolute;
      width: 100px;
      padding: 1.02rem;
      // box-sizing: border-box;
      bottom: 1.2rem;
      right: 0;
      .menuClick {
        position: relative;
        width: 100%;
        margin-bottom: 1.2rem;
        .avatar {
          width: 38px;
          height: 37px;
          border-radius: 50%;
          border: #fff 0.02rem solid;
          margin-left: 30px;
        }
      }
      .click-info {
        position: relative;
        width: 6.2rem;
        margin-bottom: 20px;
        img {
          width: 25px;
          height: 25px;
        }
        .text {
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #fff;
          font-size: 0.16rem;
        }
      }
    }
    .text-container {
      position: absolute;
      width: 279px;
      left: 0;
      bottom: 40px;
      padding: 0.2rem 0.1rem;
      box-sizing: border-box;
      .nickname {
        width: 100%;
        font-size: 16px;
        color: #fff;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: left;
      }
      .msg {
        position: relative;
        width: 100%;
        padding: 14px 0;
        box-sizing: border-box;
        line-height: 14px;
        font-size: 14px;
        text-align: left;
      }
    }
    .video-box {
      margin-top: 115px;
    }
  }
}
</style>
