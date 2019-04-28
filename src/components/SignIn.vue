<template>
  <div class="hello">
    <h5 class="title">{{ type | SignInType }}签到</h5>
    <div class="test-option" @click="signIn">签到</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "SignIn",
  data() {
    return {
      userInfo: this.$Cache.getCache("info", true),
      type: this.$route.query["type"], // 1考试, 2模拟, 3培训
      id: this.$route.query["id"] // 对应type的数据id
    };
  },
  methods: {
    signIn() {
      this.$Service
        .signIn({
          student_id: this.userInfo.id,
          type: this.type,
          id: this.id
        })
        .then(response => {
          if (response.code == 200) {
            this.$dialog.toast({
              mes: "签到成功",
              timeout: 1500,
              icon: "success"
            });
          } else {
            this.$dialog.toast({
              mes: response.msg,
              timeout: 1500,
              icon: "error"
            });
          }
        });
    }
  },
  mounted() {
    const userInfo = this.$Cache.getCache("info", true);
    const open_id = this.$Cache.getCache("open_id");
    if (userInfo && userInfo.id && open_id) {
      const request = {
        id_card: userInfo.id_card,
        phone: userInfo.phone,
        open_id: open_id
      };
      if (!this.$Cache.get("canSignIn")) {
        this.$Service.bindingUser(request).then(res => {
          if (res.data.length > 1) {
            this.$Cache.set(
              "formPage",
              {
                path: "sign-in",
                data: {
                  type: this.type,
                  id: this.id
                }
              },
              true
            );
            this.$Cache.setCache("UserChoice", res.data, true);
            this.$router.push("/user-choice");
          }
        });
      }
    } else {
      this.$router.push("/auth");
    }
  }
};
</script>

<style scoped>
.test-option {
  width: 2.4rem;
  height: 2.4rem;
  line-height: 2.4rem;
  margin: 1rem auto 0;
  border-radius: 50%;
  background-color: #568fdc;
  color: #eee;
  font-size: 0.4rem;
  text-align: center;
}
.title {
  margin-top: 2.5rem;
  font-size: 0.5rem;
  text-align: center;
}
</style>
