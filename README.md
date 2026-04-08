# Ollama Chat

A simple chat interface for Ollama with browser storage tools.

## Features

- 🤖 **Chat with Ollama** - Conversation with local LLM models
- 🔧 **Browser Tools** - Access localStorage, sessionStorage, and cookies
- 💭 **Thinking Visualization** - See the AI's thought process
- 📡 **Streaming Responses** - Real-time response streaming

## Requirements

- Node.js (v14+)
- Ollama running locally
- Ollama model: `gemma4:e4b` (or `gemma2:2b` for faster responses)

## Setup

1. **Install Ollama** from https://ollama.ai

2. **Pull a model**
   ```bash
   ollama pull gemma4:e4b
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open browser** at `http://localhost:3000`

## Available Tools

### localStorage
- `get_local_storage`, `set_local_storage`, `remove_local_storage`, `list_local_storage`

### sessionStorage
- `get_session_storage`, `set_session_storage`, `list_session_storage`

### Cookies
- `get_cookies`, `set_cookie`

### Utility
- `clear_storage` - Clear all storage

## Example

```
You: Store my name as John in localStorage
AI: ✅ Successfully set name in localStorage

You: What's in my localStorage?
AI: {"name": "John"}
```

## License

ISC
