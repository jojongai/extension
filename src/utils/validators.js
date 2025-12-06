/**
 * Validation Utilities
 * Input validation functions
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email) return true; // Empty is valid (optional)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!phone) return true; // Empty is valid (optional)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
}

/**
 * Validate required field
 * @param {string} value
 * @returns {boolean}
 */
export function isRequired(value) {
  return value.trim().length > 0;
}

