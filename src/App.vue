<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav v-if="$route.path !== '/login'">
      <button @click="logout">Logout</button>
    </nav>

    <!-- Router View to Render Components -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.dispatch('logout'); // Clear the token from the store
      this.$router.push('/login'); // Redirect to the login page
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}
</style>