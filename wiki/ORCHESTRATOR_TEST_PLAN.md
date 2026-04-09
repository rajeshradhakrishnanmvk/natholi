# 🧪 Orchestrator Test Plan

## Prerequisites
- Ollama running locally on http://localhost:11434
- Model `gemma4:e4b` pulled and available
- Application running on http://localhost:3000

## Test Scenarios

### ✅ Test 1: Basic Orchestrator Toggle

**Steps:**
1. Open the application
2. Create a new bot "Bot A" with model `gemma4:e4b`
3. Create a new bot "Bot B" with model `gemma4:e4b`
4. Create a group chat "Test Group" with both bots
5. Verify orchestrator toggle appears in sidebar
6. Verify toggle is unchecked by default

**Expected Result:**
- ✅ Toggle appears only in group chat view
- ✅ Toggle is hidden in individual bot chats
- ✅ Default state is unchecked (orchestrator disabled)

---

### ✅ Test 2: Orchestrator Selection Visual Indicator

**Steps:**
1. Continue from Test 1
2. Enable "🎭 Use Orchestrator" checkbox
3. Send a message: "Hello bots!"
4. Observe the responding bot's name tag

**Expected Result:**
- ✅ Bot name tag has orange background
- ✅ Bot name tag shows 🎭 emoji prefix
- ✅ Console logs: "🎭 Orchestrator selected: [Bot Name]"

---

### ✅ Test 3: Round-Robin Fallback

**Steps:**
1. Continue from Test 2
2. Disable "🎭 Use Orchestrator" checkbox
3. Send a message: "Test round-robin"
4. Observe the responding bot's name tag

**Expected Result:**
- ✅ Bot name tag has purple background (normal)
- ✅ No 🎭 emoji prefix
- ✅ Round-robin selection occurs

---

### ✅ Test 4: Orchestrator Intelligent Selection

**Steps:**
1. Create three bots:
   - "Python Expert" (gemma4:e4b)
   - "UI Designer" (gemma4:e4b)
   - "Database Admin" (gemma4:e4b)
2. Create group chat "Dev Team" with all three
3. Enable orchestrator
4. Send: "How do I design a login form?"
5. Note which bot responds
6. Send: "What's the best database for user data?"
7. Note which bot responds
8. Send: "Show me Python code to hash passwords"
9. Note which bot responds

**Expected Result:**
- ✅ UI Designer likely responds to design question
- ✅ Database Admin likely responds to database question
- ✅ Python Expert likely responds to Python question
- ✅ All responses show 🎭 orange badge

---

### ✅ Test 5: Settings Persistence

**Steps:**
1. Create a group chat
2. Enable orchestrator
3. Refresh the page (F5)
4. Navigate back to the group chat
5. Check orchestrator toggle state

**Expected Result:**
- ✅ Orchestrator toggle remains checked
- ✅ Setting persists across page reload

---

### ✅ Test 6: Multiple Group Chats - Independent Settings

**Steps:**
1. Create Group A with orchestrator enabled
2. Create Group B with orchestrator disabled
3. Switch between Group A and Group B
4. Verify toggle state for each

**Expected Result:**
- ✅ Group A shows checked toggle
- ✅ Group B shows unchecked toggle
- ✅ Each group remembers its own setting

---

### ✅ Test 7: "Next Bot Responds" Button with Orchestrator

**Steps:**
1. Open a group chat with orchestrator enabled
2. Click "Next Bot Responds" button
3. Observe which bot responds
4. Check console logs

**Expected Result:**
- ✅ Orchestrator selects appropriate bot
- ✅ Console shows orchestrator decision
- ✅ Orange badge displayed

---

### ✅ Test 8: "All Bots Respond" Functionality

**Steps:**
1. Open a group chat with 3 bots, orchestrator enabled
2. Send a message
3. Click "All Bots Respond" button
4. Observe the order of responses

**Expected Result:**
- ✅ All bots respond in sequence
- ✅ Each maintains their badge style
- ✅ No errors in console

---

### ✅ Test 9: Fallback to Round-Robin on Error

**Steps:**
1. Create group chat with orchestrator enabled
2. Stop Ollama service temporarily
3. Send a message
4. Observe console logs

**Expected Result:**
- ✅ Console shows orchestrator error
- ✅ Console shows "🔄 Fallback to round-robin"
- ✅ Conversation continues with round-robin
- ✅ No application crash

---

### ✅ Test 10: Orchestrator with Long Conversation

**Steps:**
1. Create group chat with 3 specialized bots
2. Enable orchestrator
3. Have a 10+ message conversation with varied topics
4. Observe bot selection patterns

**Expected Result:**
- ✅ Orchestrator considers recent context (last 5 messages)
- ✅ Appropriate bots selected for topics
- ✅ No performance degradation
- ✅ Conversation flows naturally

---

## Performance Checks

### Response Time
- **Without Orchestrator:** ~2-5 seconds for bot response
- **With Orchestrator:** ~3-7 seconds (includes decision time)
- **Acceptable:** Under 10 seconds total

### Console Logs
Check for these log patterns:
```
✅ "🎭 Orchestrator selected: [Bot Name]"
✅ "🔄 Fallback to round-robin: [Bot Name]"
❌ No JavaScript errors
❌ No undefined variable errors
```

### Memory Usage
- No memory leaks after extended use
- localStorage grows reasonably with conversation history
- Page remains responsive

---

## Edge Cases

### Edge Case 1: Single Bot in Group
**Test:** Create group with only 1 bot, enable orchestrator
**Expected:** Orchestrator always selects the only available bot

### Edge Case 2: Empty Conversation
**Test:** Enable orchestrator in new group with no history
**Expected:** Orchestrator makes decision based on participant list only

### Edge Case 3: Very Similar Bot Names
**Test:** Create "Bot 1", "Bot 2", "Bot 3" with same model
**Expected:** Orchestrator works but may not have clear differentiation

---

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari

---

## Regression Testing

Ensure existing features still work:
- ✅ Individual bot chats function normally
- ✅ Group chats work without orchestrator
- ✅ Memory Palace integration intact
- ✅ Browser storage tools functional
- ✅ Image/audio uploads work
- ✅ Chat history persists correctly

---

## Success Criteria

The orchestrator feature is considered successful if:

1. ✅ Toggle appears and functions correctly in group chats
2. ✅ Visual indicators (orange badges) display properly
3. ✅ Intelligent bot selection occurs based on context
4. ✅ Settings persist across sessions
5. ✅ Fallback to round-robin works when needed
6. ✅ No breaking changes to existing functionality
7. ✅ Performance remains acceptable
8. ✅ Console logs provide useful debugging info
9. ✅ User experience is enhanced, not complicated
10. ✅ Documentation is clear and comprehensive

---

## Bug Report Template

If issues are found:

```markdown
### Bug: [Short Description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**


**Actual Behavior:**


**Console Errors:**


**Browser:** 
**Ollama Version:** 
**Model:** 
```

---

**Happy Testing! 🎭**
