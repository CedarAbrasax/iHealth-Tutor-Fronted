<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDoctorName: null,
    };
  },
};
</script>

<style scoped>
.page-box {
  /* background-color:rgba(0,31,63,0.8); */
}
</style>
