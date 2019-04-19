<template>
  <div class="unitChange">
      <div class='btn-change'>
           <button class="btn" @click.prevent='add'>新增单位变更</button>
      </div>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <ul slot='list' class='unitChange-list'>
            <li v-for="item of list" :key='item.id'>{{item.title}}</li>
        </ul>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

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
      pageSize: 10,
      list: [
        {
          title: "标题标题标题标题标题",
          marketprice: 56.23,
          productprice: 89.36
        },
        {
          title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫",
          marketprice: 56.23,
          productprice: 89.36
        },
        {
          title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖",
          marketprice: 56.23,
          productprice: 89.36
        },
        {
          title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫",
          marketprice: 56.23,
          productprice: 89.36
        },
        {
          title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服",
          marketprice: 56.23,
          productprice: 89.36
        },
        {
          title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男",
          marketprice: 56.23,
          productprice: 89.36
        }
      ]
    };
  },
  methods: {
    loadList() {
      this.$http
        .jsonp("http://list.ydui.org/getdata.php?type=backposition", {
          params: {
            page: this.page,
            pagesize: this.pageSize
          }
        })
        .then(function(response) {
          const _list = response.body;

          this.list = [...this.list, ..._list];

          if (_list.length < this.pageSize || this.page == 3) {
            /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            return;
          }

          /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");

          this.page++;
        });
    },
    add() {
        this.$router.push('/unitForm')
    }
  },
  created() {}
};
</script>

<style scoped>
.unitChange .btn-change{
    padding: .3rem;
}
.unitChange .btn{
    padding: .2rem .3rem;
    border-radius: .1rem;
    background-color: rgb(159, 243, 23);
    color: #fff;
    border: none
}
.unitChange .btn:active{
    background-color: lightgreen;
}
.unitChange-list{
    width: 96%;
    margin: .2rem auto 0;
    display: flex;
    flex-direction: column;
}
.unitChange-list li{
    width: 100%;
    padding: .3rem .6rem;
    margin-bottom: 10px;
    background-color: #fff;
}
</style>
