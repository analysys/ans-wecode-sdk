<template>
  <div id="app">
    <el-container>
      <el-header>
        <h3>JS SDK 接入Demo</h3>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {};
  },
  created () {
  }
};
</script>
