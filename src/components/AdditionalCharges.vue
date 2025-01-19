<template>
    <div class="additional-charges">
        <h4>Additional Charges</h4>
        <div class="checkbox-container">
        <div class="checkbox-item" v-for="(charge, index) in charges" :key="charge.value">
            <span>{{ charge.label }}</span>
            <input 
            type="checkbox" 
            :value="charge.value" 
            :checked="isChecked(charge.value)"
            @change="updateCharges($event)"
            />
        </div>
        </div>
    </div>
</template>
  
<script setup>
    import { defineProps, defineEmits } from 'vue';
  
    const props = defineProps({
        selectedCharges: {
        type: Array,
        required: true
        }
    });
    const emit = defineEmits(['update:selectedCharges']);
    
    const charges = [
        { label: 'Cancellation', value: 'cancellation' },
        { label: 'Sport Activities', value: 'sportActivities' },
    ];
    
    // Funkcia na kontrolu, či je poplatok zaškrtnutý
    const isChecked = (value) => {
        return props.selectedCharges.includes(value);
    };
    
    const updateCharges = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        const updatedCharges = isChecked
        ? [...props.selectedCharges, value]
        : props.selectedCharges.filter(charge => charge !== value);
    
        emit('update:selectedCharges', updatedCharges);
    };
</script>

<style scoped>
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
  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
  }
</style>
  