<template>
  <div>
    <h1>Home page</h1>
    <hr/>
    <button class="btn get back" @click="goHome">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle-fill" fill="currentColor"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
      </svg>
      Go Home
    </button>

    <button v-if="currentUser" class="btn get" @click="goToTodos"> Todo list
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle-fill" fill="currentColor"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z"/>
      </svg>
    </button>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus"/>
          Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt"/>
          Login
        </router-link>
      </li>
    </div>
    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavigationBar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    goToTodos() {
      this.$router.push('/todos')
    },
    goHome() {
      this.$router.push('/')
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.get {
  color: #ffc201;
  font-size: x-large;
}
.nav-link{
  color: #8ac9ea;
  font-size: x-large;
}
.navbar-nav{
  color:#8ac9ea;
  font-size: x-large;
}
</style>