<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
}
html{
  height: 100%;
  overflow-y: scroll;
}
body{
  height: 100%;
  min-width: 1250px;
  min-height: 700px;
}
#app{
  width: 100%;
  height: 100%;
}

</style>