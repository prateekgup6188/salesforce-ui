<template>
  <div :style="{marginTop: '25vh'}">
    <h1>{{ isRegistering ? 'Register' : 'Login' }}</h1>

    <!-- Toggle between Login and Register -->
    <button @click="toggleForm">
      {{ isRegistering ? 'Already have an account? Login' : 'Need an account? Register' }}
    </button>
    <br>
    <br>

    <!-- Login Form -->
    <form v-if="!isRegistering" @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <!-- Registration Form -->
    <form v-else @submit.prevent="register">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>

    <!-- Error Message -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isRegistering: false, // Toggle between login and registration
      error: '', // Store error messages
    };
  },
  methods: {
    // Toggle between login and registration forms
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.error = ''; // Clear error message
    },

    // Handle login
    async login() {
      try {
        const response = await this.$axios.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('login', response.data.token); // Store token
        this.$router.push('/dashboard'); // Redirect to dashboard
      } catch (error) {
        this.error = 'Login failed. Please check your credentials.';
      }
    },

    // Handle registration
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          email: this.email,
          password: this.password,
        });
        this.error = 'Registration successful! Please login.'; // Prompt user to login
        this.isRegistering = false; // Switch back to login form
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

/* Error message styling */
.error {
  color: red;
  margin-top: 10px;
}
</style>