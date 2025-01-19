<template>
    <div>
      <label>
        <h4>Period Start</h4>
        <input type="date" :value="periodStart" @input="updatePeriodStart($event.target.value)" required />
      </label>
      <label v-if="insuranceType === 'shortTerm'">
        <h4>Period End</h4>
        <input type="date" :value="periodEnd" @input="updatePeriodEnd($event.target.value)" required />
      </label>
      <div v-if="insuranceType === 'shortTerm'" class="price-info">
        Number of days: <strong>{{ numOfDays }}</strong>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    insuranceType: String,
    periodStart: String,
    periodEnd: String,
    numOfDays: Number
  });
  
  const emit = defineEmits(['update:periodStart', 'update:periodEnd']);
  
  const updatePeriodStart = (newValue) => {
    emit('update:periodStart', newValue);
  };
  
  const updatePeriodEnd = (newValue) => {
    emit('update:periodEnd', newValue);
  };
  </script>
  