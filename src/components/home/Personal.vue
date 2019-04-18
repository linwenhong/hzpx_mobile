<template>
  <div class="personal">
    <div class="info">
         <span><img src="../../assets/images/person.png" height="28" width="28" alt="author-img"></span>
         <span>user</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {};
  }
};
</script>

<style scoped>
.personal{
    display: flex;
    flex-direction: column;
}
.info{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    margin: 10px auto;
    padding: 0.3rem
}
.info span{
}
</style>
