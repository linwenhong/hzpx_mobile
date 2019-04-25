<template>
  <div class="Exercises">
    <div class="option">
      <div class="option-left" @click="toTest(2, 1)">
        <p class="text">专业练题</p>
        <p class="small-text">开始练题 ></p>
      </div>
      <div class="option-right" @click="toTest(2, 2)">
        <img src="/static/images/1.png">
        <p>错题本</p>
      </div>
    </div>

    <div class="option public">
      <div class="option-left" @click="toTest(1, 1)">
        <p class="text">公共练题</p>
        <p class="small-text">开始练题 ></p>
      </div>
      <div class="option-right" @click="toTest(1, 2)">
        <img src="/static/images/2.png">
        <p>错题本</p>
      </div>
    </div>
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
    toTest(type, tabIndex) {
      this.$router.push('/question?public=' + type + '&tabIndex=' + tabIndex);
    }
  }
}
</script>

<style scoped>
  .option{
    height: 1.86rem;
    margin: 0.3rem 0.24rem 0;
    background-color: #fff;
    border-radius: 0.15rem;
    overflow: hidden;
  }
  .option-left {
    width: 5.6rem;
    height: 100%;
    float: left;
    padding: 0.5rem 0 0 0.5rem;
    background-color: #568fdc;
  }
  .option-left .text {
    color: #fff;
    font-size: 0.4rem;
  }
  .option-left .small-text {
    margin-top: 0.15rem;
    color: #fefefe;
    font-size: 0.25rem;
  }
  .option-right {
    width: 1.4rem;
    height: 100%;
    float: left;
  }
  .option-right img {
    width: 0.7rem;
    margin: 0.4rem 0 0 0.35rem;
  }
  .option-right p {
    margin-top: 0.15rem;
    color: #568fdc;
    font-size: 0.28rem;
    text-align: center;
  }

  .public .option-left {
    background-color: #da9d45;
  }
  .public .option-right p {
    color: #da9d45;
  }
</style>
