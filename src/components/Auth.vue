<template>
  <div></div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      state: 'state'
    }
  },
  created () {

  },
  mounted () {
    const redirect_uri = this.$Config.base_url + '/handle'
    const scope = 'snsapi_base' // snsapi_userinfo snsapi_base
    const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.$Config.app_id
      + "&redirect_uri=" + encodeURIComponent(redirect_uri)
      + "&response_type=code&scope=" + scope
      + "&state=" + this.state
      + "#wechat_redirect"
    window.location.href = url
  }
}
</script>
