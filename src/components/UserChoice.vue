<template>
  <div class="page">
    <div class="title">请选择报考类型</div>
    <div class="option" v-for="option in UserChoice" @click="select(option)">
      <p>公司：{{option.company.name}}</p>
      <p>专业：{{option.company.category_name}}({{option.application_type | ApplicationType}})</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "UserChoice",
  data() {
    return {
      UserChoice: this.$Cache.getCache("UserChoice", true)
    };
  },
  methods: {
    select(option) {
      this.$Cache.setCache("info", option, true);
      this.$router.push("/home/notice");
    }
  }
};
</script>

<style scoped>
.title {
  margin: 0.2rem 0;
  font-size: 0.3rem;
  text-align: center;
}
.option {
  background-color: #fff;
  font-size: 0.25rem;
  margin: 0.1rem 0.3rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  line-height: 0.5rem;
}
</style>
