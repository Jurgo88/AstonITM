<template>
    <div class="insurance-card">
      <form @submit.prevent="submitForm" @reset="resetForm">

        <InsuranceTypeSelector v-model:insuranceType="insuranceType" />

        <DatePicker 
          v-model:periodStart="periodStart" 
          v-model:periodEnd="periodEnd" 
          v-model:numOfDays="numOfDays" 
          v-model:insuranceType="insuranceType"
        />

        <InsurancePackageSelector v-model:packageType="packageType" />

        <div v-if="packageType && insuranceType" class="price-info">
            Price for one person: 
        <strong class="price-display">
            <span class="currency">€</span>
            <span class="amount">{{ insuranceType ==='shortTerm' ? rates[insuranceType][packageType].toFixed(2) : rates[insuranceType][packageType] }}</span>
            <span class="period">/{{ insuranceType === 'shortTerm' ? 'day' : 'yr' }}</span>
        </strong>
        </div>

        <br>

        <AdditionalCharges v-model:selectedCharges="additionalCharges" />   

        <NumberOfPersons 
            :numOfPersons="numOfPersons" 
            :min="1" 
            :max="3" 
            @update:numOfPersons="numOfPersons = $event" 
        />
        
        <button type="submit" :disabled="isCalculateDisabled" > {{submitButtonText}}</button>
        <br><hr>
        <button type="reset">Reset</button>

      </form>
  
      <div class="price-info" v-if="errors.length === 0">
        <p>Total Price: <strong> {{ totalPrice ? totalPrice.toFixed(2) : '0.00' }} € </strong></p>
      </div>
      <div class="errors" v-if="errors.length">
        <h4>Errors:</h4>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>
  </template>
  
<script setup>
    import { useInsuranceStore } from '../stores/insuranceStore';
    import { storeToRefs } from 'pinia';
    import { watch, computed } from 'vue';
    import { rates, chargeRates } from '../data/rates';
    import InsuranceTypeSelector from './InsuranceTypeSelector.vue';
    import InsurancePackageSelector from './InsurancePackageSelector.vue';
    import AdditionalCharges from './AdditionalCharges.vue';
    import DatePicker from './DatePicker.vue';
    import NumberOfPersons from './NumberOfPersons.vue';

    //import syle calculator.css
    import '../assets/calculator.css';

    const store = useInsuranceStore();
    const { insuranceType, periodStart, periodEnd, packageType, additionalCharges, numOfPersons, numOfDays, totalPrice, errors } = storeToRefs(store);

   
    const submitButtonText = computed(() => isCalculateDisabled.value ? 'Fill all inputs' : 'Create Offer');

    const isCalculateDisabled = computed(() => {
        const isRequiredFilled = insuranceType.value && packageType.value && periodStart.value && numOfPersons.value >= 1;

        if (insuranceType.value === 'shortTerm') {
            return !isRequiredFilled || !periodEnd.value;
        }

        return !isRequiredFilled;

    });

    const submitForm = () => {
        if (store.validateInputs()) {
            alert('Offer created');
            resetForm();
        }
    };

    const resetForm = () => {
        store.resetForm();
    };


    watch(
        [insuranceType, periodStart, periodEnd, packageType, additionalCharges, numOfPersons, totalPrice],
        () => {
                if (!isCalculateDisabled.value) {
                    store.calculateTotalPrice();
                }
                else {
                    store.totalPrice = null;
                }
            },
        { deep: true }
    );
</script>
  

  

<style>

</style>

  