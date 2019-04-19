<template>
  <div class="personal">
    <div class="info">
      <div class="author-img">
        <img src="../../assets/images/user.png" alt="author-img">
      </div>
      <span class="user-name">user</span>
    </div>

    <!-- <div class="personal-item" @click.stop='unitChange'>
      <span>单位变更</span>
      <div class="icon">
        <img src="../../assets/images/jiantou.png" alt="" style="color: #eee">
      </div>
    </div>-->
    <yd-cell-group>
      <yd-cell-item arrow type="link" href="/unitChange">
        <span slot="left">单位变更</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {};
  },
  methods: {
  },
  created() {
    this.$Service.getStudentDetails({ student_id: 166 }).then(res => {
      console.log(res);
      if (res.code == 200) {
        this.$Cache.setCache("info", res.data, true);
      }
    });
  }
};
</script>

<style scoped>
.personal {
  display: flex;
  flex-direction: column;
}
.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0.1rem 0 0.3rem;
  padding: 0.4rem 0.2rem;
  background: #ffffff;
  overflow: hidden;
  background-color: #fff;
}
.author-img {
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  vertical-align: middle;
}
.author-img img {
  width: 100%;
  border-radius: 0.5rem;
  height: 1rem;
}
.info .user-name {
  margin-left: 0.3rem;
  font-size: 16px;
  color: #333;
}

</style>
