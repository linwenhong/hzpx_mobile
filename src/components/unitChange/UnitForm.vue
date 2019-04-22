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
        <select slot="right" placeholder='请选择新单位' v-model="unitForm['new_com_id']">
          <!-- <option v-for="" value="1">公司1</option> -->
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">上传单位营业执照：</span>
        <yd-button slot="left" type="primary">上传</yd-button>
      </yd-cell-item>
    </yd-cell-group>
    <div class="mt-5">
      <yd-button size="large" type="primary" @click.native='confirm'>提交</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitForm",
  data() {
    return {
      unitForm: {},
      info: this.$Cache.getCache('info', true),
      oldUnit: ''
    };
  },
  methods: {
      confirm() {
          const request = {
            title: this.unitForm.title,
            old_com_id: this.info.company_id,
            new_com_id: this.info.new_com_id,
            approval_from: 1,
            approval_author: this.info.name
          }
          console.log(request)
      },
      getCompanyList() {
        this.$Service.company().then(res => {
          if(res.code == 200) {
            console.log(res)
          }
        })
      }
  },
  created() {
    this.getCompanyList()
  },
  mounted() {
    this.oldUnit = this.info['company_name']
  }
};
</script>

<style scoped>
.unitForm {
  width: 96%;
  margin: 0 auto;
  padding-top: 20%;
}

</style>
