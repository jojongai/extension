// Background service worker for Chrome Extension
// Handles extension lifecycle and background tasks

console.log('AutoFill Pro background service worker initialized');

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('AutoFill Pro installed successfully!');
    
    // Open welcome page or setup page (optional)
    // chrome.tabs.create({ url: 'welcome.html' });
  } else if (details.reason === 'update') {
    console.log('AutoFill Pro updated to version', chrome.runtime.getManifest().version);
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    // Fetch data from storage and send it back
    chrome.storage.local.get(['autofillData'], (result) => {
      sendResponse({ data: result.autofillData || null });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'saveData') {
    // Save data to storage
    chrome.storage.local.set({ autofillData: request.data }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Context menu (right-click) integration
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'autofill-form',
    title: '✨ AutoFill this form',
    contexts: ['editable']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'autofill-form') {
    chrome.tabs.sendMessage(tab.id, { action: 'fillForm' });
  }
});

