<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../layout/Header.vue';
import Footer from '../layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #5a5a5a;
  margin-top: 15px;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 90px;
  border-radius: 15px;
}
</style>
