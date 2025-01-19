<template>
    <div class="insurance-card">
      <form @submit.prevent="submitForm" @reset="resetForm">
        <!-- <label>
          <h4>Insurance Type</h4>
          <select v-model="insuranceType" required autofocus>
            <option value="shortTerm">Short Term Insurance</option>
            <option value="annual">Annual Insurance</option>
          </select>
        </label> -->

        <InsuranceTypeSelector v-model:insuranceType="insuranceType" />

        <DatePicker 
          v-model:periodStart="periodStart" 
          v-model:periodEnd="periodEnd" 
          v-model:numOfDays="numOfDays" 
          v-model:insuranceType="insuranceType"
        />

        <InsurancePackageSelector v-model:packageType="packageType" />

  
        <!-- <label>
          <h4>Period Start</h4>
          <input type="date" v-model="periodStart" required />
        </label>
  
        <label v-if="insuranceType === 'shortTerm'">
          <h4>Period End</h4>
          <input type="date" id="periodEnd" v-model="periodEnd" required />
        </label>

        <div v-if="insuranceType === 'shortTerm'" class="price-info">
           Number of days: <strong>{{ store.numOfDays }}</strong>
        </div> -->
        
  
        <!-- <label>
          <h4>Package</h4>
          <select v-model="packageType" required>
            <option value="basic">Basic</option>
            <option value="extended">Extended</option>
            <option value="extra">Extra</option>
          </select>
        </label> -->
        <div v-if="packageType && insuranceType" class="price-info">
            Price for one person: 
        <strong class="price-display">
            <span class="currency">€</span>
            <span class="amount">{{ insuranceType ==='shortTerm' ? rates[insuranceType][packageType].toFixed(2) : rates[insuranceType][packageType] }}</span>
            <span class="period">/{{ insuranceType === 'shortTerm' ? 'day' : 'yr' }}</span>
        </strong>
        </div>

        <!-- <AdditionalCharges v-model:selectedCharges="additionalCharges" /> -->
  
        <br>
        <label class="additional-charges">
          <h4>Additional Charges</h4>
          <div class="checkbox-container">
            <div class="checkbox-item">
              <span>Cancellation</span>
              <input type="checkbox" value="cancellation" v-model="additionalCharges" />
            </div>
            <div class="checkbox-item">
              <span>Sport Activities</span>
              <input type="checkbox" value="sportActivities" v-model="additionalCharges" />
            </div>
          </div>
        </label>
        <br>
  
        <!-- <label>
          <h4>Number of Persons</h4>
          <input type="number" v-model="numOfPersons" min="1" max="3" required />

          <div class="persons-row">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <input type="range" v-model="numOfPersons" min="1" max="3" start="1" required />
          <div>Number of Persons: {{ numOfPersons }}</div>
        </label> -->

        <NumberOfPersons 
            :numOfPersons="numOfPersons" 
            :min="1" 
            :max="3" 
            @update:numOfPersons="numOfPersons = $event" 
        />
        
        <button type="submit" :disabled="isCalculateDisabled" > {{submitButtonText}}</button>
        <br>
        <br>
        <button type="reset">Reset</button>
      </form>
  
      <div class="price-info" v-if="totalPrice">
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

    const store = useInsuranceStore();
    const { insuranceType, periodStart, periodEnd, packageType, additionalCharges, numOfPersons, numOfDays, totalPrice, errors } = storeToRefs(store);

    const submitButtonText = computed(() => {
        return isCalculateDisabled.value ? 'Fill all inputs' : 'Create Offer';
    });

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
.insurance-card {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 0px;
}
input {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 0px;
}
input[type="date"]:focus {
    outline: 2px solid #0074d9;
}

input[type="checkbox"] {
    width: auto;
    margin-right: 5px;
    position: relative;
    top: 2px;
    float: right;
}

input[type="select"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 0px;

}

input[type="range"] {
    width: 100%;
    margin-top: 5px;
    transition: all 1.8s;
}

input[type="radio"] {
    margin-right: 5px;
    width: auto;
    float: right;
}



.checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
}

.checkbox-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left:10px;
}

.optionPrice {
    font-size: 12px;
    color: #888;
    position: relative;
    right: 0;
}

.price-info {
    text-align: right;
    
    margin-top: 5px;
    font-size: 1.2rem;
    color: #333;
}
.price-info strong {
    font-size: 2rem;
    color: #0074d9;
}

.price-display {
  font-size: 3rem;
  font-weight: bold;
  color: #0074d9;
  /* display: flex;
  align-items: flex-start;
  gap: 0.2rem; */
}

.price-display .currency {
  font-size: 1rem;
  vertical-align: top;
  position: relative;
  top: 0rem;
  margin-right: 0.2rem;
}

.price-display .amount {
  font-size: 2rem;
  margin-right: 0.2rem;
}

.price-display .period {
  font-size: 1rem;
  vertical-align: bottom;
  position: relative;
  bottom: 0rem;
  font-weight: 100;
}

.additional-charges {
    border: 1px solid #ccc;
    padding: 20px;
}

/* .persons-row {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
} */

.errors {
    margin-top: 20px;
    padding: 10px;
    border: 4px solid #f44336;
    background-color: #f3c7c4;
    /* color: #fff; */
}
.errors h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    color: #ff0000;
}



select {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 0px;
    border: 1px solid #ccc;
}
select:focus {
    outline: 2px solid #0074d9;
}
select option {
    padding: 8px;
    /* background-color: #4CAF50; */
}
select option span {
    background-color: #fff;
}

label {
    display: block;
    margin: 15px 0;
}
h4{
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
}
button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #0074d9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 3rem;
}
button[type="submit"]:hover {
    background-color: #0074d9;
    opacity: 0.8;
    box-shadow: 0 0 5px #0074d9;
    font-size: larger;
    font-weight: bold;
    /* transform: matrix(1.1, 0, 0, 1.1, 0, 0); */
    transition: all 0.3s;

}
button[type="reset"] {
    width: 100%;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button[type="reset"]:hover {
    background-color: #da190b;
}
button:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

  