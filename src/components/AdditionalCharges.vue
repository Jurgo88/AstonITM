<template>
    <label class="additional-charges">
      <h4>Additional Charges</h4>
      <div class="checkbox-container">
        <div class="checkbox-item" v-for="charge in charges" :key="charge.value">
          <span>{{ charge.label }}</span>
          <input 
            type="checkbox" 
            :value="charge.value" 
            :checked="selectedCharges.includes(charge.value)"
            @change="updateCharges($event)"
          />
        </div>
      </div>
    </label>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Props a emitované udalosti
  defineProps(['selectedCharges']);
  defineEmits(['update:selectedCharges']);
  

  const charges = [
    { label: 'Cancellation', value: 'cancellation' },
    { label: 'Sport Activities', value: 'sportActivities' },
  ];
  

  const updateCharges = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
  
    const updatedCharges = isChecked
      ? [...selectedCharges, value]
      : selectedCharges.filter((charge) => charge !== value);
  
    emit('update:selectedCharges', updatedCharges);
  };
  </script>
  
  <style scoped>
  .additional-charges {
    margin: 1rem 0;
  }
  .checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  </style>
  