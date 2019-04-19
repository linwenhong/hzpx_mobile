<template>
  <div class="unitForm">
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">申请标题：</span>
        <yd-input slot="right" v-model="unitForm['title']" placeholder="请输入申请标题"/>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">旧单位：</span>
        <yd-input slot="right" v-model="oldUnit" :show-clear-icon="false" readonly/>
      </yd-cell-item>
      <yd-cell-item arrow type="label">
        <span slot="left">新单位：</span>
        <select slot="right">
          <option value>请选择新单位</option>
          <option value="1">公司1</option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">上传单位营业执照：</span>
        <yd-button slot="left" type="primary">上传</yd-button>
      </yd-cell-item>
    </yd-cell-group>
    <div class="mt-5">
      <yd-button size="large" type="primary" @click.prevent='confirm'>提交</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitForm",
  data() {
    return {
      unitForm: {},
      oldUnit: "统计局"
    };
  },
  methods: {
      confirm() {
          console.log(this.unitForm)
      }
  }
};
</script>

<style scoped>
.unitForm {
  width: 96%;
  margin: 0 auto;
  padding-top: 20%;
}
.mt-5 {
  margin-top: 0.5rem;
}
</style>
