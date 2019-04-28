<template>
  <div class="page">
    <div class="title">请选择报考类型</div>
    <div class="option" v-for="option in UserChoice" @click="select(option)" :key="option.id">
      <p>公司：{{option.company.name}}</p>
      <p>专业：{{option.company.category_name}}({{option.application_type | ApplicationType}})</p>
      <p>申请类别：{{option.certificate_type}}</p>
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
      const formPage = this.$Cache.get("formPage", true);
      if (formPage) {
        // this.$Cache.clear(["formPage"]);
        let str = "";
        let n = 0;
        for (const key in formPage.data) {
          if (n == 0) {
            str = "?" + key + "=" + formPage.data[key];
            n++;
          } else {
            str += "&" + key + "=" + formPage.data[key];
          }
        }
        this.$Cache.set("canSignIn", true);
        const url = formPage.path + str;
        this.$router.push(url);
      } else {
        this.$router.push("/home/exercises");
      }
    }
  }
};
</script>

<style scoped>
.title {
  padding-top: 0.2rem;
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
