<template>
  <div class="unitForm">
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">申请标题：</span>
        <yd-input slot="right" v-model="unitForm['title']" placeholder="请输入申请标题"/>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">旧单位：</span>
        <yd-input slot="right" v-model="info.company.name" :show-clear-icon="false" readonly/>
      </yd-cell-item>
      <yd-cell-item arrow type="label">
        <span slot="left">新单位：</span>
        <select slot="right" placeholder="请选择新单位" v-model="unitForm['new_com_id']">
          <option v-for="item of companyList" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
      </yd-cell-item>
      <hr style="margin: 0 0.24rem; color: #222">
      <yd-cell-item class="upload">
        <span class="label" slot="left">上传单位营业执照：</span>

        <a href="javascript:;" class="file" slot="left" v-if="!imgUrl">
          <input
            ref="file"
            type="file"
            id="fileUp"
            accept="image/png, image/jpeg"
            capture="camera"
            multiple="false"
            @change="upload($event)"
          >
        </a>
        <yd-lightbox slot="left" v-else>
          <yd-lightbox-img :src="api_url + imgUrl" style="width: 2rem; height: 2rem"></yd-lightbox-img>
        </yd-lightbox>
      </yd-cell-item>
    </yd-cell-group>
    <div class="mt-5">
      <yd-button size="large" type="primary" @click.native="confirm">提交</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitForm",
  data() {
    return {
      unitForm: {},
      info: this.$Cache.getCache("info", true),
      oldUnit: "",
      companyList: [],
      imagefile: "",
      imgShow: false,
      imgUrl: "",
      api_url: this.$Config.file_url
    };
  },
  methods: {
    confirm() {
      if (!this.unitForm.title) {
        this.$dialog.toast({
          mes: "请填写申请标题",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (!this.unitForm.new_com_id) {
        this.$dialog.toast({
          mes: "请选择新单位",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (!this.imgUrl) {
        this.$dialog.toast({
          mes: "请上传图片",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      const request = {
        title: this.unitForm.title,
        old_com_id: this.info.company_id,
        new_com_id: this.unitForm.new_com_id,
        change_file: this.imgUrl,
        student_id: this.info.id,
        approval_from: 1,
        approval_author: this.info.name
      };
      this.$dialog.confirm({
        title: "确认提交审批?",
        mes: "确认后不能修改",
        opts: () => {
          this.$Service.addUnitChange(request).then(res => {
            if (res.code == 200) {
              this.$dialog.toast({
                mes: "提交成功",
                timeout: 1000,
                icon: "success"
              });
              setTimeout(() => {
                this.$router.push("/unitChange");
              }, 2000);
            }
          });
        }
      });
    },
    getCompanyList() {
      this.$Service.company().then(res => {
        if (res.code == 200) {
          this.companyList = [];
          this.companyList = res.data.data.filter(
            item => item.id != this.info.company_id
          );
        }
      });
    },
    upload(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      let formData = new FormData();
      formData.append("images", this.$refs["file"].files[0]);
      this.$Service.images(formData).then(res => {
        if (res.code == 200) {
          this.imgUrl = res.data;
        }
      });
    }
  },
  created() {
    this.getCompanyList();
  },
  mounted() {
    this.oldUnit = this.info["company_name"];
  }
};
</script>

<style scoped>
.unitForm {
  width: 96%;
  margin: 0.2rem auto 0;
}

.upload .label {
  margin-top: -1rem;
}

.file {
  position: relative;
  width: 1rem;
  height: 1rem;
  background-image: url("/static/images/add.png");
  background-size: 100%;
  margin: 1rem 0 0.5rem 0.5rem;
}
#fileUp {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
