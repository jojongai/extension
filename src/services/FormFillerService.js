/**
 * FormFillerService
 * Handles form filling operations on web pages
 */
import { StorageService } from './StorageService.js';

export class FormFillerService {
  /**
   * Fill the current active tab with autofill data
   * @returns {Promise<{success: boolean, fieldsCount?: number, error?: string}>}
   */
  static async fillCurrentPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, { action: 'fillForm' }, (response) => {
          if (chrome.runtime.lastError) {
            resolve({
              success: false,
              error: 'Please refresh the page and try again'
            });
          } else if (response && response.success) {
            resolve({
              success: true,
              fieldsCount: response.fieldsCount
            });
          } else {
            resolve({
              success: false,
              error: 'No fields found to fill'
            });
          }
        });
      });
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error filling form'
      };
    }
  }

  /**
   * Get autofill data for form filling
   * @returns {Promise<AutofillData>}
   */
  static async getAutofillData() {
    return await StorageService.load();
  }
}

