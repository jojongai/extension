// Content script - runs on every webpage
// This script detects form fields and fills them with saved data

console.log('AutoFill Pro content script loaded');

// Check if auto-fill is enabled and fill on page load
chrome.storage.local.get(['autoFillEnabled', 'autofillData'], (result) => {
  if (result.autoFillEnabled && result.autofillData) {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => autoFillOnLoad(), 500);
      });
    } else {
      // DOM already loaded
      setTimeout(() => autoFillOnLoad(), 500);
    }
  }
});

// Auto-fill on page load
function autoFillOnLoad() {
  // Check if page has form fields
  const fields = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select');
  
  if (fields.length > 0) {
    console.log('AutoFill Pro: Auto-filling detected form fields...');
    fillFormFields(true); // true = auto mode
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    fillFormFields(false); // false = manual mode
    sendResponse({ success: true, fieldsCount: fillFormFields(false) });
  }
  return true;
});

// Main function to fill form fields
function fillFormFields(isAutoMode = false) {
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
          fieldIdentifier.includes('e-mail') ||
          fieldIdentifier.includes('emailaddress') ||
          fieldIdentifier.includes('email_address') ||
          fieldIdentifier.includes('email-address') ||
          fieldIdentifier.includes('e_mail') ||
          fieldIdentifier.includes('mail') ||
          fieldIdentifier.includes('user_email') ||
          fieldIdentifier.includes('useremail') ||
          fieldAutocomplete === 'email') {
        valueToFill = data.email;
      }
      
      // First Name detection
      else if (fieldIdentifier.includes('firstname') || 
               fieldIdentifier.includes('first-name') ||
               fieldIdentifier.includes('first_name') ||
               fieldIdentifier.includes('fname') ||
               fieldIdentifier.includes('f_name') ||
               fieldIdentifier.includes('f-name') ||
               fieldIdentifier.includes('forename') ||
               fieldIdentifier.includes('givenname') ||
               fieldIdentifier.includes('given-name') ||
               fieldIdentifier.includes('given_name') ||
               fieldIdentifier.includes('firstname') ||
               fieldAutocomplete === 'given-name' ||
               (fieldIdentifier.includes('first') && fieldIdentifier.includes('name'))) {
        valueToFill = data.firstName;
      }
      
      // Last Name detection
      else if (fieldIdentifier.includes('lastname') || 
               fieldIdentifier.includes('last-name') ||
               fieldIdentifier.includes('last_name') ||
               fieldIdentifier.includes('lname') ||
               fieldIdentifier.includes('l_name') ||
               fieldIdentifier.includes('l-name') ||
               fieldIdentifier.includes('surname') ||
               fieldIdentifier.includes('familyname') ||
               fieldIdentifier.includes('family-name') ||
               fieldIdentifier.includes('family_name') ||
               fieldAutocomplete === 'family-name' ||
               (fieldIdentifier.includes('last') && fieldIdentifier.includes('name'))) {
        valueToFill = data.lastName;
      }
      
      // Full Name detection (if first/last name fields not found)
      else if ((fieldIdentifier.includes('name') && !fieldIdentifier.includes('user')) ||
               fieldIdentifier.includes('full-name') ||
               fieldIdentifier.includes('fullname') ||
               fieldIdentifier.includes('full_name') ||
               fieldIdentifier.includes('completename') ||
               fieldIdentifier.includes('complete-name') ||
               fieldIdentifier.includes('your name') ||
               fieldIdentifier.includes('yourname') ||
               fieldAutocomplete === 'name') {
        if (data.firstName && data.lastName) {
          valueToFill = `${data.firstName} ${data.lastName}`;
        }
      }
      
      // Username detection
      else if (fieldIdentifier.includes('username') || 
               fieldIdentifier.includes('user-name') ||
               fieldIdentifier.includes('user_name') ||
               fieldIdentifier.includes('userid') ||
               fieldIdentifier.includes('user-id') ||
               fieldIdentifier.includes('user_id') ||
               fieldIdentifier.includes('login') ||
               fieldIdentifier.includes('loginid') ||
               fieldIdentifier.includes('login-id') ||
               fieldIdentifier.includes('login_id') ||
               fieldIdentifier.includes('account') ||
               fieldIdentifier.includes('accountname') ||
               fieldIdentifier.includes('account-name') ||
               fieldIdentifier.includes('handle') ||
               fieldAutocomplete === 'username') {
        valueToFill = data.username;
      }
      
      // Password detection
      else if (fieldType === 'password' || 
               fieldIdentifier.includes('password') ||
               fieldIdentifier.includes('passwd') ||
               fieldIdentifier.includes('pass') ||
               fieldIdentifier.includes('pwd') ||
               fieldIdentifier.includes('user_password') ||
               fieldIdentifier.includes('userpassword') ||
               fieldIdentifier.includes('user-password') ||
               fieldIdentifier.includes('login_password') ||
               fieldIdentifier.includes('loginpassword') ||
               fieldAutocomplete === 'current-password' ||
               fieldAutocomplete === 'new-password') {
        valueToFill = data.password;
      }
      
      // Phone detection
      else if (fieldType === 'tel' || 
               fieldIdentifier.includes('phone') || 
               fieldIdentifier.includes('mobile') ||
               fieldIdentifier.includes('telephone') ||
               fieldIdentifier.includes('phonenumber') ||
               fieldIdentifier.includes('phone-number') ||
               fieldIdentifier.includes('phone_number') ||
               fieldIdentifier.includes('mobilenumber') ||
               fieldIdentifier.includes('mobile-number') ||
               fieldIdentifier.includes('mobile_number') ||
               fieldIdentifier.includes('cell') ||
               fieldIdentifier.includes('cellphone') ||
               fieldIdentifier.includes('contact') ||
               fieldIdentifier.includes('contactnumber') ||
               fieldIdentifier.includes('contact-number') ||
               fieldAutocomplete === 'tel' ||
               fieldAutocomplete === 'tel-national') {
        valueToFill = data.phone;
      }
      
      // Address Line 1
      else if (fieldIdentifier.includes('address1') ||
               fieldIdentifier.includes('address-1') ||
               fieldIdentifier.includes('address_1') ||
               fieldIdentifier.includes('addressline1') ||
               fieldIdentifier.includes('address-line-1') ||
               fieldIdentifier.includes('address_line_1') ||
               fieldIdentifier.includes('street') ||
               fieldIdentifier.includes('streetaddress') ||
               fieldIdentifier.includes('street-address') ||
               fieldIdentifier.includes('street_address') ||
               fieldIdentifier.includes('street1') ||
               fieldIdentifier.includes('street-1') ||
               fieldIdentifier.includes('addr1') ||
               fieldIdentifier.includes('addr-1') ||
               fieldIdentifier.includes('billing_address1') ||
               fieldIdentifier.includes('shipping_address1') ||
               (fieldIdentifier.includes('address') && !fieldIdentifier.includes('2') && !fieldIdentifier.includes('email')) ||
               fieldAutocomplete === 'address-line1' ||
               fieldAutocomplete === 'street-address') {
        valueToFill = data.address1;
      }
      
      // Address Line 2
      else if (fieldIdentifier.includes('address2') ||
               fieldIdentifier.includes('address-2') ||
               fieldIdentifier.includes('address_2') ||
               fieldIdentifier.includes('addressline2') ||
               fieldIdentifier.includes('address-line-2') ||
               fieldIdentifier.includes('address_line_2') ||
               fieldIdentifier.includes('street2') ||
               fieldIdentifier.includes('street-2') ||
               fieldIdentifier.includes('addr2') ||
               fieldIdentifier.includes('addr-2') ||
               fieldIdentifier.includes('apartment') ||
               fieldIdentifier.includes('apt') ||
               fieldIdentifier.includes('suite') ||
               fieldIdentifier.includes('unit') ||
               fieldIdentifier.includes('building') ||
               fieldIdentifier.includes('floor') ||
               fieldIdentifier.includes('room') ||
               fieldIdentifier.includes('billing_address2') ||
               fieldIdentifier.includes('shipping_address2') ||
               fieldAutocomplete === 'address-line2') {
        valueToFill = data.address2;
      }
      
      // City detection
      else if (fieldIdentifier.includes('city') || 
               fieldIdentifier.includes('town') ||
               fieldIdentifier.includes('municipality') ||
               fieldIdentifier.includes('locality') ||
               fieldIdentifier.includes('billing_city') ||
               fieldIdentifier.includes('shipping_city') ||
               fieldAutocomplete === 'address-level2') {
        valueToFill = data.city;
      }
      
      // State/Province detection
      else if (fieldIdentifier.includes('state') || 
               fieldIdentifier.includes('province') ||
               fieldIdentifier.includes('region') ||
               fieldIdentifier.includes('county') ||
               fieldIdentifier.includes('territory') ||
               fieldIdentifier.includes('billing_state') ||
               fieldIdentifier.includes('shipping_state') ||
               fieldIdentifier.includes('billing_province') ||
               fieldIdentifier.includes('shipping_province') ||
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
               fieldIdentifier.includes('post_code') ||
               fieldIdentifier.includes('zipcode') ||
               fieldIdentifier.includes('zip-code') ||
               fieldIdentifier.includes('zip_code') ||
               fieldIdentifier.includes('postalcode') ||
               fieldIdentifier.includes('postal-code') ||
               fieldIdentifier.includes('postal_code') ||
               fieldIdentifier.includes('pincode') ||
               fieldIdentifier.includes('pin-code') ||
               fieldIdentifier.includes('pin_code') ||
               fieldIdentifier.includes('billing_zip') ||
               fieldIdentifier.includes('shipping_zip') ||
               fieldIdentifier.includes('billing_postcode') ||
               fieldIdentifier.includes('shipping_postcode') ||
               fieldAutocomplete === 'postal-code') {
        valueToFill = data.zip;
      }
      
      // Country detection
      else if (fieldIdentifier.includes('country') || 
               fieldIdentifier.includes('nation') ||
               fieldIdentifier.includes('billing_country') ||
               fieldIdentifier.includes('shipping_country') ||
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
        fillField(field, valueToFill, isAutoMode);
        fieldsFilledCount++;
      }
    });
    
    const modeText = isAutoMode ? '(auto)' : '(manual)';
    console.log(`AutoFill Pro: Filled ${fieldsFilledCount} fields ${modeText}`);
    
    // Show subtle notification for auto-fill
    if (isAutoMode && fieldsFilledCount > 0) {
      showAutoFillNotification(fieldsFilledCount);
    }
  });
  
  return 0; // Will be updated by async callback
}

// Show subtle notification when auto-fill happens
function showAutoFillNotification(count) {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease-out;
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      AutoFill Pro filled ${count} field${count > 1 ? 's' : ''}
    </div>
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Fill a single field and trigger events
function fillField(field, value, isAutoMode = false) {
  // Set the value
  field.value = value;
  
  // Trigger events that websites might listen for
  const events = [
    new Event('input', { bubbles: true }),
    new Event('change', { bubbles: true }),
    new Event('blur', { bubbles: true })
  ];
  
  events.forEach(event => field.dispatchEvent(event));
  
  // Highlight the field briefly to show it was filled (more subtle for auto mode)
  const originalBorder = field.style.border;
  const highlightColor = isAutoMode ? '#667eea' : '#4caf50';
  field.style.border = `2px solid ${highlightColor}`;
  field.style.transition = 'border 0.3s ease';
  
  setTimeout(() => {
    field.style.border = originalBorder;
  }, isAutoMode ? 800 : 1000);
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

