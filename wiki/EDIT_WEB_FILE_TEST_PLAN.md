# Edit Web File Tool - Test Plan

## Overview
This document outlines test scenarios for the `edit_web_file` LLM tool.

## Pre-Test Setup

1. Start the server: `npm start`
2. Open the chat interface at `http://localhost:3000`
3. Create a test bot or use an existing one
4. Ensure the `public/` and `teamgenz/` directories exist

## Test Scenarios

### 1. Basic Functionality Tests

#### Test 1.1: Edit Existing CSS File
**User Request:**
```
Edit public/test.css to add a red background color to the body
```

**Expected Behavior:**
1. LLM calls `edit_web_file` with appropriate parameters
2. Confirmation modal appears showing:
   - File path: `public/test.css`
   - Description of changes
   - Preview of CSS content
3. User clicks "Apply Changes"
4. File is saved successfully
5. LLM receives success message

**Verification:**
- Check that `public/test.css` contains the new content
- Check that the LLM response indicates success

#### Test 1.2: Create New HTML File
**User Request:**
```
Create a new file public/hello.html with a simple Hello World page
```

**Expected Behavior:**
1. Confirmation modal appears with new file content
2. After approval, new file is created
3. LLM receives success message

**Verification:**
- Verify `public/hello.html` exists and contains correct content

#### Test 1.3: Edit JavaScript File
**User Request:**
```
Add a simple greeting function to public/utils.js
```

**Expected Behavior:**
1. Modal shows JavaScript code preview
2. After approval, file is updated
3. Success confirmation returned

### 2. User Confirmation Tests

#### Test 2.1: User Approves Changes
**Steps:**
1. Request a file edit
2. When modal appears, click "Apply Changes"

**Expected:**
- File is saved
- Modal closes
- LLM receives success message

#### Test 2.2: User Rejects Changes
**Steps:**
1. Request a file edit
2. When modal appears, click "Reject Changes"

**Expected:**
- File is NOT modified
- Modal closes
- LLM receives error/cancellation message

#### Test 2.3: User Presses Escape Key
**Steps:**
1. Request a file edit
2. When modal appears, press Escape key

**Expected:**
- File is NOT modified
- Modal closes
- LLM receives error/cancellation message

### 3. Security Tests

#### Test 3.1: Attempt to Edit File in Disallowed Directory
**User Request:**
```
Edit wiki/test.md to add some content
```

**Expected Behavior:**
- Server returns 403 Forbidden
- Error message indicates only `public/` and `teamgenz/` are allowed
- No modal is shown

#### Test 3.2: Attempt to Edit Root Directory File
**User Request:**
```
Edit serve.js to add a comment
```

**Expected Behavior:**
- Access denied error
- File is NOT modified

#### Test 3.3: Attempt to Edit Non-Allowed File Type
**User Request:**
```
Edit public/data.txt with some new text
```

**Expected Behavior:**
- Server returns 403 Forbidden
- Error message indicates only `.html`, `.css`, `.js` files are allowed

#### Test 3.4: Attempt Path Traversal Attack
**User Request:**
```
Edit public/../serve.js to add malicious code
```

**Expected Behavior:**
- Path normalization prevents traversal
- Access denied error

### 4. Edge Cases

#### Test 4.1: Empty File Content
**Tool Call:**
```json
{
  "file_path": "public/empty.css",
  "new_content": "",
  "change_description": "Create empty CSS file"
}
```

**Expected:**
- Modal shows empty preview
- After approval, empty file is created

#### Test 4.2: Very Large File
**Tool Call:**
```json
{
  "file_path": "public/large.js",
  "new_content": "<10000 lines of code>",
  "change_description": "Add large JavaScript library"
}
```

**Expected:**
- Modal shows preview (scrollable)
- File saves successfully after approval

#### Test 4.3: Special Characters in Content
**Tool Call:**
```json
{
  "file_path": "public/special.html",
  "new_content": "<!DOCTYPE html>\n<html>\n<body>\n<p>Special chars: @#$%^&*()[]{}|\\</p>\n</body>\n</html>",
  "change_description": "HTML with special characters"
}
```

**Expected:**
- Special characters are preserved
- File saves correctly

#### Test 4.4: Missing Required Parameters
**Tool Call:**
```json
{
  "file_path": "public/test.css",
  "new_content": ".test {}"
  // Missing change_description
}
```

**Expected:**
- Error message about missing parameters
- No modal shown

### 5. Integration Tests

#### Test 5.1: Multiple Sequential Edits
**Steps:**
1. Edit public/style1.css
2. Approve changes
3. Edit public/style2.css
4. Approve changes

**Expected:**
- Both files are updated correctly
- Each operation completes independently

#### Test 5.2: Edit, Reject, Then Edit Again
**Steps:**
1. Request edit for public/test.html
2. Reject changes
3. Request same edit again
4. Approve changes

**Expected:**
- First attempt is cancelled
- Second attempt succeeds

## Manual Testing Checklist

- [ ] CSS file edit with approval works
- [ ] HTML file edit with approval works
- [ ] JavaScript file edit with approval works
- [ ] User can reject changes successfully
- [ ] Escape key cancels the operation
- [ ] Files outside `public/` and `teamgenz/` are blocked
- [ ] Non-HTML/CSS/JS files are blocked
- [ ] Modal displays file path correctly
- [ ] Modal displays description correctly
- [ ] Modal displays content preview correctly
- [ ] Success message includes file sizes
- [ ] New file creation works
- [ ] Editing existing file works
- [ ] Special characters are handled correctly
- [ ] Large files can be edited
- [ ] Empty content is handled correctly

## Automated Testing Notes

For automated testing, you could:
1. Mock the confirmation modal to auto-approve/reject
2. Verify file contents after operations
3. Check server response codes
4. Validate error messages

## Troubleshooting

### Issue: Modal doesn't appear
**Solution:** Check browser console for errors, verify modal HTML elements exist

### Issue: Changes not saved despite approval
**Solution:** Check server console for write errors, verify file permissions

### Issue: Wrong directory allowed
**Solution:** Review `allowedPaths` array in serve.js

### Issue: Wrong file type allowed
**Solution:** Review `allowedExtensions` array in serve.js
