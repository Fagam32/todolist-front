<template>
  <div id="app" class="col ">

    <contaner class="col ">
    <h1>ToDoApp</h1>
    <p><img src="/767ca771755f4675d4063c03e17c8595-medical-checklist-icon-by-vexels.png" height="150" width="150" ></p>
   <hr>
        <div class="row">
          <div class="col-lg-3  ">
            <TopNavigationBar></TopNavigationBar>
              <div style ="height: 100px" >
              </div>
             </div>
          <div>
            <router-view />
          </div>
        </div>
      </contaner>
  </div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
}
.todos{
  background: #40A651;
}
.col{
    background: #40A651;
   }
</style>
<script>
import TopNavigationBar from "@/components/TopNavigationBar";
export default {
  components: {TopNavigationBar}
}
</script>