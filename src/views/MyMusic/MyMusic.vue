<template>
  <div class="my-music">
    <div class="nav"><span>我的音乐</span></div>

    <!-- 歌单列表 -->
    <div class="song-list">
      <div class="recent-play">
        <div class="icon">
          <img src="@/assets/imgs/pop_ico_play.png" alt="" />
        </div>
        <div class="setting-layer">
          <div>最近播放</div>
          <van-icon name="arrow" color="#ddd" />
        </div>
      </div>
      <div class="user-collect">
        <div class="icon">
          <img src="@/assets/imgs/music_ico_collected.png" alt="" />
        </div>
        <div class="setting-layer">
          <div>我收藏的电台</div>
          <van-icon name="arrow" color="#ddd" />
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-music {
  width: 100vw;
  height: 100vh;
  .nav {
    position: relative;
    font-size: 15px;
    color: #fff;
    height: 60px;
    background-color: #da433a;

    span {
      letter-spacing: 3px;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .song-list {
    width: 100%;
    padding: 20px 0px 0px 10px;
    border-bottom: 10px solid #edeef0;
    background-color: #fff;
    align-items: center;
    .recent-play,
    .user-collect {
      width: 100%;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 26.5px;
        height: 26.5px;

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
        padding: 10px 10px 10px 10px;
        border-bottom: 1px solid #ddd;
        letter-spacing: 3px;
        div {
          color: #000;
          font-size: 14px;
        }
      }
    }
    .user-collect {
      .setting-layer {
        border: none;
      }
    }
  }
}
</style>