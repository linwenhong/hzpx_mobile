<template>
  <div></div>
</template>

<script>
import { APP_ID, BASE_URL } from "@/assets/config";
import Cache from "@/assets/cache";
export default {
  name: "Auth",
  data() {
    return {
      code: this.$route.query["code"]
    };
  },
  created() {},
  mounted() {
    const userInfo = this.$Cache.getCache("info", true);
    const open_id = this.$Cache.getCache("open_id");
    if (userInfo && userInfo.id && open_id) {
      const request = {
        id_card: userInfo.id_card,
        phone: userInfo.phone,
        open_id: open_id
      };
      this.$Service.bindingUser(request).then(res => {
        if (res.data.length == 1) {
          this.$Cache.setCache("info", res.data[0], true);
          this.$router.push("/home/notice");
        } else {
          this.$Cache.setCache("UserChoice", res.data, true);
          this.$router.push("/user-choice");
        }
      });
    } else {
      this.$Service.getOpenId({
        code: this.code
      }).then(response => {
        if (response.code == 200) {
          const open_id = response.data.open_id;
          this.$Cache.setCache("open_id", open_id);
          this.$router.push("/login");
        } else {
          this.$dialog.toast({
            mes: response.msg,
            timeout: 1500,
            icon: "error"
          });
        }
      });
    }
  }
};
</script>
