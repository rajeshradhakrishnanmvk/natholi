# Edit Web File Tool - Quick Start Guide

## What is it?

A safe way for the LLM to edit HTML, CSS, and JavaScript files **with your confirmation**. The AI proposes changes, you review and approve/reject them.

## How to Use

### For Users

1. **Ask the LLM to make changes:**
   ```
   "Add a blue button style to public/style.css"
   "Create a new HTML page at public/about.html"
   "Fix the JavaScript function in public/app.js"
   ```

2. **Review the confirmation modal** that appears:
   - Check the file path
   - Read the description of changes
   - Preview the new content

3. **Make your decision:**
   - Click **"Apply Changes"** to save
   - Click **"Reject Changes"** or press **Escape** to cancel

### For LLM

Call the `edit_web_file` tool with:
```json
{
  "file_path": "public/style.css",
  "new_content": "body { background: blue; }",
  "change_description": "Changed background to blue"
}
```

**Important**: Always provide complete file content, not just the changes.

## What Files Can Be Edited?

✅ **Allowed directories:**
- `public/`
- `teamgenz/`

✅ **Allowed file types:**
- `.html` (HTML files)
- `.css` (Stylesheets)
- `.js` (JavaScript files)

❌ **Not allowed:**
- Files in other directories (wiki/, root, etc.)
- Other file types (.txt, .json, .md, etc.)
- System files (serve.js, package.json, etc.)

## Common Use Cases

### 1. Create a new CSS file
```
User: "Create public/buttons.css with modern button styles"
```

### 2. Update existing HTML
```
User: "Add a contact form to public/contact.html"
```

### 3. Fix JavaScript bug
```
User: "Fix the validation function in public/utils.js"
```

### 4. Add new features
```
User: "Add a dark mode toggle to public/theme.css"
```

## Safety Features

🔒 **All changes require your approval** - Nothing is saved without clicking "Apply Changes"

🔒 **Restricted to safe directories** - Can't edit system files or sensitive locations

🔒 **File type validation** - Only web files (HTML/CSS/JS) can be edited

🔒 **Preview before apply** - See exactly what will be written

🔒 **Easy to cancel** - Reject button or Escape key

## Keyboard Shortcuts

- **Escape** - Close modal and reject changes
- **Enter** - (when focused on buttons) Confirm or cancel

## Troubleshooting

### Modal doesn't appear
- Check browser console for errors
- Ensure server is running (`npm start`)
- Verify the file path is in an allowed directory

### "Access denied" error
- Check if file is in `public/` or `teamgenz/`
- Verify file extension is `.html`, `.css`, or `.js`
- Path should be relative (e.g., `public/style.css` not `/public/style.css`)

### Changes not saved
- Make sure you clicked "Apply Changes"
- Check server console for errors
- Verify file permissions

### File path format
✅ Correct: `public/style.css`, `teamgenz/app.js`
❌ Wrong: `/public/style.css`, `./public/style.css`, `C:/path/to/file`

## Examples

### Example 1: Simple CSS Update
**Ask:**
```
Make all headings blue in public/style.css
```

**What happens:**
1. Modal shows the new CSS content
2. You see: `h1, h2, h3 { color: blue; }`
3. You click "Apply Changes"
4. File is saved
5. LLM confirms success

### Example 2: Create New Page
**Ask:**
```
Create a simple landing page at public/index.html
```

**What happens:**
1. Modal shows the complete HTML
2. You review the structure
3. You approve or reject
4. If approved, file is created

### Example 3: JavaScript Addition
**Ask:**
```
Add form validation to public/forms.js
```

**What happens:**
1. Modal previews the JavaScript code
2. You can check for any issues
3. Approve to save, reject to cancel

## Tips

💡 **Be specific** - Tell the LLM exactly what file and what changes

💡 **Review carefully** - The preview shows the ENTIRE new file content

💡 **Test after changes** - Refresh your page to see the changes take effect

💡 **Keep backups** - Consider using version control (git) for important files

💡 **Iterate** - If you reject, you can ask the LLM to try again with modifications

## Related Documentation

- 📖 Full documentation: `EDIT_WEB_FILE_TOOL.md`
- 🧪 Test plan: `EDIT_WEB_FILE_TEST_PLAN.md`
- 🔧 Implementation details: `EDIT_WEB_FILE_IMPLEMENTATION_SUMMARY.md`

## Quick Reference

| Feature | Value |
|---------|-------|
| Tool name | `edit_web_file` |
| Allowed dirs | `public/`, `teamgenz/` |
| Allowed types | `.html`, `.css`, `.js` |
| Requires approval | ✅ Yes |
| Can create new files | ✅ Yes |
| Can edit existing | ✅ Yes |
| Can delete content | ✅ Yes (by providing empty content) |
| Server endpoint | `POST /api/edit-web-file` |

---

**Remember:** This tool is designed to be safe. All changes require your explicit approval! 🛡️
