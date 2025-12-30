# 🚀 AutoFill Pro

A Chrome extension that automatically fills forms with your personal information, addresses, and credentials.

![AutoFill Pro](icons/icon128.png)

## ✨ Features

- 🔐 Secure local storage (Chrome encrypted API)
- 🎯 Smart field detection for any website
- 📝 Supports personal info, addresses, and credentials
- 🎨 Beautiful gradient UI with response modals
- ⌨️ Keyboard shortcut: `Ctrl/Cmd+Shift+F`
- 🔽 Dropdown support (state, country, etc.)

## 📦 Installation

1. Open `chrome://extensions/` in Chrome
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the `extension` folder
4. Pin the extension (optional)

**Quick start:** See [docs/QUICKSTART.md](docs/QUICKSTART.md)

## 🎯 Usage

1. Click the extension icon
2. Enter your info in the three tabs (Personal, Address, Credentials)
3. Click "Save Data"
4. Navigate to any form → Click extension → "Fill Current Page"
5. Or use keyboard shortcut: `Ctrl/Cmd+Shift+F`

## 🏗️ Structure

```
extension/
├── manifest.json, popup.*, content.js, background.js  # Core files
├── icons/           # Extension icons
├── docs/            # Documentation  
│   └── QUICKSTART.md
└── demo/            # Test files
    ├── test-form.html
    └── modal-demo.html
```

## 🧪 Testing

- **Test auto-fill**: Open `demo/test-form.html`
- **Preview modals**: Open `demo/modal-demo.html`

## 🐛 Troubleshooting

**Extension not working?**
- Refresh the page after installation
- Check if data is saved in the popup
- Open DevTools (F12) for errors

**Fields not filling?**
- Website may use non-standard field names
- Add custom patterns in `content.js` if needed

## 🔒 Security

- All data stored locally (no servers)
- Uses Chrome's encrypted storage API  
- No tracking or analytics
- ⚠️ Store passwords at your own risk

---

**Built with Chrome Extension APIs**
