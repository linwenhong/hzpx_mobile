<template>
  <div class="Exercises">
    <div class="test-option" @click="toTest()">专业练题</div>
    <div class="test-option error-option">公共练题</div>
  </div>
</template>

<script>
export default {
  name: 'Exercises',
  data () {
    return {
    }
  },
  methods: {
    toTest() {
      this.$router.push('/question')
    }
  }
}
</script>

<style scoped>
  .test-option {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    margin: 1rem auto 0;
    border-radius: 50%;
    background-color: #4274ff;
    color: #eee;
    font-size: 0.4rem;
    text-align: center;
  }
  .error-option {
    background-color: #ff640a;
  }
</style>
