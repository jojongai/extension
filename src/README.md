# AutoFill Pro - Source Code Structure

This directory contains the modular source code for the AutoFill Pro extension, organized similar to a full-stack web application.

## Directory Structure

```
src/
├── components/       # UI Components (React-like modular components)
│   ├── Tabs.js              # Tab navigation component
│   ├── PasswordToggle.js    # Password visibility toggle
│   ├── FormManager.js       # Form data binding and management
│   └── ActionButtons.js     # Action button handlers
│
├── services/         # Business Logic Layer
│   ├── StorageService.js    # Chrome storage operations
│   └── FormFillerService.js # Form filling operations
│
├── models/           # Data Models
│   └── AutofillData.js      # Autofill data structure and validation
│
├── utils/            # Utility Functions
│   ├── dom.js              # DOM manipulation helpers
│   └── validators.js        # Input validation functions
│
├── styles/           # CSS Stylesheets
│   ├── variables.css        # CSS variables and design tokens
│   ├── base.css             # Base styles and reset
│   └── components.css       # Component-specific styles
│
└── popup.js          # Main application entry point
```

## Architecture Overview

### Components Layer
- **Tabs.js**: Manages tab switching functionality
- **PasswordToggle.js**: Handles password visibility toggle
- **FormManager.js**: Manages form data binding between UI and data model
- **ActionButtons.js**: Handles all action button events (Save, Fill, Clear)

### Services Layer
- **StorageService.js**: Abstracts Chrome storage API operations
  - `load()`: Load data from storage
  - `save(data)`: Save data to storage
  - `clear()`: Clear all stored data

- **FormFillerService.js**: Handles form filling on web pages
  - `fillCurrentPage()`: Fill forms on the current active tab
  - `getAutofillData()`: Get autofill data for form filling

### Models Layer
- **AutofillData.js**: Data model class with validation
  - `toObject()`: Convert to plain object
  - `isEmpty()`: Check if data is empty
  - `isValidEmail()`: Validate email format

### Utils Layer
- **dom.js**: DOM manipulation utilities
- **validators.js**: Input validation functions

## Benefits of This Structure

1. **Separation of Concerns**: Each module has a single responsibility
2. **Reusability**: Components and services can be easily reused
3. **Testability**: Each module can be tested independently
4. **Maintainability**: Easy to locate and modify specific functionality
5. **Scalability**: Easy to add new features without affecting existing code
6. **Type Safety**: Clear data models and interfaces

## Usage Example

```javascript
// Main app initialization
import { StorageService } from './services/StorageService.js';
import { FormManager } from './components/FormManager.js';

const formManager = new FormManager();
const data = await StorageService.load();
formManager.loadData(data);
```

## Adding New Features

1. **New Component**: Add to `src/components/`
2. **New Service**: Add to `src/services/`
3. **New Utility**: Add to `src/utils/`
4. **New Model**: Add to `src/models/`
5. **New Style**: Add to `src/styles/` or extend existing files

## ES Modules

This project uses ES6 modules (`import`/`export`), which are supported in Chrome extensions with Manifest V3. Make sure to use `type="module"` in script tags.

