/**
 * FormManager Component
 * Manages form data binding and retrieval
 */
import { AutofillData } from '../models/AutofillData.js';

export class FormManager {
  constructor() {
    this.fieldMappings = {
      // Personal Info
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phone: 'phone',
      
      // Address
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      zip: 'zip',
      country: 'country',
      
      // Credentials
      username: 'username',
      password: 'password'
    };
  }

  /**
   * Load data into form fields
   * @param {AutofillData} data
   */
  loadData(data) {
    Object.entries(this.fieldMappings).forEach(([fieldId, dataKey]) => {
      const element = document.getElementById(fieldId);
      if (element && data[dataKey] !== undefined) {
        element.value = data[dataKey] || '';
      }
    });
  }

  /**
   * Get data from form fields
   * @returns {AutofillData}
   */
  getData() {
    const formData = {};
    
    Object.entries(this.fieldMappings).forEach(([fieldId, dataKey]) => {
      const element = document.getElementById(fieldId);
      if (element) {
        formData[dataKey] = element.value.trim();
      }
    });
    
    return new AutofillData(formData);
  }

  /**
   * Clear all form fields
   */
  clear() {
    Object.keys(this.fieldMappings).forEach(fieldId => {
      const element = document.getElementById(fieldId);
      if (element) {
        element.value = '';
      }
    });
  }
}

