<template>
  <div class="notice">
      <div class='trainInfo card'>
          examInfo
      </div>
      <div class='examInfo card'>
          examInfo
      </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.notice{
    display: flex;
    flex-direction: column;
}
.notice .card{
    width: 96%;
    height: 4rem;
    padding: 0.3rem 0;
    background-color: #fff;
    margin: 0.1rem auto;
    border-radius: 6px;
}
</style>
