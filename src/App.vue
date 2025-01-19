<script setup>
import Calculator from './components/Calculator.vue'
</script>

<template>
  <div>
    <a href="" target="">
      <img src="https://www.aston.eu/wp-content/uploads/2023/08/Logo_astonitm.svg" class="logo" alt="Vue logo" />
    </a>
  </div>
  <Calculator />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  display: block;
  margin: auto;

}
.logo:hover {
  filter: drop-shadow(0 0 2em #0074d9);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
