# 🎭 Orchestrator Feature Guide

## Overview

The **Orchestrator** is an intelligent conversation manager that decides which bot should respond next in a group chat based on context, expertise, and conversation flow.

## 🎯 What Does It Do?

Instead of using simple round-robin rotation, the orchestrator:
- **Analyzes the conversation context**
- **Considers each bot's expertise** (based on name and model)
- **Selects the most appropriate bot** to respond
- **Creates more natural conversation flow**

## 🚀 How to Use

### 1. Create a Group Chat
- You need at least 2 bots created first
- Click "👥 New Group Chat"
- Select your bots and create the group

### 2. Enable the Orchestrator
- Switch to your group chat
- Look for the **"🎭 Use Orchestrator"** checkbox in the sidebar
- Toggle it ON to enable intelligent bot selection

### 3. Start Chatting
- Send a message or click "Next Bot Responds"
- The orchestrator will analyze the conversation and select the best bot to respond
- Selected bots will have a **🎭 orange badge** indicating orchestrator selection

## 🎨 Visual Indicators

| Indicator | Meaning |
|-----------|---------|
| 🎭 Orange badge | Bot was selected by the orchestrator |
| Regular purple badge | Bot was selected by round-robin |

## 💡 How It Works

The orchestrator:

1. **Examines recent conversation history** (last 5 messages)
2. **Reviews all participant bots** and their characteristics
3. **Uses an AI model** to intelligently decide who should respond
4. **Falls back to round-robin** if orchestration fails

### Decision Factors

The orchestrator considers:
- **Topic relevance** - Which bot is best suited for the current topic?
- **Conversation flow** - Who would provide the most valuable perspective?
- **Bot expertise** - Implied by bot names (e.g., "Python Expert", "Creative Writer")
- **Model capabilities** - Different models have different strengths

## 🔧 Technical Details

### Orchestrator Prompt Structure

```
You are an intelligent conversation orchestrator managing a group chat.

Participants:
1. Bot Name 1 (model-name)
2. Bot Name 2 (model-name)
...

Recent conversation:
[Last 5 messages]

Select the bot number (1-N) that should respond next.
```

### Example Scenario

**Group Chat: "Dev Team"**
- Alice (gemma4:e4b) - General assistant
- Bob (gemma4:e4b) - Python expert
- Carol (gemma4:e4b) - UI/UX specialist

**User:** "How can I improve the login page design?"

**Without Orchestrator:** Next bot in rotation (might be Bob, the Python expert)

**With Orchestrator:** Selects Carol (UI/UX specialist) - most relevant to the question! 🎯

## 📊 Benefits

✅ **More relevant responses** - Right bot for the right question
✅ **Natural conversation flow** - Like a real team discussion
✅ **Better use of specialized bots** - Each bot's expertise is utilized
✅ **Flexible** - Can toggle on/off per group chat

## 🎮 Use Cases

### Brainstorming Team
Create bots with different thinking styles:
- "Optimist" - Looks for opportunities
- "Realist" - Analyzes feasibility
- "Devil's Advocate" - Finds potential issues

The orchestrator will select the most appropriate voice for each stage of discussion.

### Multi-Domain Support
Create expert bots for different areas:
- "Frontend Dev"
- "Backend Dev"
- "Database Expert"
- "Security Specialist"

Ask a question and the orchestrator routes it to the right expert!

### Creative Writing
- "Plot Developer"
- "Character Builder"
- "Dialogue Writer"
- "Editor"

The orchestrator manages the creative process intelligently.

## 🔍 Console Logs

When orchestrator is active, check the browser console for:
- `🎭 Orchestrator selected: [Bot Name]` - Orchestrator made a choice
- `🔄 Fallback to round-robin: [Bot Name]` - Using fallback method

## ⚙️ Settings Persistence

The orchestrator preference is saved **per group chat**. This means:
- Each group can have orchestrator enabled or disabled independently
- Settings persist across browser sessions (stored in localStorage)
- Switching between groups remembers your preference

## 🎯 Best Practices

1. **Name your bots descriptively** - Helps orchestrator make better decisions
   - ✅ "Python Expert", "Design Specialist"
   - ❌ "Bot1", "Bot2"

2. **Create specialized bots** - More distinct expertise = better orchestration
   
3. **Use for complex discussions** - Orchestrator shines when context matters

4. **Monitor selections** - Watch which bots get selected to see if orchestrator is working well

5. **Fallback is always available** - If orchestrator fails, round-robin ensures conversation continues

## 🛠️ Troubleshooting

**Orchestrator not appearing?**
- Make sure you're in a group chat (not individual bot chat)
- Toggle should appear in the sidebar when viewing a group

**Always falls back to round-robin?**
- Check console for errors
- Ensure Ollama is running
- First bot's model must be available for orchestration queries

**Unexpected bot selections?**
- Bot names may not clearly indicate expertise
- Try more descriptive names
- Orchestrator learns from conversation context

## 🚀 Future Enhancements

Potential improvements:
- Custom orchestrator prompts per group
- Different orchestration strategies (democratic, expert-only, etc.)
- Learning from user feedback on selections
- Orchestrator explanation mode (why this bot was chosen)

---

**Enjoy smarter group conversations with the Orchestrator! 🎭**
