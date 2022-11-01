<template>
<div  class="mv-module">
    <div class=" mv-title" >MV</div>  
          
        <div class="video-list"  v-for="m in mvList" :key="m.id" >
            <!-- 播放与暂停 -->
           <div class="toggle-play"  @click="playMV(m.id)"></div>

              <!-- 视频区 -->
              <div class="video-container" >        
                    <video 
                        :poster="m.cover"
                        :src="mvId.url"
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

                  <div class="comments"
                   @click="goToComments(id)">
                    <img src="../../assets/imgs/me_ico_comment.png" alt="">
                  </div>
                   </div>
                 
                </div>
              
              </div>
      
    </div>
   
   
</div>
   
</template>
<script>

import { getMVList} from "../../apis/mvList";
import {playMV} from "../../apis/mvList";
// import {getComments} from "../../apis/mvList"
export default {
    data() {
        return {
            mvList:[],
            mvId:{},
            // getSongId:'',
            id:''

        }
    },
//     created() {
//     this.playMV();
//   },
  mounted(){
      this.getMVList();
  },
     methods:{
    // 获取全部mv
     async getMVList() {
      let { data } = await this.$axios(getMVList);
      this.mvList = data.data;
      // this.getSongId = data.data[0].id
      // console.log( this.getSongId);
      console.log(this.mvList);
      // this.playMV(this.mvList.id)
     
    },

    // 获取MV播放地址
     async   playMV(id) {
      let { data } =  await this.$axios(playMV(id));
      this.mvId = data.data
      console.log( this.mvId);
      console.log('11111111');
        this.id=id
    },
    // 跳转到评论列表
     goToComments(id) {
      this.$router.push(`Comments-list?mv=${id}`);
      console.log("我进来了");
      //  console.log( '我拿到评论了',this.mvcomments);
      

    },
    },

    
    }

</script>
<style lang="scss" scoped>



.mv-module {
    background-color: #222325;
    color: #ffffff;
    padding-bottom: 90px;

  .mv-title {
    font-size: 28px;
    font-weight: 900;
    padding: 10px 9px;
  }

  .video-list {
    position: relative;
    margin: 0 auto;

     .toggle-play {
      width: 35px;
      height: 35px;
      background-image: url(../../assets/imgs/gdt_ic_play.png);
      background-size: 35px 35px;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 1;
      position: absolute;
      top:65px;
      left: 150px;
    

 
    }


  .video-container {
    width: 330px;
    // height: 160px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #ddd;


     video {
    display: block;
   margin: 0 auto;
    overflow: hidden;
    z-index: -888;
  }
  }
  .mv-text {
      padding: 0 15px;
    // justify-content: center;
    .song-name {
      font-size: 14px;
      margin: 5px 0;
    }
    .author {
          display: flex;
          justify-content: space-between;
         font-size: 12px;
         line-height: 25px;
         margin-bottom: 10px;

         .like-comments {
          display: flex;
          width: 60px;
          margin: 0 10px;
          margin-right: 50px;

          .like {
          display: flex;
          // width: 20px;
          // height: 20px;
          
          
          img {
            width: 20px;
            
            display: block;
            
          }
        } 
        .comments {
          display: flex;
          margin-left: 10px;

           img {
            width: 20px;
            display: block;
          }
        }

         }
        

        
    }
  }
  }
}


</style>