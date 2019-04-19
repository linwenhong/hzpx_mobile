<template>
  <div class="Exercises">
    <div v-if="!public" class="test-option" @click="select(2)">专业练题</div>
    <div v-if="!public" class="test-option error-option" @click="select(1)">公共练题</div>

    <div v-if="public" class="test-option option" @click="toTest(1)">练题</div>
    <div v-if="public" class="test-option option" @click="toTest(2)">错题本</div>
  </div>
</template>

<script>
export default {
  name: 'Exercises',
  data () {
    return {
      public: 0
    }
  },
  methods: {
    select(type) {
      this.public = type
    },
    toTest(tabIndex) {
      this.$router.push('/question?public=' + this.public + '&tabIndex=' + tabIndex);
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
  .option{
    background-color: #278c5a;
  }
</style>
