<template>
    <label>
      <h4>Package</h4>
      <select :value="packageType" @change="$emit('update:packageType', $event.target.value)"  required>
        <option value="basic">Basic</option>
        <option value="extended">Extended</option>
        <option value="extra">Extra</option>
      </select>
    </label>
  </template>
  
  <script setup>
    defineProps(['packageType']);
    defineEmits(['update:packageType']);
  </script>