<template>
    <div v-if="mvdatalist">
        <video :src="mvdatalist" width="100%" height="400px" controls autoplay></video>
    </div>
</template>
<script>
export default {
    props: {
        mvdatalist:String
    }

}
</script>