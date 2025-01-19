<template>
    <label>
      <h4>Insurance Type</h4>
      <select 
        :value="insuranceType" 
        @change="$emit('update:insuranceType', $event.target.value)" 
        required 
        autofocus
      >
        <option value="shortTerm">Short Term Insurance</option>
        <option value="annual">Annual Insurance</option>
      </select>
    </label>

    <div v-if="packageType && insuranceType" class="price-info">
            Price for one person: 
        <strong class="price-display">
            <span class="currency">€</span>
            <span class="amount">{{ insuranceType ==='shortTerm' ? rates[insuranceType][packageType].toFixed(2) : rates[insuranceType][packageType] }}</span>
            <span class="period">/{{ insuranceType === 'shortTerm' ? 'day' : 'yr' }}</span>
        </strong>
        </div>

  </template>
  
  <script setup>
  defineProps(['insuranceType']);
  defineEmits(['update:insuranceType']);
  </script>
  