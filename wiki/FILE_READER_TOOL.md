# File Reader Tool

## Overview

The `read_files_from_folder` tool allows the LLM to read files from specified folders in the workspace. This is useful for analyzing documentation, reading code files, or processing multiple files at once.

## Tool Specification

### Function Name
`read_files_from_folder`

### Description
Read all files from a specified folder path. Returns a list of files with their names and contents.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_path` | string | Yes | The folder path to read files from (e.g., 'wiki', 'public', '.') |
| `file_extension` | string | No | Optional file extension filter (e.g., '.md', '.js', '.html') |

### Returns
A formatted string containing:
- List of files found
- For each file:
  - File name
  - Full path
  - File size (in bytes)
  - Complete file content

## Security

For security reasons, the tool only allows reading from specific whitelisted directories:
- `.` (root directory)
- `wiki`
- `public`
- `teamgenz`

Any attempt to read from other directories will result in a "Access denied" error.

## Examples

### Example 1: Read All Markdown Files from Wiki Folder

**User Request:**
```
Read all markdown files from the wiki folder
```

**LLM Tool Call:**
```json
{
  "name": "read_files_from_folder",
  "arguments": {
    "folder_path": "wiki",
    "file_extension": ".md"
  }
}
```

**Response:**
```
Files in folder 'wiki':

Found 10 file(s) with extension '.md':

--- File 1: GROUP_CHAT_GUIDE.md ---
Path: wiki/GROUP_CHAT_GUIDE.md
Size: 4521 bytes
Content:
# Group Chat Feature Guide
...

--- File 2: MEMORY_PALACE_GUIDE.md ---
Path: wiki/MEMORY_PALACE_GUIDE.md
Size: 6789 bytes
Content:
# Memory Palace Guide
...
```

### Example 2: Read All JavaScript Files from Public Folder

**User Request:**
```
Show me all the JavaScript files in the public folder
```

**LLM Tool Call:**
```json
{
  "name": "read_files_from_folder",
  "arguments": {
    "folder_path": "public",
    "file_extension": ".js"
  }
}
```

### Example 3: Read All Files from Root Directory

**User Request:**
```
What files are in the root directory?
```

**LLM Tool Call:**
```json
{
  "name": "read_files_from_folder",
  "arguments": {
    "folder_path": "."
  }
}
```

## Use Cases

1. **Documentation Analysis**: Read all documentation files to answer questions about the project
2. **Code Review**: Analyze multiple code files to understand structure and patterns
3. **Configuration Review**: Read configuration files to help with setup or debugging
4. **Content Summarization**: Summarize multiple documents at once
5. **File Search**: Find specific information across multiple files

## Implementation Details

### Client Side (index.html)
- Tool definition added to the `tools` array
- Implementation in `executeToolCall` function makes a fetch request to `/api/read-folder`
- Handles errors gracefully

### Server Side (serve.js)
- New API endpoint: `/api/read-folder`
- Query parameters: `path` and `ext`
- Security validation for allowed paths
- Reads directory contents using Node.js `fs/promises`
- Filters files by extension if specified
- Returns JSON with file metadata and contents

## Error Handling

The tool handles several error scenarios:

1. **Access Denied**: When trying to read from non-whitelisted directories
2. **Folder Not Found**: When the specified folder doesn't exist
3. **Read Errors**: When individual files can't be read (skips them)
4. **Network Errors**: Connection issues between client and server

## Testing

To test the new tool:

1. Start the server: `npm start`
2. Open the chat interface at `http://localhost:3000`
3. Ask the LLM: "Read all markdown files from the wiki folder"
4. Verify the response contains file contents

## Notes

- Binary files are skipped (only text files are read)
- Subdirectories are not traversed (only files in the specified folder)
- Large files will be included in full (consider implementing size limits if needed)
- The tool is synchronous from the LLM's perspective but asynchronous internally
