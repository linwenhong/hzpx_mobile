<template>
  <div class="hello">
    <div class="test-option" @click="signIn">签到</div>
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
          student_id: this.userInfo.id,
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
    width: 2.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin: 4.1rem auto 0;
    border-radius: 50%;
    background-color: #568fdc;
    color: #eee;
    font-size: 0.4rem;
    text-align: center;
  }
</style>
