
<template>
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
              autoplay
              controls
              
            ></video>
          </div>
        </van-pull-refresh>
      </van-swipe-item>
    </van-swipe>
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
      // swiperList: [
      //        {
      //     avatar: 5953033,
      //     fabulousNum: "1.9W",
      //     commentNum: "16W",
      //     shareNum: "7W",
      //     cove:
      //       "http://p1.music.126.net/hcTkAfpXdZ8YiCE3k2RjbA==/109951163336811416.jpg",
      //     mvname: "주지마 18/06/06 Above Live现场",
      //     nickname: "Loco",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/a12c/mv/51f0/47f3c1c607219822cfcde749a630bddd.mp4?wsSecret=882adeacaba861947def99950935a325&wsTime=1668048431",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },
        
      //   {
      //     avatar: 5876126,
      //     fabulousNum: "58W",
      //     commentNum: "1.2W",

      //     mvname: "我们  ",
      //     shareNum: "2.2W",
      //     nickname: "陈奕迅",
      //     cove:
      //       "http://p1.music.126.net/QDtQtMofBSAUz8twBQ5Pvg==/109951165535399992.jpg",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/YCIhISAgMjJgMDAgYCAwIQ==/mv/5876126/44ade06f9cf08c17aa1393928a470f3e.mp4?wsSecret=58cc3f8545cea5c83008f9b6926198f4&wsTime=1668047123",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },
      //   {
      //     avatar: 5595071,
      //     fabulousNum: "124W",
      //     commentNum: "2.3W",
      //     shareNum: "1.2W",
      //     mvname: "DINOSAUR",
      //     nickname: "AKMU",
      //     play: false,
      //     cove:
      //       "http://p1.music.126.net/ODQTBHh8vGGDBB5QqHvOrA==/109951167742397668.jpg",
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/9c4a/core/a699/b40e2e9001535da80c5aefc66cf47195.mp4?wsSecret=58818fb95b84caaadd64aedc6c21e989&wsTime=1668047346",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },

      //   {
      //     avatar: 5617045,
      //     fabulousNum: "55W",
      //     commentNum: "16.2W",
      //     shareNum: "12.9W",
      //     mvname: "Ablikim-Ablimit ( Talwa Qiz )",
      //     nickname: "Ablikim Ablimit",
      //     play: false,
      //     cover:
      //       "http://p1.music.126.net/AeqFssNiKB-aKodmx-KhUw==/18793952255574830.jpg",
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/IGIyJCMwMzMkIDAiIiYyMQ==/mv/5617045/82e107ee832a22049b26ebb57710c6fa.mp4?wsSecret=c775adfd8c8c5644b070dff6b9a44a7a&wsTime=1667995790",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },

      //   {
      //     avatar: 5696012,
      //     fabulousNum: "35W",
      //     commentNum: "12W",
      //     shareNum: "6.2W",

      //     mvname: "Uyghur kizi",
      //     cove:
      //       "http://p1.music.126.net/EknvVEOf8QZos6dwMOWO-w==/109951163053400031.jpg",
      //     nickname: "Abdugini Ablikim",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/mv/20171031102208/2da7d18a-8efe-4394-ae0f-41f5a2aa437d/3ce58d1b4630ccf6bec33d1c1b9b9c3b.mp4?wsSecret=80fd26afd28427559381a87c18336300&wsTime=1667995761",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },

      //   {
      //     avatar: 5293234,
      //     fabulousNum: "69W",
      //     commentNum: "6.3W",
      //     shareNum: "10.4W",
      //     cove:
      //       "http://p1.music.126.net/SXfhSGaAUFT9mctC8oiDHA==/1413971955085320.jpg",
      //     mvname: "我不难过",

      //     nickname: "孙燕姿",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/MTI5MDc0OTc=/2c6bca9f1d48b8c748c25e6255a9b258/412adea066a8c774f709934441506cc3.mp4?wsSecret=e96b3879854a8b57f4be4244f16ccfd7&wsTime=1667995685",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },

      //   {
      //     avatar: 5334103,
      //     fabulousNum: "34W",
      //     commentNum: "3.2W",
      //     shareNum: "7.2W",
      //     mvname: "温暖你的冬 录音花絮2  ",
      //     cover:
      //       "http://p1.music.126.net/G09rskU97H10HPPowgUIng==/1426066593488734.jpg",
      //     nickname: "欧阳娜娜",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/MTAhMCJgIDAwICAgMSIhOQ==/mv/5334103/23c0bdd3d7e77bd4c045be8b8f46e7d0.mp4?wsSecret=ddec406c2e8617c67dec50dccb41b1dc&wsTime=1667995722",

      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },


      //   {
      //     avatar: 10930039,
      //     fabulousNum: "45W",
      //     commentNum: "8.2W",
      //     shareNum: "0.2W",
      //     cove:
      //       "http://p1.music.126.net/jy1BtkFM2urM20Sx069hRA==/109951164922166904.jpg",
      //     mvname: "All Night",

      //     nickname: "Afrojack",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2244802781/43995d35bab6fa8f2b3a105e384c52b9.mp4?wsSecret=5095988371a6aefc0034fd29a22ccab4&wsTime=1667995626",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },
      //   {
      //     avatar: 5661076,
      //     fabulousNum: "89W",
      //     commentNum: "3.7W",
      //     shareNum: "17W",
      //     mvname: "Dusk Till Dawn",
      //     cove:
      //       "http://p1.music.126.net/g6APAY_2pSID_WA1S9_Jiw==/109951163020729240.jpg",
      //     nickname: "ZAYN",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/mv/20170907081402/81d721af-af0b-4a7d-9eb4-3806d2fb1120/606273192589fd7c8ea61d4d12cc2df0.mp4?wsSecret=8baded35a4606fabb077071043edeb12&wsTime=1667995573",
      //     msgInfo: "美渣在新歌MV里也是帅得让人舔屏！"
      //   },
      //   {
      //     avatar: 10882451,
      //     fabulousNum: "3.5W",
      //     commentNum: "22W",
      //     shareNum: "6.2W",
      //     cove:
      //       "http://p1.music.126.net/Pq5dyQLtDempZKg4_2st1g==/109951164267822787.jpg",
      //     mvname: "Ah Konglum",

      //     nickname: "Gulbahar-Anwar",
      //     play: false,
      //     url:
      //       "http://vodkgeyttp8.vod.126.net/cloudmusic/c597/core/f4b4/a85de9e2f6321e00b1aa8186dfb9a29f.mp4?wsSecret=f0a4711c0a4504ed844328aa6aa7ef4d&wsTime=1667995514",
      //     msgInfo:
      //       "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言"
      //   },
   
      // ]
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
