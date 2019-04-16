<template>
  <div>
    <div class="title">
      <p>{{ question.title }}</p>

      <yd-lightbox>
        <yd-lightbox-img v-for="item, key in question.topic_imgs" :key="key" :src="item.src"></yd-lightbox-img>
      </yd-lightbox>

      <div v-if="question.topic_vedio">
        <video width="100%" :src="$Config.api_url + question.topic_vedio" controls></video>
      </div>
    </div>

    <div v-if="question.type != 2">
      <yd-radio-group v-model="answer[0]">
        <div class="answer-option" v-for="option in answerOptions">
          <yd-radio :val="option.val">{{ option.val }}. {{ option.label }}</yd-radio>
        </div>
      </yd-radio-group>
    </div>

    <div v-if="question.type == 2">
      <yd-checkbox-group v-model="answer">
        <div class="answer-option" v-for="option in answerOptions">
          <yd-checkbox :val="option.val">{{ option.val }}. {{ option.label }}</yd-checkbox>
        </div>
      </yd-checkbox-group>
    </div>

    <div class="submit">
      <yd-button type="primary" @click.native="submit()" size="large">下一题</yd-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Question',
  data () {
    return {
      question: {
        title: '在没有中心线的道路上发现后车发出超车信号时，如果条件许可如何行驶？',
        type: 2, // 1单选 2多选 3判断
        topic_imgs: [
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s1.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s2.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s3.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s4.jpg'}
        ]
      },
      answer: [],
      answerOptions: [
        { val: 'A', label: '保持原状态行驶' },
        { val: 'B', label: '迅速停车让行' },
        { val: 'C', label: '加速行驶' },
        { val: 'D', label: '降速靠右让路' }
      ]
    }
  },
  methods: {
    submit () {
      if (!this.answer[0]) {
        this.$dialog.toast({ mes: '请选择答案！', timeout: 1500 });
        return
      }
      let answer = '';
      this.answer.sort().map(val => answer+= val);
      console.log(answer)
    }
  },
  created () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    padding: 0.2rem;
    text-align: left;
  }
  .title p {
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
  }
  .title img {
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
</style>
