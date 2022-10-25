<template>
  <div class="discover-view">
    <div class="search-tab">
      <van-search
        class="search-input"
        shape="round"
        background="#fff"
        placeholder="搜索歌曲"
      />
      <div class="music-img"></div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.discover-view {
  .search-tab {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    z-index: 10;
    width: 100vw;
    background-color: #fff;

    .van-search {
      width: 85vw;
    }

    .music-img {
      width: 35px;
      height: 35px;
      background-color: rgb(227, 111, 111);
      border-radius: 999px;
    }
  }

}
</style>