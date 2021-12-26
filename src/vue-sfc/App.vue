<template>
  <h2 class="title">{{ msg }}</h2>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello Vue!",
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  color: red;
}
</style>
