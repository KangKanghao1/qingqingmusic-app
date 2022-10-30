<template>
    <div class="box">
       <div @click="goto">&lt;</div> 123
        </div>
</template>
<script>
export default {
    methods:{
        goto(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: aqua;
    z-index: 12;
}
</style>