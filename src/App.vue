<template>
  <div id="app">
    <van-tabbar class="router-title" fixed route>
      <van-tabbar-item to="/discovr">发现</van-tabbar-item>
      <van-tabbar-item to="/mymusic">我的音乐</van-tabbar-item>
      <van-tabbar-item to="/video">视频</van-tabbar-item>
      <van-tabbar-item to="/user">我的</van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>

<style>
.router-title {

  font-weight: bold;
}
</style>
