<template>
  <span>{{ onPlayCount }}</span>
</template>

<script>
export default {
  props: {
    p_count: Number,
  },

  computed: {
    onPlayCount() {
      let playCount = "";
      if (this.p_count >= 10000 && this.p_count < 100000) {
        playCount = Math.floor(this.p_count / 1000) / 10 + "万";
      } else if (this.p_count >= 100000) {
        playCount = Math.floor(this.p_count / 10000) + "万";
      }else{
        playCount = this.p_count;
      }
      return playCount;
    },
  },
};
</script>