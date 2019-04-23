<template>
  <div class="certificate">
    <div class='cert-box' v-for="item of list" :key="item.id">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">工作单位:</span>
          <span slot="right">{{form['unit'] || '--'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">单位类别 :</span>
          <span slot="right">{{form.company.category_name ? form.company.category_name.name : '--'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">单位职务 :</span>
          <span slot="right">{{form.position || '--'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">培训时间:</span>
          <span slot="right">{{item.start_time + '至' + item.end_time || '-'}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">培训机构名称:</span>
          <span slot="right"></span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Certificate",
  data() {
    return {
      info: this.$Cache.getCache("info", true),
      list: [],
      form: {}
    };
  },
  methods: {
    getList() {
      this.$Service.cert(this.info.id).then(res => {
        if (res.code == 200) {
          this.list = [];
          this.form = {};
          this.list = res.data.cert;
          this.form = res.data;
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.cert-box{
  width: 96%;
  margin: .5rem auto 0
}
</style>
