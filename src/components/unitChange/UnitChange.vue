<template>
  <div class="unitChange">
    <div class="btn-change">
      <button class="btn" @click.prevent="add">新增单位变更</button>
    </div>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <yd-cell-group slot="list" v-for="item of list" :key="item.id">
        <yd-cell-item>
          <span slot="left">申请标题</span>
          <span slot="right">{{item.title}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">旧单位</span>
          <span slot="right">{{item.old_company_name || '-' }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">新单位</span>
          <span slot="right">{{item.new_company_name || '-' }}</span>
        </yd-cell-item>
      </yd-cell-group>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">已全部展示</span>

      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg">
    </yd-infinitescroll>
  </div>
</template>

<script>
export default {
  name: "UnitChange",
  data() {
    return {
      page: 1,
      pageSize: 5,
      list: []
    };
  },
  methods: {
    loadList() {
      const request = {
        stu_id: this.$Cache.getCache("info", true)["id"],
        page: this.page,
        per_num: this.pageSize
      };
      this.$Service.unitChange(request).then(response => {
        if (response.code == 200) {
          const _list = response.data.data;

          this.list = [...this.list, ..._list];

          if (!_list.length) {
            /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            return;
          }

          /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");

          this.page++;
          this.loadList();
        }
      });
    },
    add() {
      this.$router.push("/unitForm");
    }
  },
  created() {
    const request = {
      stu_id: this.$Cache.getCache("info", true)["id"],
      page: this.page,
      per_num: this.pageSize
    };
    this.$Service.unitChange(request).then(response => {
      if (response.code == 200) {
        this.list = [];
        this.list = response.data.data;
      }
    });
  }
};
</script>

<style scoped>
.unitChange .btn-change {
  padding: 0.3rem;
}
.unitChange .btn {
  padding: 0.2rem 0.3rem;
  border-radius: 0.1rem;
  background-color: #04be02;
  color: #fff;
  border: none;
}
.unitChange .btn:active {
  background-color: lightgreen;
}
.unitChange-list {
  width: 96%;
  margin: 0.2rem auto 0;
  display: flex;
  flex-direction: column;
}
.unitChange-list li {
  width: 100%;
  padding: 0.3rem 0.6rem;
  margin-bottom: 10px;
  background-color: #fff;
}
</style>
