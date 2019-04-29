<template>
  <div class="cert">
    <div>
      <div class="content">
        <div class="text-center">惠州市交通运输企业</div>
        <div class="text-center">主要负责人和安全生产管理人员安全生产考核</div>

        <h5 class="page-name">电子合格证</h5>

        <h5 class="title">
          证书编号：{{form.num_of_cert || '-'}}
          <span
            class="status"
          >证书状态：{{BeOverdue(form['validity_period'])}}</span>
        </h5>
        <table border>
          <tr>
            <td class="label">姓名</td>
            <td>{{form.name || '-'}}</td>
            <td class="label">性别</td>
            <td>{{form.sex || '-'}}</td>
          </tr>
          <tr>
            <td class="label">出生年月</td>
            <!-- <td>{{getBirthday(form.birthday)}}</td> -->
            <td>******</td>
            <td class="label">身份证号</td>
            <!-- <td>{{form.id_card || '-'}}</td> -->
            <td>******************</td>
          </tr>
          <tr>
            <td class="label">工作单位</td>
            <td colspan="3">{{form.unit || '-'}}</td>
          </tr>
          <tr>
            <td class="label">单位类别</td>
            <td
              colspan="3"
            >{{form.company && form.company.category_name ? form.company.category_name.name : '-'}}</td>
          </tr>
          <tr>
            <td class="label">单位职务</td>
            <td colspan="3">{{form.position || '-'}}</td>
          </tr>
        </table>

        <div v-for="(item, index) of form.cert" :key="item.id">
          <h5 class="title">培训情况登记(第{{index + 1}}次)</h5>
          <table border>
            <tr>
              <td class="label">工作单位</td>
              <td>{{form.unit || '-'}}</td>
            </tr>
            <tr>
              <td class="label">单位类别</td>
              <td>{{form.company && form.company.category_name ? form.company.category_name.name : '-'}}</td>
            </tr>
            <tr>
              <td class="label">单位职务</td>
              <td>{{form.position || '-'}}</td>
            </tr>
            <tr>
              <td class="label">培训时间</td>
              <td>{{getTime(item)}}</td>
            </tr>
            <tr>
              <td class="label">培训机构名称</td>
              <td>惠州市交通运输职业培训学校</td>
            </tr>
          </table>
        </div>

        <div class="text-right">本证有效期至 {{form['validity_period']}}</div>

        <div class="user">
          <h5 class="title">持证人电子二维码</h5>
          <img :src="$Config.file_url + form.qr_code">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Certificate",
  data() {
    return {
      id: this.$route.query["id"],
      list: [],
      form: {}
    };
  },
  methods: {
    getList() {
      this.$Service.cert(this.id).then(res => {
        if (res.code == 200) {
          this.list = [];
          this.form = {};
          this.list = res.data.cert;
          this.form = res.data;
        }
      });
    },
    getTime(item) {
      let time = null;
      if (item.start_time && item.end_time) {
        time = item.start_time + "至" + item.end_time;
      } else {
        time = "-";
      }
      return time;
    },
    getBirthday(val) {
      if (val) {
        return val.substring(0, 4) + "年" + val.substring(5, 6) + "月";
      } else {
        return "-";
      }
    },
    BeOverdue(val) {
      if (val) {
        if (new Date(val).getTime() >= new Date().getTime()) {
          return "正常";
        } else {
          return "过期";
        }
      } else {
        return "-";
      }
    }
  }
};
</script>

<style scoped>
.content {
  width: 7rem;
  margin: 0 auto;
  padding-top: 0.2rem;
}
.page-name {
  margin: 0.2rem 0;
  font-size: 0.5rem;
  text-align: center;
}
.content .title {
  margin: 0.1rem;
  font-size: 0.3rem;
}
.content .title .status {
  float: right;
}
.content table {
  width: 100%;
  margin-bottom: 0.2rem;
  text-align: center;
}
.content table td {
  padding: 0.05rem;
}
.content table td.label {
  width: 1.5rem;
}

.content .user .title {
  float: left;
}
.content .user img {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  margin-top: 0.2rem;
  background-size: 100%;
}
</style>
