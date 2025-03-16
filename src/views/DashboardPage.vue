<template>
  <div>
    <h1>Dashboard</h1>

    <!-- Spinner while loading -->
    <div v-if="loading" class="spinner">
      <div class="loader"></div>
    </div>

    <!-- Table to display accounts -->
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.Id">
          <td>{{ account.Id }}</td>
          <td>{{ account.Name }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Display message if no accounts are found -->
    <p v-if="!loading && accounts.length === 0">No accounts found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [], // Store fetched accounts
      loading: true, // Track loading state
    };
  },
  async created() {
    try {
      // Fetch accounts from the backend
      const response = await this.$axios.get('/api/salesforce/accounts', {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      });
      this.accounts = response.data;
    } catch (error) {
      alert('Failed to fetch accounts');
    } finally {
      this.loading = false; // Stop loading spinner
    }
  },
};
</script>

<style scoped>
/* Spinner styling */
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #42b983; /* Green */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #42b983;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>