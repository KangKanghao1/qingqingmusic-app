<template>
  <div class="singer-detailed-view">
    <div class="singer-detailed-title">
      <div class="singer-introduce">歌手介绍</div>
      <div>更多</div>
    </div>

    <div class="singer-content-text">
        <p class="singer-text">{{singerdesc.briefDesc}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    singerdesc: Object,
  },
};
</script>

<style lang="scss" scoped>
.singer-detailed-view {
  .singer-detailed-title {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .singer-introduce {
        font-size: 20px;
        font-weight: bold;
    }
  }

  .singer-content-text {
    padding: 0px 20px;

    .singer-text {
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
    }
  }
}
</style>