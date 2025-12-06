/**
 * StorageService
 * Handles all Chrome storage operations
 */
import { AutofillData } from '../models/AutofillData.js';

export class StorageService {
  static STORAGE_KEY = 'autofillData';

  /**
   * Load autofill data from Chrome storage
   * @returns {Promise<AutofillData>}
   */
  static async load() {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.STORAGE_KEY], (result) => {
        const data = result[this.STORAGE_KEY] || {};
        resolve(new AutofillData(data));
      });
    });
  }

  /**
   * Save autofill data to Chrome storage
   * @param {AutofillData} data
   * @returns {Promise<void>}
   */
  static async save(data) {
    return new Promise((resolve, reject) => {
      if (!(data instanceof AutofillData)) {
        reject(new Error('Data must be an instance of AutofillData'));
        return;
      }

      chrome.storage.local.set(
        { [this.STORAGE_KEY]: data.toObject() },
        () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        }
      );
    });
  }

  /**
   * Clear all autofill data
   * @returns {Promise<void>}
   */
  static async clear() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(this.STORAGE_KEY, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  }
}

