/**
 * Tabs Component
 * Handles tab switching functionality
 */
export class Tabs {
  constructor() {
    this.tabBtns = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.init();
  }

  init() {
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });
  }

  /**
   * Switch to a specific tab
   * @param {string} tabName
   */
  switchTab(tabName) {
    // Remove active class from all tabs
    this.tabBtns.forEach(b => b.classList.remove('active'));
    this.tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeBtn = Array.from(this.tabBtns).find(
      btn => btn.dataset.tab === tabName
    );
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
  }

  /**
   * Get current active tab
   * @returns {string|null}
   */
  getActiveTab() {
    const activeBtn = Array.from(this.tabBtns).find(btn => 
      btn.classList.contains('active')
    );
    return activeBtn ? activeBtn.dataset.tab : null;
  }
}

