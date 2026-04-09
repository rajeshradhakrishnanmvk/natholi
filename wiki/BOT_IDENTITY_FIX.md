# Bot Identity Enhancement for Group Chats

## Problem
In group chats, bots were losing their unique personality and identity because the conversation history passed to `ollama.chat()` didn't differentiate between which bot said what. All bots would see the same generic history format:

```javascript
[
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi there!' },  // Who said this?
  { role: 'assistant', content: 'Great to meet you!' }  // Who said this?
]
```

This caused bots to respond without maintaining their unique perspective, personality, or "soul".

## Solution
Implemented an **enhanced history system** that:

1. **Adds a system message** establishing the bot's identity
2. **Prefixes other bots' messages** with their names in square brackets
3. **Maintains each bot's unique perspective** throughout the conversation

### New Function: `buildEnhancedHistory(currentBot, history)`

This function transforms the shared history into a personalized view for each bot:

```javascript
// For regular chats: returns history as-is
// For group chats: returns enhanced history with:

[
  { 
    role: 'system', 
    content: 'You are Alice, participating in a group chat with: Bob, Carol.
              Your unique perspective and personality should come through...'
  },
  { role: 'user', content: 'Hello team!' },
  { role: 'assistant', content: '[Bob]: Great to chat with you!' },
  { role: 'assistant', content: '[Carol]: Excited to help!' }
]
```

## How It Works

### 1. System Message
Each bot receives a personalized system message:
```
You are {BotName}, participating in a group chat with: {OtherBots}.
Your unique perspective and personality should come through in your responses.
When you see messages from other bots, they will be prefixed with their name in square brackets.
Always respond as {BotName} with your own distinct voice and viewpoint.
```

### 2. Message Prefixing
- **User messages**: Passed through unchanged
- **Other bots' messages**: Prefixed with `[BotName]: content`
- **Current bot's messages**: Handled appropriately
- **Tool responses**: Passed through unchanged

### 3. Identity Preservation
Now when Bot Alice sees the history, she knows:
- She is Alice
- Who else is in the conversation
- Which bot said what (via the `[Name]:` prefix)
- She should maintain her unique perspective

## Files Modified

### `index.html`
- **Line 1936-1985**: Added `buildEnhancedHistory()` function
- **Line 1992-1993**: Modified `getBotResponse()` to use enhanced history
- **Line 2134**: Fixed `triggerNextBot` to pass bot name
- **Line 2159**: Fixed `triggerAllBots` to pass bot name

## Benefits

✅ **Each bot maintains its unique personality**
- Bots now know who they are
- Bots can reference other bots by name
- Responses reflect the bot's individual perspective

✅ **Better conversation flow**
- Clear attribution of messages
- Bots can respond to specific other bots
- More natural multi-agent conversations

✅ **Backward compatible**
- Regular (non-group) chats work exactly as before
- No breaking changes to existing functionality

## Example Before vs After

### Before (Missing Identity)
```
User: What's the best programming language?
Bot 1: Python is great for beginners
Bot 2: Python is great for beginners  // Repeats, no unique perspective
Bot 3: I agree with the previous responses  // Generic
```

### After (With Identity)
```
User: What's the best programming language?

Alice (sees: "You are Alice, chatting with Bob, Carol"):
> As Alice, I think Python is excellent for beginners due to its readability

Bob (sees: "[Alice]: As Alice, I think Python is excellent..."):
> While Alice makes good points, I'd argue that JavaScript offers more versatility

Carol (sees: "[Alice]: ...", "[Bob]: ..."):
> I appreciate both Alice and Bob's perspectives. From my experience...
```

## Testing

To test the enhanced identity system:

1. Create 2-3 bots with distinct names (e.g., "Alice", "Bob", "Carol")
2. Create a group chat with these bots
3. Send a message that requires different perspectives
4. Observe how each bot now:
   - Refers to themselves by name
   - References other bots' responses
   - Maintains unique viewpoints

## Technical Notes

- The `buildEnhancedHistory()` function only modifies the messages sent to the LLM
- The original shared history remains unchanged
- Each bot gets a fresh, personalized view on every response
- The system message is dynamically generated with current participant list
- Bot names are preserved in the `botName` field for UI display
