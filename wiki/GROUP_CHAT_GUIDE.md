# Group Chat Feature Guide

## 🎉 What's New

Your Ollama chat application now supports **multi-bot group conversations**!

## 🚀 How to Use

### Creating Individual Bots

1. Click **"+ New Bot"** in the sidebar
2. Enter a name (e.g., "Python Expert", "Creative Writer", "Data Analyst")
3. Specify the Ollama model (e.g., `gemma4:e4b`, `llama2`, `mistral`)
4. Click **"Create"**

### Creating a Group Chat

1. Create at least 2 individual bots first
2. Click **"👥 New Group Chat"** button
3. Give your group a name (e.g., "Brainstorm Team", "Code Review Panel")
4. Select which bots should participate (checkbox selection)
5. Click **"Create Group"**

### Using Group Chat

Once in a group chat, you have three options:

1. **Type and Send**: User sends a message → The next bot in rotation responds
2. **Next Bot Responds**: Triggers the next bot to respond to the conversation
3. **All Bots Respond**: All bots in the group respond sequentially

## 🎨 Visual Features

- **Group chats** have a purple left border in the sidebar
- **Participant badges** show all bots in the group
- **Bot name tags** appear on each message so you know who's speaking
- **Group controls** appear in the header when viewing a group chat

## 💡 Use Cases

### Brainstorming Session
- Create bots with different personas: "Optimist", "Realist", "Creative"
- Ask a question and watch them discuss from different perspectives

### Code Review
- Bots: "Security Expert", "Performance Analyst", "Code Quality"
- Share code and get multi-perspective feedback

### Creative Writing
- Bots: "Plot Developer", "Character Expert", "Editor"
- Collaborate on story ideas

### Learning & Research
- Bots: "Teacher", "Skeptic", "Researcher"
- Explore topics from multiple angles

## 🔧 Browser Tools

All bots in group chats have access to browser storage tools:
- **localStorage**: `get_local_storage`, `set_local_storage`, `list_local_storage`
- **sessionStorage**: `get_session_storage`, `set_session_storage`, `list_session_storage`
- **Cookies**: `get_cookies`, `set_cookie`
- **Clear all**: `clear_storage`

This means bots can:
- Remember information across conversations
- Share data with each other
- Maintain context and state

## 🎯 Example Workflow

1. Create three bots:
   - "Alice" (model: `gemma4:e4b`) - Helpful assistant
   - "Bob" (model: `gemma4:e4b`) - Technical expert  
   - "Carol" (model: `gemma4:e4b`) - Creative thinker

2. Create group: "Think Tank"
   - Add Alice, Bob, and Carol

3. Send message: "What's the best way to build a web app?"

4. Watch as:
   - Alice gives a general overview
   - Click "Next Bot Responds" → Bob discusses technical details
   - Click "Next Bot Responds" → Carol suggests creative approaches
   - Click "All Bots Respond" → Everyone weighs in on the discussion!

## 🎨 Architecture

```
User Message
    ↓
Conversation History (shared)
    ↓
Bot 1 reads history → generates response → adds to history
    ↓
Bot 2 reads updated history → generates response → adds to history
    ↓
Bot 3 reads updated history → generates response → adds to history
    ↓
All bots see the full conversation and build on each other's ideas!
```

## 🌟 Pro Tips

1. **Use different models** for different bot personalities
2. **Name bots clearly** so you know their role (e.g., "Debug Helper", "UX Designer")
3. **Start with 2-3 bots** per group for manageable conversations
4. **Use "Next Bot"** for controlled back-and-forth
5. **Use "All Bots"** when you want multiple perspectives quickly
