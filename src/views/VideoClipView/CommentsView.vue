<template>
<div class="page">


  <div class="comments-list">
    <div class="return" @click="onClickLeft">
      <img src="../../assets/imgs/8W.png" alt="">
    </div>
    <h1>全部评论</h1>
    <div class="comments-item" v-for=" m in commentslist" :key="m.commentId">
     
      
      <!-- 头像 -->
      <div class="head-portrait">
        <img :src="m.user.avatarUrl" alt="">
      </div>

      
      <!-- 评论内容区 -->
      <div class="text-flex">
          <div class="comments-text">
            <div class="nickname">{{m.user.nickname}}</div>
            <div class="comment-time">{{m.timeStr}}</div>
            <div class="comments-content">{{m.content}}</div>
          </div>

           <div>
                <div class="like-icon">
                  <span>{{m.likedCount}}</span>
                  <img src="../../assets/imgs/good.png" alt="">
                </div>
           </div>

      </div>
    </div>
    <!-- <commentsListView/> -->
     <transition name="drawer">
      <router-view />
    </transition>
  </div>
  </div>
</template>
<script>

import {getComments} from "../../apis/mvList"
// import commentsListView from "@/components/commentsListView.vue"

export default {

  data() {
    return {
      bodaydata: "",
      commentslist:[]
    };
  },
  created() {
    this.bodaydata = this.$route.query.mv;
    this.getComments(this.bodaydata)
    
  },
  methods:{

      async getComments(id) {
      let {data} =  await this.$axios(getComments(id));
      this.commentslist = data.hotComments
      console.log( '请求过来的评论数据', this.commentslist);
    },

     onClickLeft() {
      console.log("走咯");
      this.$router.go(-1);
    },
  },
//   components:{
//       commentsListView
//   }
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #222325;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
    .comments-list {
      color: #d6d3d3;
      padding-bottom: 100px;
       
      .return {
     
      padding: 15px 8px;
      img {
         width: 20px;
         height: 20px;
      }
      
      }
       h1 {
          font-size:20px;
          font-weight: 600px;
          font-weight:bold;
        }
      .comments-item {
        display: flex;
        border-bottom:1px solid  rgb(103, 99, 99);
        padding-bottom: 10px;
        margin-top: 18px;

       
       
        .head-portrait {
          
           margin-left: 8px;
            
            

            img {
            width: 30px;
            height: 30px;
        
            display: block;
            border-radius: 50%;
            }
        }

        .text-flex {
         display: flex;

        .comments-text {
        margin: 7px 0 0 12px;
       
       
        .nickname {
          font-size: 14px;
        }
        .comment-time {
          font-size: 12px;
          color: #777;
          padding-top:5px ;
        }
        .comments-content {
          width: 250px;
          font-size: 12px;
          padding-top: 8px;
        }

         }
         .like-icon {
          margin-left: px;
        
          display: flex;
          span {
            font-size: 12px;
            margin-top: 5px;
          }
          img {
             width: 20px;
             height: 20px;
             display: block;
             margin-left: 8px;
          }
          
        }

        }

       
      }
    }
}
    .drawer-enter,
 .drawer-leave-to{
   transform: translateY(100%);
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all .15s linear;
}
.drawer-enter-to,
.drawer-leave {
  transform: translateY(0);
}
 
</style>