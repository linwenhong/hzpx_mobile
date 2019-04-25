<template>
  <div class="myInfo">
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">姓名:</span>
        <span slot="right">{{info.name}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性别:</span>
        <span slot="right">{{info.sex}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证信息:</span>
        <span slot="right">{{info.id_card}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">所在单位:</span>
        <span slot="right">{{info.company.name}}</span>
      </yd-cell-item>
            <yd-cell-item>
        <span slot="left">单位职务:</span>
        <span slot="right">{{info.position || '-'}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">考核类别:</span>
        <span slot="right">{{info.application_type | ApplicationType}}</span>
      </yd-cell-item>
      
    </yd-cell-group>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  data() {
    return {
      info: this.$Cache.getCache("info", true)
    };
  }
};
</script>

<style scoped>
/deep/  .yd-cell-right {
  color: #888;
}
</style>
