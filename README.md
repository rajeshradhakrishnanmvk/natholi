# Ollama Chat

A powerful multi-bot chat interface for Ollama with intelligent orchestration and memory management.

## Features

- 🤖 **Multi-Bot Chats** - Create multiple bots with different personalities and models
- 👥 **Group Conversations** - Multiple bots discussing together in one chat
- 🎭 **Intelligent Orchestrator** - AI-powered bot selection based on context and expertise
- 🏛️ **Memory Palace** - Advanced hierarchical memory architecture
- 🔧 **Browser Tools** - Access localStorage, sessionStorage, cookies, IndexedDB, and Cache
- 💭 **Thinking Visualization** - See the AI's thought process
- 📡 **Streaming Responses** - Real-time response streaming
- 🖼️ **Multi-Modal Support** - Images and audio in conversations

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

## 🚀 Quick Start Guide

### Creating Bots
1. Click "**+ New Bot**" in the sidebar
2. Enter a descriptive name (e.g., "Python Expert", "Creative Writer")
3. Specify the Ollama model (e.g., `gemma4:e4b`)
4. Start chatting!

### Creating Group Chats
1. Create at least 2 individual bots first
2. Click "**👥 New Group Chat**"
3. Select which bots should participate
4. Watch them discuss together!

### Using the Orchestrator 🎭
1. Open a group chat
2. Enable "**🎭 Use Orchestrator**" in the sidebar
3. The AI will intelligently select which bot should respond based on:
   - Topic relevance
   - Bot expertise (from names)
   - Conversation flow
   - Recent context

**Visual indicators:**
- 🎭 **Orange badge** = Bot selected by orchestrator
- **Purple badge** = Round-robin selection

See [ORCHESTRATOR_GUIDE.md](ORCHESTRATOR_GUIDE.md) for detailed documentation.

## 📚 Documentation

- **[GROUP_CHAT_GUIDE.md](GROUP_CHAT_GUIDE.md)** - Complete group chat feature guide
- **[ORCHESTRATOR_GUIDE.md](ORCHESTRATOR_GUIDE.md)** - Intelligent orchestrator documentation
- **[MEMORY_PALACE_GUIDE.md](MEMORY_PALACE_GUIDE.md)** - Memory architecture guide
- **[ORCHESTRATOR_IMPLEMENTATION.md](ORCHESTRATOR_IMPLEMENTATION.md)** - Technical implementation details

## Available Tools

### localStorage
- `get_local_storage`, `set_local_storage`, `remove_local_storage`, `list_local_storage`

### sessionStorage
- `get_session_storage`, `set_session_storage`, `list_session_storage`

### Cookies
- `get_cookies`, `set_cookie`

### Utility
- `clear_storage` - Clear all storage

## Examples

### Simple Chat
```
You: Store my name as John in localStorage
AI: ✅ Successfully set name in localStorage

You: What's in my localStorage?
AI: {"name": "John"}
```

### Group Chat with Orchestrator
```
Create 3 bots:
- "Alice" - Python Expert (gemma4:e4b)
- "Bob" - UI Designer (gemma4:e4b)
- "Carol" - Database Guru (gemma4:e4b)

Create group "Dev Team", enable orchestrator

You: How should I structure the login page?
🎭 Bob responds: [UI design suggestions...]

You: What's the best way to store user sessions?
🎭 Carol responds: [Database recommendations...]

You: How do I hash passwords in Python?
🎭 Alice responds: [Python code example...]
```

The orchestrator intelligently routes questions to the right expert! 🎯

## 🎯 Use Cases

- **Multi-perspective brainstorming** - Different bots, different viewpoints
- **Expert consultation** - Route questions to specialized bots
- **Creative writing** - Separate bots for plot, characters, dialogue
- **Code review** - Different bots check different aspects
- **Learning** - Teach concepts from multiple angles

## 🔧 Advanced Features

### Memory Palace
Access the Memory Palace (🏛️ button) to:
- Browse conversation history by topic
- Navigate hierarchical memory structure
- Search and retrieve past discussions

### Multi-Modal
- Upload images for analysis
- Upload audio for transcription
- Visual media in chat history

### Browser Storage
Full access to all 5 browser storage APIs:
- localStorage (persistent)
- sessionStorage (tab-scoped)
- Cookies (with expiration)
- IndexedDB (structured data)
- Cache Storage (offline data)

## License

ISC
