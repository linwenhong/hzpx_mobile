<template>
  <div class="notice">
    <div class="trainInfo card" v-for="item of trainList" :key="item.id">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">培训时间:</span>
          <span slot="right">{{item.start_time + '至' + item.end_time || '-'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">培训名称:</span>
          <span slot="right">{{item.name || '-'}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="examInfo card" v-for="item of testList" :key="item.id">
            <yd-cell-group>
        <yd-cell-item>
          <span slot="left">考试时间:</span>
          <span slot="right">{{item.start_time + '至' + item.end_time || '-'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">考试名称:</span>
          <span slot="right">{{item.name || '-'}}</span>
        </yd-cell-item>
      </yd-cell-group>
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
</style>
