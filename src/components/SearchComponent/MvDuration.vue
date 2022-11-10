<template>
  <span>{{onDuration}}</span>
</template>

<script>
export default {
  props: {
    duration:Number
  },
  
  computed: {
    onDuration() {
     let y = new Date(this.duration);
        let minutes = y.getMinutes();
        minutes = minutes >= 10 ? minutes: "0" + minutes;
        let seconds = y.getSeconds();
        seconds = seconds >= 10 ? seconds: "0" + seconds;

        return `${minutes}:${seconds}`
      }

  }
}
</script>