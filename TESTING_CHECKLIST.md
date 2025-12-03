# ✅ Installation & Testing Checklist

## Step 1: Load Extension in Chrome

- [ ] Open Chrome browser
- [ ] Go to `chrome://extensions/`
- [ ] Toggle "Developer mode" ON (top right)
- [ ] Click "Load unpacked" button
- [ ] Navigate to `/Users/jojongai/Desktop/code/extension`
- [ ] Click "Select" or "Open"
- [ ] Verify "AutoFill Pro" appears in extensions list
- [ ] Pin extension to toolbar (click puzzle icon, then pin)

## Step 2: Configure Your Data

- [ ] Click the AutoFill Pro icon in toolbar
- [ ] Go to "Personal Info" tab
  - [ ] Enter First Name
  - [ ] Enter Last Name
  - [ ] Enter Email
  - [ ] Enter Phone Number
- [ ] Go to "Address" tab
  - [ ] Enter Address Line 1
  - [ ] Enter City
  - [ ] Enter State (e.g., "NY")
  - [ ] Enter ZIP Code
  - [ ] Enter Country (e.g., "United States")
- [ ] Go to "Credentials" tab
  - [ ] Enter Username
  - [ ] Enter Password (test password only!)
- [ ] Click "💾 Save Data" button
- [ ] Verify status message shows "✅ Data saved successfully!"

## Step 3: Test with Test Form

- [ ] Open `test-form.html` in Chrome (double-click the file)
- [ ] Click AutoFill Pro extension icon
- [ ] Click "✨ Fill Current Page" button
- [ ] Verify all fields are filled with green border animation
- [ ] Check dropdowns (State, Country) are properly selected
- [ ] Test keyboard shortcut: `Cmd+Shift+F` (Mac) or `Ctrl+Shift+F` (Windows)
- [ ] Refresh page and test again to ensure it works consistently

## Step 4: Test on Real Websites

Try these common websites with forms:

- [ ] **Google Forms**: Create a test form and fill it
- [ ] **Sign-up pages**: Try any website sign-up form
- [ ] **Checkout pages**: Test address forms (don't submit!)
- [ ] **Contact forms**: Test contact/inquiry forms

## Step 5: Test Advanced Features

- [ ] Right-click on any input field
- [ ] Verify "✨ AutoFill this form" appears in context menu
- [ ] Click it and verify form fills
- [ ] Test on a page with unusual field names
- [ ] Test on a page with multiple forms

## Troubleshooting

If something doesn't work:

- [ ] Open Chrome DevTools (F12)
- [ ] Check Console tab for errors
- [ ] Look for AutoFill Pro messages
- [ ] Refresh the page after loading extension
- [ ] Verify data is saved (reopen popup)
- [ ] Try reloading the extension at `chrome://extensions/`

## Expected Results

✅ **Success indicators:**
- Fields turn green border when filled
- Console shows "AutoFill Pro: Filled X fields"
- Status message shows number of fields filled
- Dropdowns select correct options
- No console errors

❌ **Common issues:**
- Page needs refresh after installing extension
- Data not saved (check popup)
- Website uses non-standard field names (expected limitation)

---

## Quick Test Commands

**Check if extension is loaded:**
```javascript
// In browser console
chrome.runtime.getManifest()
```

**View stored data:**
```javascript
// In browser console
chrome.storage.local.get(['autofillData'], console.log)
```

**Manual trigger (in console):**
```javascript
// On a page with forms
document.dispatchEvent(new KeyboardEvent('keydown', {
  key: 'F',
  shiftKey: true,
  ctrlKey: true
}))
```

---

🎉 **Once all checks pass, your extension is working perfectly!**

