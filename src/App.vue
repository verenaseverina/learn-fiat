<template>
  <div id="app">
    <input>
    <button @click="checkBill">CHECK BILL</button>
  </div>
</template>

<script>

export default {
  name: 'Test App',
  methods: {
    checkBill () {
      console.log('check bill')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
