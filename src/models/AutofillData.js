/**
 * AutofillData Model
 * Defines the structure and validation for autofill data
 */
export class AutofillData {
  constructor(data = {}) {
    // Personal Info
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    
    // Address
    this.address1 = data.address1 || '';
    this.address2 = data.address2 || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.zip = data.zip || '';
    this.country = data.country || '';
    
    // Credentials
    this.username = data.username || '';
    this.password = data.password || '';
  }

  /**
   * Get all data as a plain object
   */
  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      country: this.country,
      username: this.username,
      password: this.password
    };
  }

  /**
   * Check if data is empty
   */
  isEmpty() {
    return Object.values(this.toObject()).every(value => !value);
  }

  /**
   * Validate email format
   */
  isValidEmail() {
    if (!this.email) return true; // Empty is valid (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

