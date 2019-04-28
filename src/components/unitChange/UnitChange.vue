<template>
  <div class="unitChange">
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
      <span v-if="total == 0" slot="doneTip">暂无数据</span>
      <span v-if="total > 0" slot="doneTip">已全部展示</span>

      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg">
    </yd-infinitescroll>

    <div class="hide-content">
      <yd-button size="large" type="primary">新增单位变更</yd-button>
    </div>
    <div class="fixed-footer">
      <yd-button size="large" type="primary" @click.native="add">新增单位变更</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitChange",
  data() {
    return {
      page: 1,
      pageSize: 8,
      total: 0,
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
          this.total = response.data.total

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
        }
      });
    },
    add() {
      this.$router.push("/unitForm");
    }
  },
  created() {
    this.loadList();
  }
};
</script>

<style scoped>
/deep/ .yd-cell {
  margin: 0.3rem 0.24rem 0;
  background-color: #fff;
  border-radius: 0.15rem;
}
</style>
