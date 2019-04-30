<template>
  <div>
    <yd-layout>
      <yd-navbar v-if="tabIndex == 1" slot="navbar" :title="`练题(${doCount}/${topicsCount})`">
        <router-link to="/home/exercises" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
      </yd-navbar>

      <yd-navbar v-if="tabIndex == 2" slot="navbar" :title="`错题本(${errorCount})`">
        <router-link to="/home/exercises" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
      </yd-navbar>

      <div v-if="!loading && topicDetails.id" class="page-content">
        <div class="title">
          <p>
            <yd-button
              class="type"
              size="mini"
              type="primary"
              shape="circle"
            >{{ topicDetails.type | QuestionType }}</yd-button>
            {{ topicDetails.title }}
          </p>

          <yd-lightbox>
            <yd-lightbox-img
              v-for="path in topicDetails.topic_imgs"
              :key="path"
              :src="$Config.file_url + path"
            ></yd-lightbox-img>
          </yd-lightbox>

          <div v-if="topicDetails.topic_vedio">
            <video width="100%" :src="$Config.file_url + topicDetails.topic_vedio" controls></video>
          </div>
        </div>

        <div v-if="topicDetails.type != 2">
          <yd-radio-group v-model="answer[0]">
            <div
              class="answer-option"
              v-for="option in topicDetails.topic_options"
              :key="option.id"
            >
              <yd-radio :val="option.value">{{ option.value }}. {{ option.option }}</yd-radio>
            </div>
          </yd-radio-group>
        </div>

        <div v-if="topicDetails.type == 2">
          <yd-checkbox-group v-model="answer">
            <div
              class="answer-option"
              v-for="option in topicDetails.topic_options"
              :key="option.id"
            >
              <yd-checkbox :val="option.value">{{ option.value }}. {{ option.option }}</yd-checkbox>
            </div>
          </yd-checkbox-group>
        </div>

        <div class="submit-result" v-if="submitAnswer">
          <p>
            提交答案：
            <template v-if="submitAnswer == topicDetails.answer">
              {{ submitAnswer }}
              <yd-icon name="checkoff"></yd-icon>
            </template>
            <template v-if="submitAnswer != topicDetails.answer">
              {{ submitAnswer }}
              <yd-icon name="error"></yd-icon>
            </template>
          </p>
          <p>正确答案：{{ topicDetails.answer }}</p>
        </div>

        <div class="submit" v-if="topics && topics[0]">
          <yd-button v-if="!submitAnswer" type="primary" @click.native="submit" size="large">提交</yd-button>
          <yd-button v-if="submitAnswer" type="primary" @click.native="next" size="large">下一题</yd-button>
        </div>
      </div>
    </yd-layout>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Question",
  data() {
    return {
      loading: true, // 是否数据加载中
      userInfo: this.$Cache.getCache("info", true),
      public: this.$route.query["public"] == 1 ? 1 : 2, // 1公共题 2专业题
      tabIndex: this.$route.query["tabIndex"] == 2 ? 2 : 1, // 1顺序练题, 2错题本
      topicsCount: 0, // 题目总数
      doCount: 0, // 已做条数
      errorCount: 0, // 错题条数
      topics: [], // 题目列表
      topicDetails: {}, // 题目详情
      topicIndex: 0, // 当前题目详情于列表的下标
      answer: [], // 勾选的答案
      submitAnswer: "" // 提交的答案
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.tabIndex = this.$route.query["tabIndex"] == 2 ? 2 : 1;
        this.public = this.$route.query["public"] == 1 ? 1 : 2;
        this.getTopics();
      },
      deep: true
    }
  },
  methods: {
    dataInit() {
      this.topics = [];
      this.topicDetails = {};
      this.topicIndex = 0;
      this.answer = [];
      this.submitAnswer = "";
    },
    selectType(type) {
      if (this.tabIndex == type) return;
      this.$router.push(
        "/question?public=" + this.public + "&tabIndex=" + type
      );
      this.tabIndex = type;
      this.getTopics();
    },
    getTopics() {
      this.dataInit();
      this.loading = true;
      this.$dialog.loading.open("loading...");
      const request = {
        student_id: this.userInfo.id,
        category_id: this.public == 1 ? 0 : this.userInfo.company.category,
        per_num: 50 // 单次获取题目数量
      };
      if (this.tabIndex == 2) {
        // 错题本
        this.$Service.getWrongTopics(request).then(response => {
          this.loading = false;
          this.$dialog.loading.close();
          if (response.code == 200) {
            const hasTopic =
              response.data.topics && response.data.topics[0] ? true : false;
            this.topics = hasTopic ? response.data.topics : [];
            this.errorCount = response.data.num;
            this.$Cache.set("topics", this.topics, true);
            this.$Cache.set("topicsCount", this.topicsCount);
            this.$Cache.set("errorCount", this.errorCount);
            if (hasTopic) this.getTopicDetails(0);
          } else {
            this.$dialog.toast({
              mes: response.msg,
              timeout: 1500,
              icon: "error"
            });
          }
        });
      } else {
        // 练题
        this.$Service.getTopics(request).then(response => {
          this.loading = false;
          this.$dialog.loading.close();
          if (response.code == 200) {
            const hasTopic =
              response.data.topics && response.data.topics[0] ? true : false;
            this.topics = hasTopic ? response.data.topics : [];
            this.topicsCount = response.data.num;
            this.doCount = response.data.do_num;
            this.$Cache.set("topics", this.topics, true);
            this.$Cache.set("topicsCount", this.topicsCount);
            this.$Cache.set("doCount", this.doCount);
            if (hasTopic) this.getTopicDetails(0);
          } else {
            this.$dialog.toast({
              mes: response.msg,
              timeout: 1500,
              icon: "error"
            });
          }
        });
      }
    },
    getTopicDetails(index) {
      if (this.$Cache.get("topicCompleted")) {
        index = Number(index) + 1;
        this.$Cache.clear(["topicCompleted"]);
      }
      if (parseInt(index) !== Number(index) || index >= this.topics.length) {
        this.getTopics();
        return;
      }
      index = Number(index);
      this.topicDetails = this.topics[index];
      this.topicIndex = index;
      this.$Cache.set("topicIndex", index);
      this.topicDetails.topic_options.map((option, index) => {
        switch (index) {
          case 0:
            option["value"] = "A";
            break;
          case 1:
            option["value"] = "B";
            break;
          case 2:
            option["value"] = "C";
            break;
          case 3:
            option["value"] = "D";
            break;
          case 4:
            option["value"] = "E";
            break;
        }
      });
    },
    next() {
      this.answer = [];
      this.submitAnswer = "";
      this.$Cache.clear(["topicCompleted"]);
      if (this.topicIndex < this.topics.length - 1) {
        this.getTopicDetails(Number(this.topicIndex) + 1);
      } else {
        this.getTopics();
      }
    },
    submit() {
      if (!this.answer[0]) {
        this.$dialog.toast({ mes: "请选择答案！", timeout: 1500 });
        return;
      }
      this.submitAnswer = "";
      this.answer.sort().map(val => (this.submitAnswer += val));
      this.$Cache.set("topicCompleted", true);

      if (this.tabIndex == 2) {
        if (this.submitAnswer == this.topicDetails.answer) {
          this.errorCount--;
          this.$Cache.set("errorCount", this.errorCount);
        }

        this.$Service
          .doWrongTopic({
            student_id: this.userInfo.id,
            topic_id: this.topicDetails.id,
            answer: this.submitAnswer
          })
          .then(response => {
            if (response.code != 200) {
              this.$dialog.toast({
                mes: response.msg,
                timeout: 1500,
                icon: "error"
              });
            }
          });
      } else {
        this.doCount++;
        this.$Cache.set("doCount", this.doCount);

        this.$Service
          .doTopic({
            student_id: this.userInfo.id,
            topic_id: this.topicDetails.id,
            answer: this.submitAnswer
          })
          .then(response => {
            if (response.code != 200) {
              this.$dialog.toast({
                mes: response.msg,
                timeout: 1500,
                icon: "error"
              });
            }
          });
      }
    }
  },
  destroyed() {
    this.$Cache.clear([
      "topics",
      "topicIndex",
      "topicCompleted",
      "doCount",
      "topicsCount",
      "errorCount"
    ]);
  },
  created() {
    this.doCount = this.$Cache.get("doCount") || 0;
    this.topicsCount = this.$Cache.get("topicsCount") || 0;
    this.errorCount = this.$Cache.get("errorCount") || 0;
    const topics = this.$Cache.get("topics", true);
    const topicIndex = this.$Cache.get("topicIndex");
    if (topics && topicIndex) {
      this.loading = false;
      this.topics = topics;
      this.getTopicDetails(topicIndex);
    } else {
      this.getTopics();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  padding: 0.2rem;
  text-align: left;
}
.title p {
  font-size: 0.3rem;
}
.title img {
  width: 3.2rem;
  margin-right: 0.2rem;
}
.answer-option {
  text-align: left;
  margin: 0.2rem;
}
.submit {
  width: 2rem;
  margin: 0 auto;
}
.submit-result {
  padding: 0.2rem;
}
.submit-result p {
  margin-bottom: 0.1rem;
  font-size: 0.3rem;
}
.submit-result >>> i {
  font-size: 0.3rem !important;
}
.submit-result >>> .yd-icon-error {
  color: rgb(255, 104, 93);
}
.submit-result >>> .yd-icon-checkoff {
  color: #04be02;
}
.type {
  font-size: 0.2rem;
  margin-right: 0.1rem;
  height: 0.35rem;
  line-height: 0.35rem;
  margin-top: -0.1rem;
}
</style>
