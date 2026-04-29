# Prompt Template Feature Implementation

## Overview
This feature adds the ability to select prompt templates when creating a bot. Templates are loaded from `prompts/PROMPTS.md` and displayed in a dropdown menu.

## What Was Added

### 1. **UI Changes in `index.html`**
- Added a **Prompt Template** dropdown in the "Create New Bot" modal
- Added an **Instructions** textarea field where the template content is displayed
- Modal width increased to accommodate the new fields

### 2. **JavaScript Functionality**
- **`loadPromptTemplates()`**: Fetches and parses `prompts/PROMPTS.md` to extract template names and content
  - Looks for sections starting with `## ` (double hash)
  - Extracts content from code blocks marked with ` ```md `
  
- **`populateTemplateDropdown()`**: Populates the dropdown with available templates

- **Template Selection Handler**: When a template is selected, the instructions textarea is automatically filled with the template content

- **Enhanced `createBot()` function**: Now accepts an `instructions` parameter and stores it with the bot

- **Enhanced `buildEnhancedHistory()` function**: 
  - For regular chats: Adds bot instructions as a system message at the beginning of the conversation
  - For group chats: Appends bot instructions to the existing group chat system message

### 3. **Server Configuration**
- Added `.md` MIME type to `serve.js` to properly serve markdown files

## How to Use

1. **Start the server**:
   ```bash
   node serve.js
   ```

2. **Open the application** in your browser:
   ```
   http://localhost:3000
   ```

3. **Create a new bot**:
   - Click the "New Bot" button in the sidebar
   - Enter a bot name (e.g., "Ethereum Expert")
   - Select a model (e.g., "gemma4:e4b")
   - **Select a template** from the "Prompt Template" dropdown (e.g., "Ethereum Developer")
   - The instructions textarea will auto-fill with the template content
   - Optionally edit the instructions as needed
   - Click "Create"

4. **Test the bot**:
   - The bot will now respond according to the instructions you provided
   - The instructions are sent as a system message with every conversation

## Template Format in PROMPTS.md

Templates are parsed from the `prompts/PROMPTS.md` file using this structure:

```markdown
## Template Name

```md
Your prompt template content here...
```
```

**Important Notes**:
- Template names are defined by `## ` headers (exactly 2 hash symbols)
- Template content must be inside ` ```md ` code blocks
- The parser skips `# ` (single hash) headers and `### ` (triple hash or more)

## Example Templates in PROMPTS.md

The file already contains many templates like:
- Ethereum Developer
- Linux Terminal
- English Translator and Improver
- Job Interviewer
- JavaScript Console
- And many more...

## Testing Checklist

- [x] Modal UI updated with template dropdown and instructions field
- [x] Templates are loaded from PROMPTS.md on page load
- [x] Dropdown is populated with template names
- [x] Selecting a template fills the instructions textarea
- [x] Creating a bot saves the instructions
- [x] Instructions are included in API calls as system messages
- [ ] Manual testing: Create a bot with a template and verify it responds accordingly

## Files Modified

1. **index.html**
   - Added template dropdown and instructions textarea to bot creation modal
   - Added `loadPromptTemplates()` and `populateTemplateDropdown()` functions
   - Modified `createBot()` to accept and save instructions
   - Modified `buildEnhancedHistory()` to include instructions in system messages
   - Added event handler for template selection

2. **serve.js**
   - Added `.md` to MIME types for serving markdown files

## Notes

- Instructions are optional - you can still create a bot without selecting a template
- Instructions can be manually edited after selecting a template
- Instructions are stored with the bot and persist across sessions
- For group chats, instructions are appended to the group identity system message
