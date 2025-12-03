# 🚀 AutoFill Pro - Chrome Extension

A powerful Chrome extension that automatically fills forms with your personal information, addresses, and credentials on any website.

![AutoFill Pro](icons/icon128.png)

## ✨ Features

- 🔐 **Secure Local Storage** - All data stored locally using Chrome's encrypted storage API
- 🎯 **Smart Field Detection** - Automatically detects form fields using multiple strategies
- 📝 **Comprehensive Data Support** - Handles personal info, addresses, and credentials
- 🎨 **Beautiful UI** - Modern, intuitive interface with gradient design
- 📱 **Works Everywhere** - Compatible with any website
- 🔽 **Dropdown Support** - Intelligently fills select dropdowns (country, state, etc.)
- ⌨️ **Keyboard Shortcut** - Quick fill with `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac)
- 🖱️ **Right-Click Menu** - Context menu option for easy access
- 💾 **No Database Required** - Everything stored locally, no backend needed

## 📦 Installation

### Method 1: Load Unpacked (Developer Mode)

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd extension
   ```

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `extension` folder from this project

5. **Pin the extension** (optional)
   - Click the puzzle icon in Chrome toolbar
   - Pin "AutoFill Pro" for easy access

### Method 2: Package and Install (Optional)

1. Go to `chrome://extensions/`
2. Click "Pack extension"
3. Select the extension directory
4. Install the generated `.crx` file

## 🎯 Usage

### Setting Up Your Data

1. **Click the extension icon** in your Chrome toolbar
2. **Enter your information** across three tabs:
   - **Personal Info**: Name, email, phone
   - **Address**: Street address, city, state, ZIP, country
   - **Credentials**: Username, default password
3. **Click "💾 Save Data"** to store your information

### Filling Forms

**Option 1: Extension Popup**
- Navigate to any webpage with a form
- Click the extension icon
- Click "✨ Fill Current Page"

**Option 2: Keyboard Shortcut**
- Press `Ctrl+Shift+F` (Windows/Linux)
- Press `Cmd+Shift+F` (Mac)

**Option 3: Right-Click Menu**
- Right-click on any form field
- Select "✨ AutoFill this form"

### Managing Data

- **Update Data**: Simply edit fields in the popup and click "Save Data"
- **Clear Data**: Click "🗑️ Clear All Data" to remove all stored information

## 🔍 How It Works

### Field Detection

The extension uses intelligent pattern matching to identify form fields:

1. **HTML Attributes**: `name`, `id`, `type`, `autocomplete`, `placeholder`, `aria-label`
2. **Common Patterns**: "email", "firstname", "address", "city", "zip", etc.
3. **Fuzzy Matching**: Handles variations like "first-name", "first_name", "fname"

### Supported Field Types

| Category | Fields |
|----------|--------|
| **Personal** | First Name, Last Name, Full Name, Email, Phone |
| **Address** | Address Line 1 & 2, City, State/Province, ZIP/Postal Code, Country |
| **Credentials** | Username, Password |

### Dropdown Handling

The extension intelligently handles `<select>` dropdowns:
- Matches by value first
- Falls back to text content matching
- Supports partial matching (e.g., "United States" matches "US")

## 🏗️ Project Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup logic and data management
├── content.js            # Content script (form detection & filling)
├── background.js         # Background service worker
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## 🔒 Security & Privacy

- ✅ **All data stored locally** on your device
- ✅ **No external servers** or data transmission
- ✅ **Uses Chrome's encrypted storage API**
- ✅ **No tracking or analytics**
- ⚠️ **Password storage**: Store passwords at your own risk

### Security Best Practices

1. **Don't store sensitive passwords** - Use a dedicated password manager for critical accounts
2. **Use unique test passwords** for form testing
3. **Regular data review** - Periodically update your stored information
4. **Keep Chrome updated** - Ensures latest security patches

## 🛠️ Development

### Technologies Used

- **JavaScript (ES6+)** - Core logic
- **HTML5 & CSS3** - User interface
- **Chrome Extension APIs** - Storage, tabs, messaging
- **Manifest V3** - Latest Chrome extension format

### Customization

**Modify field detection patterns** in `content.js`:
```javascript
// Add custom field identifiers
if (fieldIdentifier.includes('your-custom-pattern')) {
  valueToFill = data.yourCustomField;
}
```

**Change keyboard shortcut** in `content.js`:
```javascript
if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'YourKey') {
  fillFormFields();
}
```

**Customize UI colors** in `popup.css`:
```css
background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
```

## 🐛 Troubleshooting

### Extension not filling fields?

1. **Refresh the page** after installing the extension
2. **Check if data is saved** - Open popup and verify your information
3. **Look for console errors** - Open DevTools (F12) and check the console
4. **Try the keyboard shortcut** - Sometimes the popup button may have issues

### Some fields not detected?

- The website might use non-standard field names
- Check the browser console for logs showing which fields were detected
- You can manually inspect field attributes and add custom patterns to `content.js`

### Dropdown not filling correctly?

- Ensure your stored value matches an option in the dropdown
- Try using common abbreviations (e.g., "NY" for New York)
- Check the dropdown's `<option>` values in the page source

## 🚀 Future Enhancements

Potential features for future versions:

- [ ] Multiple profile support (work, personal, etc.)
- [ ] Credit card information storage
- [ ] Import/Export data functionality
- [ ] Custom field mapping for specific websites
- [ ] Biometric authentication integration
- [ ] Dark mode support
- [ ] Cloud sync across devices
- [ ] Form template recognition

## 📝 License

This project is open source. Feel free to modify and distribute as needed.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## ⚠️ Disclaimer

This extension is provided as-is. Users are responsible for the security of their stored data. For highly sensitive information, please use dedicated password managers with enterprise-grade encryption.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using Chrome Extension APIs**
