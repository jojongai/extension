// Tab switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Remove active class from all tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab
    btn.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Load saved data when popup opens
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupPasswordToggle();
});

// Password visibility toggle
function setupPasswordToggle() {
  const toggleBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Update icon
      const svg = toggleBtn.querySelector('svg');
      if (type === 'text') {
        svg.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        svg.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });
  }
}

// Load data from Chrome storage
function loadData() {
  chrome.storage.local.get(['autofillData'], (result) => {
    if (result.autofillData) {
      const data = result.autofillData;
      
      // Personal Info
      document.getElementById('firstName').value = data.firstName || '';
      document.getElementById('lastName').value = data.lastName || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('phone').value = data.phone || '';
      
      // Address
      document.getElementById('address1').value = data.address1 || '';
      document.getElementById('address2').value = data.address2 || '';
      document.getElementById('city').value = data.city || '';
      document.getElementById('state').value = data.state || '';
      document.getElementById('zip').value = data.zip || '';
      document.getElementById('country').value = data.country || '';
      
      // Credentials
      document.getElementById('username').value = data.username || '';
      document.getElementById('password').value = data.password || '';
    }
  });
}

// Save data to Chrome storage
document.getElementById('saveBtn').addEventListener('click', () => {
  const autofillData = {
    // Personal Info
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    
    // Address
    address1: document.getElementById('address1').value,
    address2: document.getElementById('address2').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zip: document.getElementById('zip').value,
    country: document.getElementById('country').value,
    
    // Credentials
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  
  // Basic validation
  if (autofillData.email && !isValidEmail(autofillData.email)) {
    showModal('error', 'Invalid Email', 'Please enter a valid email address.');
    return;
  }
  
  chrome.storage.local.set({ autofillData }, () => {
    if (chrome.runtime.lastError) {
      showModal('error', 'Save Failed', 'Could not save data. Please try again.');
    } else {
      showModal('success', 'Data Saved!', 'Your information has been saved successfully.');
    }
  });
});

// Fill current page
document.getElementById('fillBtn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: 'fillForm' }, (response) => {
      if (chrome.runtime.lastError) {
        showStatus('❌ Error: Please refresh the page and try again', 'error');
      } else if (response && response.success) {
        showStatus(`✅ Filled ${response.fieldsCount} fields!`, 'success');
      } else {
        showStatus('⚠️ No fields found to fill', 'error');
      }
    });
  } catch (error) {
    showStatus('❌ Error filling form', 'error');
  }
});

// Clear all data
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all saved data?')) {
    chrome.storage.local.remove('autofillData', () => {
      // Clear all input fields
      document.querySelectorAll('input').forEach(input => input.value = '');
      showStatus('🗑️ All data cleared', 'success');
    });
  }
});

// Show status message
function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  setTimeout(() => {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }, 3000);
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show modal for save success/failure
function showModal(type, title, message) {
  // Remove existing modal if any
  const existingModal = document.getElementById('responseModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'responseModal';
  modal.className = 'modal-overlay';
  
  const iconSvg = type === 'success' 
    ? `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <circle cx="12" cy="12" r="10" stroke="#10b981"></circle>
         <path d="M9 12l2 2 4-4" stroke="#10b981"></path>
       </svg>`
    : `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <circle cx="12" cy="12" r="10" stroke="#ef4444"></circle>
         <line x1="15" y1="9" x2="9" y2="15" stroke="#ef4444"></line>
         <line x1="9" y1="9" x2="15" y2="15" stroke="#ef4444"></line>
       </svg>`;
  
  modal.innerHTML = `
    <div class="modal-content ${type}">
      <div class="modal-icon ${type}">
        ${iconSvg}
      </div>
      <h2 class="modal-title">${title}</h2>
      <p class="modal-message">${message}</p>
      <button class="modal-btn ${type}" id="modalCloseBtn">OK</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => modal.classList.add('active'), 10);
  
  // Close modal on button click
  document.getElementById('modalCloseBtn').addEventListener('click', () => {
    closeModal();
  });
  
  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Auto-close after 3 seconds for success
  if (type === 'success') {
    setTimeout(() => closeModal(), 3000);
  }
}

// Close modal with animation
function closeModal() {
  const modal = document.getElementById('responseModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

