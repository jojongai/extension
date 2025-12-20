/**
 * Main Popup Application
 * Orchestrates all components and services
 */
import { StorageService } from './services/StorageService.js';
import { Tabs } from './components/Tabs.js';
import { PasswordToggle } from './components/PasswordToggle.js';
import { FormManager } from './components/FormManager.js';
import { ActionButtons } from './components/ActionButtons.js';

class PopupApp {
  constructor() {
    this.tabs = null;
    this.passwordToggle = null;
    this.formManager = null;
    this.actionButtons = null;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Initialize components
      this.tabs = new Tabs();
      this.passwordToggle = new PasswordToggle('togglePassword', 'password');
      this.formManager = new FormManager();
      this.actionButtons = new ActionButtons(this.formManager);

      // Load saved data
      await this.loadData();
      
      // Initialize auto-fill toggle
      this.initAutoFillToggle();
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  /**
   * Load data from storage and populate forms
   */
  async loadData() {
    try {
      const data = await StorageService.load();
      this.formManager.loadData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  /**
   * Initialize auto-fill toggle
   */
  initAutoFillToggle() {
    const toggle = document.getElementById('autoFillToggle');
    if (!toggle) return;
    
    // Load saved preference
    chrome.storage.local.get(['autoFillEnabled'], (result) => {
      toggle.checked = result.autoFillEnabled || false;
    });
    
    // Save preference when changed
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;
      chrome.storage.local.set({ autoFillEnabled: isEnabled }, () => {
        const status = document.getElementById('status');
        status.textContent = isEnabled ? '✓ Auto-fill enabled' : 'Auto-fill disabled';
        status.className = isEnabled ? 'status success' : 'status';
        
        setTimeout(() => {
          status.textContent = '';
          status.className = 'status';
        }, 2000);
      });
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PopupApp();
  app.init();
});

