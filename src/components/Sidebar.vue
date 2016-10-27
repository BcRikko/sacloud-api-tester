<template>
  <nav class="navbar">
    <div class="sidemenu">
      <ul class="list-group">
        <router-link tag="li" to="/" exact class="sidemenu__icon list-group-item glyphicon glyphicon-home"></router-link>
        <router-link tag="li" to="/history" class="sidemenu__icon list-group-item glyphicon glyphicon-time"></router-link>
      </ul>
    </div>
    <router-view class="sidebar" :apiList="apiList"></router-view>
  </nav>
</template>

<style scoped>
.sidemenu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  overflow: hidden;
}

.sidemenu__icon {
  display: block;
  width: 60px;
  height: 60px;
  font-size: 24px;
  text-align: center;

  cursor: pointer;
  border: none;
}
.sidemenu__icon:hover {
  color: #337AB7;
}

.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 60px;
  width: 80%;
  overflow-x: hidden;
  overflow-y: auto
}
</style>

<script>
export default {
  props: ['apiList']
}
</script>
