<template>
  <div class="hello">
    <div class="test-option" @click="signIn">打卡签到</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'SignIn',
    data () {
      return {
        userInfo: this.$Cache.getCache('info', true),
        type: this.$route.query['type'], // 1考试, 2模拟, 3培训
        id: this.$route.query['id'] // 对应type的数据id
      }
    },
    methods: {
      signIn () {
        this.$Service.signIn({
          open_id: this.userInfo.open_id,
          type: this.type,
          id: this.id
        }).then(response => {
          if (response.code == 200) {
            this.$dialog.toast({ mes: '签到成功', timeout: 1500, icon: 'success' })
          } else {
            this.$dialog.toast({ mes: response.msg, timeout: 1500, icon: 'error' })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .test-option {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    margin: 3rem auto 0;
    border-radius: 50%;
    background-color: #4274ff;
    color: #eee;
    font-size: 0.4rem;
    text-align: center;
  }
</style>
