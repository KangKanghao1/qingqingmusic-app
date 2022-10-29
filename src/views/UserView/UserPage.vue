<template>
  <div class="user-page">
    <div class="back">
      <van-icon name="arrow-left" @click="onClickLeft" size="20" color="#fff" />

      <div class="user-info">
          <div class="head-portrait"></div>
          <div class="user-name">雨落夜孤<img src="@/assets/imgs/ico_male.png" alt="">
          </div>
          <div class="user-bank">
             <div class="attention">关注<span class="a-count">0</span></div>|
             <div class="fans">粉丝<span class="f-count">0</span></div>
        </div>
      </div>

      <!-- 编辑 -->
      <div class="setting">
        <img src="@/assets/imgs/self_ico_edit.png" />
        <span>编辑</span>
      </div>
    </div>

    <!-- 列表 -->
    <van-tabs v-model="active" animated line-height="2px" title-active-color="#e4393c">
  <van-tab title="音乐">内容 1</van-tab>
  <van-tab title="关于我">内容 2</van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {

  data() {

    return {
      active: 0
    }
  },
  methods: {
    onClickLeft() {
      console.log("进来了");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e4e4e4;
  z-index: 22;

  .back {
    position: relative;
    width: 100%;
    padding: 30px 10px 10px 10px;
    background-image: url("@/assets/imgs/ic_mine_backgound.png");
    background-position: center center;
    background-size: cover;
    margin: 0;
  }

  .setting {
    position: absolute;
    display: flex;
    align-items: center;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #f5f5f5;
    letter-spacing: 2px;
    border: 1px solid rgba(255, 255, 255, .4);
    border-radius: 4px;
    padding: 5px 8px;

    img {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-right: 3px;
    }
  }

  .user-info {
    margin: 50px 0px 0px 10px;
    display: flex;
    flex-direction: column;

    .head-portrait {
      width: 60px;
      height: 60px;
      border-radius: 999px;
      background-color: #e4e4e4;
    }

    .user-name {
      margin-top: 10px;
      font-size: 16px;
      color: #f5f5f5;
      line-height: 25px;
      letter-spacing: 4px;
      
      img {
        width: 20px;
        height: 15px;
         margin-left: 3px;
      }
    }

    .user-bank {
      display: flex;
      margin-top: 15px;
      font-size: 12px;
      color: #999;
    }
    
  }
  
}
</style>