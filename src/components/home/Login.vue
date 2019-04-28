<template>
  <div class="login">
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">身份证：</span>
        <yd-input slot="right" v-model="form['id_card']" placeholder="请输入身份证"/>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" v-model="form['phone']" placeholder="请输入手机号码"/>
      </yd-cell-item>
    </yd-cell-group>
    <div class="mt-5">
      <yd-button size="large" type="primary" @click.native="confirm">绑定</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    confirm() {
      if (!this.form.id_card) {
        this.$dialog.toast({
          mes: "请填写身份证信息",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (!this.form.phone) {
        this.$dialog.toast({
          mes: "请输入手机号",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      const request = {
        id_card: this.form.id_card,
        phone: this.form.phone,
        open_id: this.$Cache.getCache("open_id")
      };
      this.$Service.bindingUser(request).then(res => {
        if (res.code == 200) {
          this.$dialog.toast({
            mes: "绑定成功",
            timeout: 1500,
            icon: "success"
          });
          this.$Cache.setCache("login", true);
          if (res.data.length == 1) {
            this.$Cache.setCache("info", res.data[0], true);
            this.$router.push("/home/notice");
          } else {
            this.$Cache.setCache("UserChoice", res.data, true);
            this.$router.push("/user-choice");
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: "error"
          });
        }
      });
    }
  },
  mounted() {
    // this.login()
  }
};
</script>

<style scoped>
.login {
  width: 96%;
  margin: 0 auto;
  padding-top: 20%;
}
</style>
