/**
 * ActionButtons Component
 * Handles action button events (Save, Fill, Clear)
 */
import { StorageService } from '../services/StorageService.js';
import { FormFillerService } from '../services/FormFillerService.js';
import { FormManager } from './FormManager.js';
import { showStatus, confirmAction } from '../utils/dom.js';

export class ActionButtons {
  constructor(formManager) {
    this.formManager = formManager;
    this.init();
  }

  init() {
    const saveBtn = document.getElementById('saveBtn');
    const fillBtn = document.getElementById('fillBtn');
    const clearBtn = document.getElementById('clearBtn');

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    if (fillBtn) {
      fillBtn.addEventListener('click', () => this.handleFill());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.handleClear());
    }
  }

  /**
   * Handle save action
   */
  async handleSave() {
    try {
      const data = this.formManager.getData();
      
      // Basic validation
      if (!data.isValidEmail()) {
        showStatus('❌ Please enter a valid email address', 'error');
        return;
      }

      await StorageService.save(data);
      showStatus('✅ Data saved successfully!', 'success');
    } catch (error) {
      showStatus(`❌ Error saving data: ${error.message}`, 'error');
    }
  }

  /**
   * Handle fill action
   */
  async handleFill() {
    try {
      const result = await FormFillerService.fillCurrentPage();
      
      if (result.success) {
        showStatus(
          `✅ Filled ${result.fieldsCount} fields!`, 
          'success'
        );
      } else {
        showStatus(
          `❌ ${result.error || 'Error filling form'}`, 
          'error'
        );
      }
    } catch (error) {
      showStatus(`❌ Error: ${error.message}`, 'error');
    }
  }

  /**
   * Handle clear action
   */
  async handleClear() {
    const confirmed = await confirmAction(
      'Are you sure you want to clear all saved data?'
    );

    if (!confirmed) return;

    try {
      await StorageService.clear();
      this.formManager.clear();
      showStatus('🗑️ All data cleared', 'success');
    } catch (error) {
      showStatus(`❌ Error clearing data: ${error.message}`, 'error');
    }
  }
}

