<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.fixed-bottom {
  position: fixed;
  bottom: 0;
}
.text-center {
  text-align: center;
}
.demo-icon {
  color: #606266;
  margin: 0 20px;
  font-size: 2em;
  vertical-align: middle;
}
</style>
