<template>
    <label class="number-of-persons">
      <h4>Number of Persons</h4>
      <div class="persons-row">
        <span v-for="person in max" :key="person">{{ person }}</span>
      </div>
  
      <input 
        type="range" 
        :value="numOfPersons" 
        @input="$emit('update:numOfPersons', $event.target.value)" 
        :min="min" 
        :max="max" 
        required 
      />

      <div> {{numOfPersons > 1 ? 'Persons' : 'Person' }} : {{ numOfPersons }}</div>
    </label>
  </template>
  
  <script setup>
  defineProps(['numOfPersons', 'min', 'max']);
  defineEmits(['update:numOfPersons']);
  </script>
  
  <style scoped>
  .number-of-persons {
    margin: 1rem 0;
  }
  .persons-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  </style>
  