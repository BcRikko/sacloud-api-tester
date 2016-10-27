<template>
  <nav class="navbar">
    <div class="sidemenu">
      <ul class="list-group">
        <router-link tag="li" to="/" exact class="sidemenu__icon list-group-item glyphicon glyphicon-home"></router-link>
        <router-link tag="li" to="/history" class="sidemenu__icon list-group-item glyphicon glyphicon-time"></router-link>
      </ul>
    </div>
    <router-view class="sidebar col-sm-10" :apiList="apiList"></router-view>
  </nav>
</template>

<style scoped>
.sidemenu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  width: 60px;
  overflow: hidden;
}

.sidemenu__icon {
  display: block;
  width: 60px;
  height: 60px;
  font-size: 24px;
  text-align: center;

  margin: 10px auto;

  cursor: pointer;
  border: none;
}
.sidemenu__icon:hover {
  color: #337AB7;
}
.sidemenu__icon.active:hover {
  color: #fff;
}

.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 65px;
  overflow-x: hidden;
  overflow-y: auto
}
</style>

<script>
export default {
  props: ['apiList']
}
</script>
