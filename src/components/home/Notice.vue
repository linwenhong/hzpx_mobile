<template>
  <div class="notice">
    <div class="remark" v-if="testList.length == 0 && trainList.length == 0">暂无通知</div>
    <div class="option" v-for="item of trainList" :key="item.id">
      <div class="title"><i></i>培训通知</div>
      <p>培训名称: {{item.name}}</p>
      <p>培训时间: {{item.start_time}} 至 {{item.end_time}}</p>
    </div>

    <div class="option test" v-for="item of testList" :key="'test_' + item.id">
      <div class="title"><i></i>考试通知</div>
      <p>考试名称: {{item.name}}</p>
      <p>考试时间: {{item.start_time}} 至 {{item.end_time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      testList: [],
      trainList: []
    };
  },
  methods: {
    getInfo() {
      this.$Service.getNotices().then(res => {
        if (res.code == 200) {
          this.testList = [];
          this.trainList = [];
          this.testList = res.data["test"];
          this.trainList = res.data["train"];
        }
      });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style scoped>
.notice {
  display: flex;
  flex-direction: column;
}
.notice .card {
  width: 96%;
  padding: 0.3rem 0;
  background-color: #fff;
  margin: 0.1rem auto;
  border-radius: 6px;
}
.option{
  margin: 0.3rem 0.24rem 0;
  padding: 0.24rem;
  background-color: #fff;
  border-radius: 0.15rem;
  overflow: hidden;
}
.option .title {
  color: #568fdc;
  margin-bottom: 0.2rem;
}
.option i {
  position: relative;
  top: -0.01rem;
  display: inline-block;
  width: 0.1rem;
  height: 0.1rem;
  margin-right: 0.07rem;
  background-color: #568fdc;
  border-radius: 50%;
}
.option p {
  color: #222;
  line-height: 0.54rem;
  font-size: 0.24rem;
}

.test .title {
  color: #7edb58;
}
.test i {
  background-color: #7edb58;
}
.remark {
  margin: 0.5rem auto;
}
</style>
