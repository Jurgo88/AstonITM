import { defineStore } from 'pinia';
import { rates, chargeRates } from '../data/rates';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const useInsuranceStore = defineStore('insurance', {
    state: () => ({
        insuranceType: '',
        periodStart: '',
        periodEnd: '',
        packageType: '',
        additionalCharges: [],
        numOfPersons: 1,
        numOfDays: 0,
        totalPrice: 0,
        errors: [],
    }),
    actions: {

        calculateDays(start, end) {
            const days = (new Date(end) - new Date(start)) / MS_PER_DAY;
            this.numOfDays = days;
            return isNaN(days) ? 0 : days;
        },

        validateInputs() {
            this.errors = [];
            const today = new Date().toISOString().split('T')[0];
            if (!this.packageType || !this.insuranceType) {
                console.error('Invalid package type or insurance type.');
                this.errors.push('Invalid package type or insurance type.');
            }

            if (!this.periodStart) {
                this.errors.push('Start date is required for insurance.');
            } else if (this.periodStart < today) {
                this.errors.push('Start date must be today or later.');
            }
        
            if (this.insuranceType === 'shortTerm') {
                if (!this.periodStart || !this.periodEnd) {
                    this.errors.push('Both start and end dates are required for short-term insurance.');
                } else if (this.calculateDays(this.periodStart, this.periodEnd) <= 0) {
                    this.errors.push('End date must be after the start date.');
                }
            }

            if (this.numOfPersons <= 0) {
                this.errors.push('Invalid number of persons.');
            }

            return this.errors.length == 0 ? true : false;

        },

        calculateBasePrice() {
            if (this.insuranceType === 'shortTerm') {
                return rates.shortTerm[this.packageType] * this.calculateDays(this.periodStart, this.periodEnd);
            } else if (this.insuranceType === 'annual') {
                return rates.annual[this.packageType];
            } else {
                console.error('Invalid insurance type.');
                return 0;
            }
        },

        calculateAdditionalCharge() {
            return this.additionalCharges.reduce((acc, charge) => {
                const type = this.insuranceType;
                const rate = chargeRates[charge]?.[type];
                if (rate) {
                    return acc + this.calculateBasePrice() * rate;
                } else {
                    console.warn(`Unknown charge type: ${charge}`);
                    return acc;
                }
            }, 0);
        },

        calculateTotalPrice() {
            if (this.validateInputs()) {
                this.totalPrice = (this.calculateBasePrice() + this.calculateAdditionalCharge()) * this.numOfPersons;
            }
        },


        resetForm() {
            this.insuranceType = '';
            this.periodStart = '';
            this.periodEnd = '';
            this.packageType = '';
            this.additionalCharges = [];
            this.numOfPersons = 1;
            this.numOfDays = 0;
            this.totalPrice = 0;
        },

    },
});
