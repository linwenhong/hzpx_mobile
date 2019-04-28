<template>
  <div class="personal">
    <div class="info">
      <div class="author-img">
        <img :src="$Config.file_url + userInfo.pic">
      </div>
      <span class="user-name">{{userInfo.name || '---'}}</span>

      <router-link to="/myInfo">
        <div class="user-info">个人信息 ></div>
      </router-link>
    </div>
    <yd-cell-group>
      <yd-cell-item arrow type="link" href="/certificate">
        <span slot="left">
          <img src="/static/images/cert.png">合格证列表
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item arrow type="link" href="/unitChange">
        <span slot="left">
          <img src="/static/images/unitChange.png">单位变更
        </span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      userInfo: this.$Cache.getCache("info", true)
    };
  },
  methods: {},
  created() {
  }
};
</script>

<style scoped>
.personal {
  display: flex;
  flex-direction: column;
}
.info {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0.1rem 0 0.3rem;
  padding: 0.4rem 0.2rem;
  overflow: hidden;
  background-image: url("/static/images/user-bg.png");
}
.author-img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0.08rem 0 0 0;
  vertical-align: middle;
}
.author-img img {
  width: 100%;
  border-radius: 0.5rem;
  height: 1rem;
}
.info .user-name {
  margin-left: 0.3rem;
  font-size: 0.34rem;
  color: #fff;
}
.user-info {
  position: absolute;
  right: 0;
  width: 1.6rem;
  height: 0.36rem;
  background-color: #fff;
  border-radius: 0.2rem 0 0 0.2rem;
  color: #568fdc;
  padding-left: 0.25rem;
}
/deep/ .yd-cell-item img {
  width: 0.7rem;
  margin-right: 0.2rem;
  position: relative;
  top: 0.15rem;
}
</style>
