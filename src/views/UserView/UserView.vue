<template>
  <div class="user-box">
    <div class="nav-bar">
      <span class="title">个人中心</span>
      <span class="icon"><img src="@/assets/imgs/common_iocn_tishi.png" alt=""></span>
      
    </div>

    <div class="user">
      <div class="user-info">
        <div class="portrait">
          <div class="head-portrait" @click="userPage"></div>
          <div class="user-name">元</div>
        </div>
        <div class="sign"><img src="@/assets/imgs/me_ico_qiandao.png" alt=""><span>签到</span></div>
      </div>

      <div class="user-list">
        <div class="item">
          <span class="count">0</span><span class="attention">关注</span>
        </div>
        <div class="item">
          <span class="count">0</span><span class="bean">粉丝</span>
        </div>
        <div class="item">
          <span class="count">0</span><span class="integral">积分</span>
        </div>
        <div class="item">
          <span class="data-icon count">
            <img src="@/assets/imgs/me_ico_edit.png" alt="">
            </span
          ><span class="user-data">我的资料</span>
        </div>
      </div>
    </div>

    <!-- 会员中心  -->
    <div class="member-box">
      <div class="member">
        <span class="me-icon"><img src="@/assets/imgs/me_ico_member.png" alt=""></span>
        <span>会员中心</span>
        </div>
      <van-icon name="arrow" color="#ddd" />
    </div>

    <!-- 评论 -->
    <div class="comment-box">
      <div class="comment">
        <span class="me-icon"><img src="@/assets/imgs/me_ico_comment.png" alt=""></span>
        <span>我的评论</span>
        </div>
      <van-icon name="arrow" color="#ddd" />
    </div>

    <div class="fooler">
      <div class="set">
        <div class="icon"><img src="@/assets/imgs/me_ico_setting.png" alt=""></div>
        <div class="setting-layer">
            <div>设置</div>
            <van-icon name="arrow" color="#ddd" />
        </div>
      </div>
      <div class="about-us">
         <div class="icon"><img src="@/assets/imgs/me_ico_about.png" alt=""></div>
        <div class="setting-layer">
            <div>关于我们</div>
            <van-icon name="arrow" color="#ddd" />
        </div>
      </div>
      <div class="contact-us">
       <div class="icon"><img src="@/assets/imgs/me_ico_contact.png" alt=""></div>
        <div class="setting-layer">
            <div>联系我们</div>
            <van-icon name="arrow" color="#ddd" />
        </div>
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="to-login"><span>退出登录</span></div>

    <transition name="drawer">
      <router-view />
    </transition>
    
  </div>

</template>
<script>
export default {
  methods: {
    onClickLeft() {},
    onClickRight() {},

    userPage() {

      this.$router.push('/user/user-page');

    }
  },
};
</script>


<style lang="scss" scoped>
.user-box {
  position: relative;
  color: #fff;
  width: 100vw;
  height: 100vh;
  background-color: #eeeff1;
  .nav-bar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 60px;
    background-color: #da433a;
    .title {
      font-size: 15px;
      color: #fff;
      padding-bottom: 15px;
      letter-spacing: 4px;
    }

    .icon {
      position: absolute;
      right: 10px;
      bottom: 15px;
      width: 20px;
      height: 20px;

      img {
          width: 100%;
          display: block;
        }
    }
  }

  .user {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-bottom: 10px solid #edeef0;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .portrait {
        display: flex;
        align-items: center;
        .head-portrait {
          width: 45px;
          height: 45px;
          border-radius: 999px;
          background-color: rgba(0, 0, 0, 0.4);
          margin-right: 15px;
        }

        .user-name {
          color: #000;
        }
      }

      .sign {
        display: flex;
        align-items: center;
        padding: 5px 7px;
        border-radius: 999px;
        background-color: #da433a;

        span {
          color: rgb(241, 237, 237);
          font-size: 12px;
          letter-spacing: 2px;
          margin-left: 3px;
        }
        img {
            width: 18px;
            height: 18px;
            display: inline-block;
          }
      }
    }

    .user-list {
      color: #000;
      
      display: flex;
      justify-content: space-evenly;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 25%;
        font-size: 13px;
        color: #000;
        margin-top: 30px;
        text-align: center;
        border-right: 2px solid rgba(0, 0, 0, 0.1);

        &:last-child {
          border-right: none;
        }

        span {
          color: #777;
          font-weight: 600;
          line-height: 20px;

          &.count {
            color: #da433a;
            font-size: 20px;
            margin-bottom: 10px;
          }

          &.data-icon {
            width: 20px;
            height: 20px;

            img {
              width: 100%;
              display: block;
            }
          }
        }
      }
    }

  }

  .member-box,
  .comment-box {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border-bottom: 10px solid #edeef0;
    align-items: center;

    .member,
    .comment {
      display: flex;
      align-items: center;
      .me-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 15px;

        img {
          width: 100%;
          display: block;
        }
      }

      span {
        color: #777;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 3px;
      }
    }
  }

  .fooler {
    width: 100%;
    padding: 20px 0px 0px 10px;
    border-bottom: 10px solid #edeef0;
    background-color: #fff;
    align-items: center;
    .set,.about-us,.contact-us {
        width: 100%;
        display: flex;
        align-items: center;
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 15px;

        img {
          width: 100%;
          display: block;
        }
      }

      .setting-layer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 10px;
          padding: 10px 10px 10px 0px;
          border-bottom: 1px solid #ddd;
          div {
              color: #777;
              font-size: 13px;

          }
      }
    }
    .contact-us {
        .setting-layer {
            border: none;
        }
    }
  }

  .to-login {
        width: 100vw;
        line-height: 40px;
        color: #da433a;
        text-align: center;
        background-color: #fff;
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