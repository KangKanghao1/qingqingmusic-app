<template>
    <div class="box">
        <div class="nav">
            <div class="all">全部</div>
            <div class="mv">mv</div>
        </div>
        <VideoAll></VideoAll>
    </div>
</template>
<script>
import VideoAll from './VideoAll.vue'
export default {
  
    components: {
        VideoAll
    }
}
</script>
<style lang="scss" scoped>
.box {
    .nav {
        width: 100%;
        height: 40px;
        background-color: aqua;
        position: fixed;
        display: flex;
        text-align: center;
        align-items: center;

        div {
            width: 25%;
        }
    }
}
</style>