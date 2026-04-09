# Edit Web File Tool

## Overview

The `edit_web_file` tool allows the LLM to propose changes to HTML, CSS, and JavaScript files with user confirmation. This tool provides a safe way for the AI assistant to make file modifications by showing the user a preview and requiring explicit approval before applying changes.

## Tool Specification

### Function Name
`edit_web_file`

### Description
Propose changes to HTML, CSS, or JavaScript files. The user will be shown a confirmation dialog with the proposed changes before they are applied. Only works for files in 'public' and 'teamgenz' folders.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | The relative path to the file to edit (e.g., 'public/style.css', 'teamgenz/index.html') |
| `new_content` | string | Yes | The complete new content for the file |
| `change_description` | string | Yes | A clear description of what changes are being made and why (shown to user for confirmation) |

### Returns
On approval: Success message with file path and size information
On rejection: Error indicating user cancelled the operation

## Security Features

### Path Restrictions
For security reasons, the tool only allows editing files in specific whitelisted directories:
- `public/` - Public web assets
- `teamgenz/` - TeamGenz project files

Any attempt to edit files outside these directories will result in an "Access denied" error.

### File Type Restrictions
The tool only allows editing the following file types:
- `.html` - HTML files
- `.css` - CSS stylesheets
- `.js` - JavaScript files

Any attempt to edit other file types will result in an "Access denied" error.

## User Confirmation Flow

1. **LLM Proposes Changes**: The LLM calls the `edit_web_file` tool with the file path, new content, and description
2. **Modal Appears**: A confirmation modal is shown to the user with:
   - The file path being modified
   - A description of the changes
   - A preview of the new file content (syntax highlighted)
3. **User Decision**: The user can either:
   - **Apply Changes**: Confirms and saves the new content to the file
   - **Reject Changes**: Cancels the operation (can also press Escape key)
4. **Result Returned**: The tool returns the result to the LLM indicating success or cancellation

## Examples

### Example 1: Update CSS Styles

**User Request:**
```
Make the buttons have rounded corners and a blue background
```

**LLM Tool Call:**
```json
{
  "name": "edit_web_file",
  "arguments": {
    "file_path": "public/style.css",
    "new_content": ".btn {\n  background-color: #007bff;\n  border-radius: 8px;\n  padding: 10px 20px;\n  border: none;\n  color: white;\n}\n",
    "change_description": "Updated button styles to have rounded corners (8px border-radius) and blue background (#007bff)"
  }
}
```

**User sees modal with:**
- File Path: `public/style.css`
- Description: "Updated button styles to have rounded corners (8px border-radius) and blue background (#007bff)"
- Preview of the new CSS code

**On approval, LLM receives:**
```
✅ File public/style.css was successfully updated!
File public/style.css updated successfully
Original size: 0 bytes
New size: 156 bytes
```

### Example 2: Add JavaScript Functionality

**User Request:**
```
Add a function to validate email addresses
```

**LLM Tool Call:**
```json
{
  "name": "edit_web_file",
  "arguments": {
    "file_path": "public/validation.js",
    "new_content": "function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}\n\nexport { validateEmail };\n",
    "change_description": "Added email validation function that checks for valid email format using regex pattern"
  }
}
```

### Example 3: Create New HTML Page

**User Request:**
```
Create a simple about page
```

**LLM Tool Call:**
```json
{
  "name": "edit_web_file",
  "arguments": {
    "file_path": "public/about.html",
    "new_content": "<!DOCTYPE html>\n<html>\n<head>\n  <title>About Us</title>\n</head>\n<body>\n  <h1>About Us</h1>\n  <p>Welcome to our application!</p>\n</body>\n</html>\n",
    "change_description": "Created a new about.html page with basic structure and welcome message"
  }
}
```

## Use Cases

1. **Code Modifications**: Update existing HTML, CSS, or JavaScript files based on user requests
2. **Bug Fixes**: Fix issues in web files after user reports problems
3. **Feature Additions**: Add new functionality to existing web pages
4. **Style Changes**: Modify CSS to change the appearance of web pages
5. **File Creation**: Create new web files when they don't exist yet

## Implementation Details

### Server Side (serve.js)
- **Endpoint**: `/api/edit-web-file` (POST)
- **Request Body**: JSON with `filePath` and `newContent`
- **Security Validation**: 
  - Checks if file is in allowed directory (`public/` or `teamgenz/`)
  - Checks if file has allowed extension (`.html`, `.css`, `.js`)
- **File Writing**: Uses Node.js `fs/promises.writeFile()` to save content
- **Response**: JSON with success status, message, and file size information

### Client Side (index.html)
- **Tool Definition**: Added to the `tools` array with complete parameter specification
- **Confirmation Modal**: 
  - Shows file path, change description, and content preview
  - Provides "Apply Changes" and "Reject Changes" buttons
  - Can be closed with Escape key
- **Promise-based Execution**: 
  - The tool returns a Promise that waits for user confirmation
  - Resolved when user clicks "Apply Changes"
  - Rejected when user clicks "Reject Changes" or presses Escape

## Error Handling

The tool handles several error scenarios:

1. **Access Denied - Wrong Directory**: When trying to edit files outside `public/` or `teamgenz/`
2. **Access Denied - Wrong File Type**: When trying to edit non-HTML/CSS/JS files
3. **Missing Parameters**: When required parameters are not provided
4. **User Cancellation**: When user rejects the changes or closes the modal
5. **Network Errors**: Connection issues between client and server
6. **File Write Errors**: Permission or disk space issues

## Testing

See the companion document `EDIT_WEB_FILE_TEST_PLAN.md` for comprehensive testing scenarios.
