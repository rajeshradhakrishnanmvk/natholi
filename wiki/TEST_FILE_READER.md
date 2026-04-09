# Testing the File Reader Tool

## Quick Start Test

### 1. Start the Server
```bash
npm start
```

Expected output:
```
Server running at http://localhost:3000
Open http://localhost:3000 in your browser
```

### 2. Open Browser
Navigate to: `http://localhost:3000`

### 3. Test Queries

Try these queries in order to test different aspects of the tool:

#### Test 1: Read Markdown Files from Wiki
```
Read all markdown files from the wiki folder
```

**Expected Result:**
- Should list all .md files in the wiki folder
- Each file should show name, path, size, and full content
- Should include files like:
  - GROUP_CHAT_GUIDE.md
  - MEMORY_PALACE_GUIDE.md
  - ORCHESTRATOR_GUIDE.md
  - FILE_READER_TOOL.md (the new documentation)

#### Test 2: Read JavaScript Files from Public
```
Show me all JavaScript files in the public folder
```

**Expected Result:**
- Should list all .js files in the public folder
- Should include files like:
  - aaak.js
  - mempalace.js
  - storage-manager.js
  - palace-manager.js
  - palace-ui.js
  - memory-stack.js

#### Test 3: Read All Files from Root (No Filter)
```
What files are in the root directory?
```

**Expected Result:**
- Should list ALL files in root (no extension filter)
- Should include:
  - index.html
  - serve.js
  - package.json
  - README.md
  - IMPLEMENTATION_SUMMARY.md
  - TEST_FILE_READER.md

#### Test 4: Filter by Extension
```
Show me only the HTML file in the root directory
```

**Expected Result:**
- Should only show index.html

#### Test 5: Security Test (Should Fail)
```
Read files from the node_modules folder
```

**Expected Result:**
- Should return an error message
- Error: "Access denied to this folder"
- This confirms security is working

## Detailed Testing Checklist

### ✅ Functionality Tests

- [ ] Tool is listed in available tools
- [ ] Tool can read files from allowed directories
- [ ] Extension filtering works correctly
- [ ] File contents are displayed completely
- [ ] File metadata (name, path, size) is correct
- [ ] Multiple files are handled properly
- [ ] Empty folders return appropriate message

### ✅ Security Tests

- [ ] Cannot read from node_modules
- [ ] Cannot read from parent directories (../)
- [ ] Cannot read from system directories
- [ ] Only whitelisted directories are accessible:
  - [ ] `.` (root)
  - [ ] `wiki`
  - [ ] `public`
  - [ ] `teamgenz`

### ✅ Error Handling Tests

- [ ] Non-existent folder returns error
- [ ] Non-existent extension filter returns empty result
- [ ] Binary files are skipped gracefully
- [ ] Network errors are handled properly

### ✅ Integration Tests

- [ ] Works in single bot chat
- [ ] Works in group chat
- [ ] Works with other tools (can be used alongside storage tools)
- [ ] Works with Memory Palace
- [ ] Tool calls are recorded in chat history

## Expected Tool Call Format

When the LLM uses the tool, you should see something like this in the network inspector:

**Request:**
```
GET /api/read-folder?path=wiki&ext=.md
```

**Response:**
```json
{
  "files": [
    {
      "name": "GROUP_CHAT_GUIDE.md",
      "path": "wiki/GROUP_CHAT_GUIDE.md",
      "size": 4521,
      "content": "# Group Chat Feature Guide\n\n..."
    },
    {
      "name": "MEMORY_PALACE_GUIDE.md",
      "path": "wiki/MEMORY_PALACE_GUIDE.md",
      "size": 6789,
      "content": "# Memory Palace Guide\n\n..."
    }
  ]
}
```

## Troubleshooting

### Issue: Tool not appearing in tool calls
**Solution:** Check that the tools array in index.html includes the new tool definition

### Issue: 404 error when calling API
**Solution:** Verify serve.js has the /api/read-folder endpoint and server is running

### Issue: Access denied for allowed folders
**Solution:** Check the allowedPaths array in serve.js includes the folder

### Issue: Files show as empty
**Solution:** Check file encoding (must be UTF-8 text files, not binary)

### Issue: Tool calls but returns error
**Solution:** Check browser console and server console for detailed error messages

## Advanced Testing

### Test with Large Folders
```
Read all files from the wiki folder
```
Monitor performance with many files.

### Test with Mixed Extensions
```
Show me all files in the public folder
```
Verify it handles .js, .css, etc.

### Test Nested Paths (if implemented)
```
Read files from wiki/subfolder
```
Check if nested paths work correctly.

## Success Criteria

✅ The tool is successfully implemented if:

1. LLM can read files from whitelisted directories
2. Extension filtering works correctly
3. Security prevents access to restricted directories
4. File contents are displayed accurately
5. Error handling works gracefully
6. Tool integrates with existing features

## Next Steps After Testing

Once testing is complete:

1. Document any bugs found
2. Add more allowed directories if needed
3. Consider implementing pagination for large results
4. Add file size limits if needed
5. Consider recursive directory reading
6. Add more sophisticated filtering options
