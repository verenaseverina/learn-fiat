<template>
  <div id="app">
    <h1>FIAT</h1>
    <f-btn-wrapper>
      <f-btn type="primary" size="large">
        Button Text Here
      </f-btn>
    </f-btn-wrapper>
  </div>
</template>

<script>
import { FBtn, FBtnWrapper } from '@dana/fiat'
export default {
  name: 'App',
  methods: {
    checkBill () {
      console.log('check bill')
    },
  },
  components: {
    FBtn,
    FBtnWrapper
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
