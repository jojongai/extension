// Content script - runs on every webpage
// This script detects form fields and fills them with saved data

console.log('AutoFill Pro content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    fillFormFields();
    sendResponse({ success: true, fieldsCount: fillFormFields() });
  }
  return true;
});

// Main function to fill form fields
function fillFormFields() {
  chrome.storage.local.get(['autofillData'], (result) => {
    if (!result.autofillData) {
      console.log('No autofill data found');
      return;
    }
    
    const data = result.autofillData;
    let fieldsFilledCount = 0;
    
    // Get all input fields, textareas, and selects
    const fields = document.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
      const fieldType = field.type ? field.type.toLowerCase() : '';
      const fieldName = field.name ? field.name.toLowerCase() : '';
      const fieldId = field.id ? field.id.toLowerCase() : '';
      const fieldPlaceholder = field.placeholder ? field.placeholder.toLowerCase() : '';
      const fieldAutocomplete = field.autocomplete ? field.autocomplete.toLowerCase() : '';
      const fieldAriaLabel = field.getAttribute('aria-label') ? field.getAttribute('aria-label').toLowerCase() : '';
      
      // Combine all attributes for matching
      const fieldIdentifier = `${fieldName} ${fieldId} ${fieldPlaceholder} ${fieldAutocomplete} ${fieldAriaLabel}`;
      
      // Skip hidden and disabled fields
      if (field.type === 'hidden' || field.disabled || field.readOnly) {
        return;
      }
      
      let valueToFill = null;
      
      // Email detection
      if (fieldType === 'email' || 
          fieldIdentifier.includes('email') || 
          fieldIdentifier.includes('e-mail')) {
        valueToFill = data.email;
      }
      
      // First Name detection
      else if (fieldIdentifier.includes('firstname') || 
               fieldIdentifier.includes('first-name') ||
               fieldIdentifier.includes('first_name') ||
               fieldIdentifier.includes('fname') ||
               (fieldIdentifier.includes('first') && fieldIdentifier.includes('name'))) {
        valueToFill = data.firstName;
      }
      
      // Last Name detection
      else if (fieldIdentifier.includes('lastname') || 
               fieldIdentifier.includes('last-name') ||
               fieldIdentifier.includes('last_name') ||
               fieldIdentifier.includes('lname') ||
               (fieldIdentifier.includes('last') && fieldIdentifier.includes('name'))) {
        valueToFill = data.lastName;
      }
      
      // Full Name detection (if first/last name fields not found)
      else if ((fieldIdentifier.includes('name') && !fieldIdentifier.includes('user')) ||
               fieldIdentifier.includes('full-name') ||
               fieldIdentifier.includes('fullname')) {
        if (data.firstName && data.lastName) {
          valueToFill = `${data.firstName} ${data.lastName}`;
        }
      }
      
      // Username detection
      else if (fieldIdentifier.includes('username') || 
               fieldIdentifier.includes('user-name') ||
               fieldIdentifier.includes('user_name') ||
               fieldIdentifier.includes('userid') ||
               fieldAutocomplete === 'username') {
        valueToFill = data.username;
      }
      
      // Password detection
      else if (fieldType === 'password' || 
               fieldIdentifier.includes('password') ||
               fieldIdentifier.includes('passwd') ||
               fieldAutocomplete === 'current-password' ||
               fieldAutocomplete === 'new-password') {
        valueToFill = data.password;
      }
      
      // Phone detection
      else if (fieldType === 'tel' || 
               fieldIdentifier.includes('phone') || 
               fieldIdentifier.includes('mobile') ||
               fieldIdentifier.includes('telephone') ||
               fieldAutocomplete === 'tel') {
        valueToFill = data.phone;
      }
      
      // Address Line 1
      else if (fieldIdentifier.includes('address1') ||
               fieldIdentifier.includes('address-1') ||
               fieldIdentifier.includes('address_1') ||
               fieldIdentifier.includes('street') ||
               (fieldIdentifier.includes('address') && !fieldIdentifier.includes('2')) ||
               fieldAutocomplete === 'address-line1' ||
               fieldAutocomplete === 'street-address') {
        valueToFill = data.address1;
      }
      
      // Address Line 2
      else if (fieldIdentifier.includes('address2') ||
               fieldIdentifier.includes('address-2') ||
               fieldIdentifier.includes('address_2') ||
               fieldIdentifier.includes('apartment') ||
               fieldIdentifier.includes('suite') ||
               fieldAutocomplete === 'address-line2') {
        valueToFill = data.address2;
      }
      
      // City detection
      else if (fieldIdentifier.includes('city') || 
               fieldAutocomplete === 'address-level2') {
        valueToFill = data.city;
      }
      
      // State/Province detection
      else if (fieldIdentifier.includes('state') || 
               fieldIdentifier.includes('province') ||
               fieldIdentifier.includes('region') ||
               fieldAutocomplete === 'address-level1') {
        valueToFill = data.state;
        
        // Handle dropdowns for state/province
        if (field.tagName.toLowerCase() === 'select' && valueToFill) {
          handleDropdown(field, valueToFill);
          fieldsFilledCount++;
          return;
        }
      }
      
      // ZIP/Postal Code detection
      else if (fieldIdentifier.includes('zip') || 
               fieldIdentifier.includes('postal') ||
               fieldIdentifier.includes('postcode') ||
               fieldIdentifier.includes('post-code') ||
               fieldAutocomplete === 'postal-code') {
        valueToFill = data.zip;
      }
      
      // Country detection
      else if (fieldIdentifier.includes('country') || 
               fieldAutocomplete === 'country' ||
               fieldAutocomplete === 'country-name') {
        valueToFill = data.country;
        
        // Handle dropdowns for country
        if (field.tagName.toLowerCase() === 'select' && valueToFill) {
          handleDropdown(field, valueToFill);
          fieldsFilledCount++;
          return;
        }
      }
      
      // Fill the field if we found a matching value
      if (valueToFill && valueToFill.trim() !== '') {
        fillField(field, valueToFill);
        fieldsFilledCount++;
      }
    });
    
    console.log(`AutoFill Pro: Filled ${fieldsFilledCount} fields`);
  });
  
  return 0; // Will be updated by async callback
}

// Fill a single field and trigger events
function fillField(field, value) {
  // Set the value
  field.value = value;
  
  // Trigger events that websites might listen for
  const events = [
    new Event('input', { bubbles: true }),
    new Event('change', { bubbles: true }),
    new Event('blur', { bubbles: true })
  ];
  
  events.forEach(event => field.dispatchEvent(event));
  
  // Highlight the field briefly to show it was filled
  const originalBorder = field.style.border;
  field.style.border = '2px solid #4caf50';
  setTimeout(() => {
    field.style.border = originalBorder;
  }, 1000);
}

// Handle dropdown/select fields
function handleDropdown(selectElement, valueToMatch) {
  const options = Array.from(selectElement.options);
  
  // Try to match by value first
  let matchedOption = options.find(opt => 
    opt.value.toLowerCase() === valueToMatch.toLowerCase()
  );
  
  // If no match, try by text content
  if (!matchedOption) {
    matchedOption = options.find(opt => 
      opt.text.toLowerCase().includes(valueToMatch.toLowerCase()) ||
      valueToMatch.toLowerCase().includes(opt.text.toLowerCase())
    );
  }
  
  // If still no match, try partial matching
  if (!matchedOption) {
    matchedOption = options.find(opt => {
      const optText = opt.text.toLowerCase();
      const optValue = opt.value.toLowerCase();
      const searchValue = valueToMatch.toLowerCase();
      return optText.includes(searchValue) || optValue.includes(searchValue);
    });
  }
  
  if (matchedOption) {
    selectElement.value = matchedOption.value;
    
    // Trigger change events
    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    selectElement.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Highlight the dropdown
    const originalBorder = selectElement.style.border;
    selectElement.style.border = '2px solid #4caf50';
    setTimeout(() => {
      selectElement.style.border = originalBorder;
    }, 1000);
    
    console.log(`Filled dropdown: ${selectElement.name || selectElement.id} with: ${matchedOption.text}`);
  }
}

// Optional: Listen for keyboard shortcut (Ctrl+Shift+F or Cmd+Shift+F)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
    e.preventDefault();
    fillFormFields();
  }
});

