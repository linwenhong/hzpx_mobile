<template>
  <div class="home">
    <yd-layout>
      <router-view></router-view>

      <!-- <yd-tabbar slot="tabbar">
        <yd-tabbar-item
          v-for="item of routerList"
          :key="item.id"
          :title="item.title"
          :link="item.link"
          :active="item.link === $route.path"
        >
          <yd-icon :name="item.name" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
      </yd-tabbar>-->
      <yd-tabbar slot="tabbar">
        <yd-tabbar-item
          title="登录"
          link="/home/login"
          :active="$route.path === '/home/login'"
          v-if="!$Cache.getCache('login')"
        >
          <yd-icon name="phone1" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item
          title="通知"
          link="/home/notice"
          :active="$route.path === '/home/notice'"
          v-else
        >
          <yd-icon name="home" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item
          title="练题"
          link="/home/exercises"
          :active="$route.path === '/home/exercises'"
        >
          <yd-icon name="feedback" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item
          title="个人中心"
          link="/home/personal"
          :active="$route.path === '/home/personal'"
        >
          <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
        </yd-tabbar-item>
      </yd-tabbar>
    </yd-layout>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      activeId: 0,
      login:  this.$Cache.getCache('login'),
      routerList: [
        {
          id: 0,
          title: "通知",
          link: "/home/notice",
          name: "home"
        },
        {
          id: 1,
          title: "练题",
          link: "/home/exercises",
          name: "shopcart-outline"
        },
        {
          id: 2,
          title: "个人中心",
          link: "/home/personal",
          name: "ucenter-outline"
        }
      ]
    };
  },
  methods: {
    checkIfLogin() {

    }
  },
  created() {
    this.$Cache.setCache('open_id', 123)
  }
};
</script>

<style scoped>
.home {
  height: 100vh;
}
</style>
