/**
 * DOM Utilities
 * Helper functions for DOM manipulation
 */

/**
 * Get element by ID
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export function getElement(id) {
  return document.getElementById(id);
}

/**
 * Get all elements matching selector
 * @param {string} selector
 * @returns {NodeList}
 */
export function querySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Create element with attributes
 * @param {string} tag
 * @param {Object} attributes
 * @param {string} textContent
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });
  
  if (textContent) {
    element.textContent = textContent;
  }
  
  return element;
}

/**
 * Show status message
 * @param {string} message
 * @param {string} type - 'success' | 'error'
 * @param {number} duration - Duration in milliseconds
 */
export function showStatus(message, type = 'success', duration = 3000) {
  const statusDiv = getElement('status');
  if (!statusDiv) return;

  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  setTimeout(() => {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }, duration);
}

/**
 * Confirm dialog wrapper
 * @param {string} message
 * @returns {Promise<boolean>}
 */
export function confirmAction(message) {
  return new Promise((resolve) => {
    const result = window.confirm(message);
    resolve(result);
  });
}

