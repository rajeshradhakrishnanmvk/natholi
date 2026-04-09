# Delete Message Feature - Test Scenarios

## Test Scenario 1: Basic Delete Functionality
**Steps:**
1. Open the chat application
2. Send a message: "Hello, can you help me?"
3. Verify that a "🗑️ Delete Message" button appears below the message
4. Click the delete button
5. Confirm the deletion in the dialog
6. Verify the message is removed from the chat

**Expected Result:**
✅ Message is deleted from both UI and conversation history
✅ Chat is re-rendered without the deleted message
✅ Console shows: "✅ Message deleted from history"

---

## Test Scenario 2: Delete Button Only on Last Message
**Steps:**
1. Send message 1: "First message"
2. Wait for LLM response
3. Send message 2: "Second message"
4. Verify delete button appears ONLY on message 2

**Expected Result:**
✅ No delete button on message 1
✅ Delete button appears only on the last user message (message 2)

---

## Test Scenario 3: Delete Button Disappears After Response
**Steps:**
1. Send a message: "What is 2+2?"
2. Verify delete button appears
3. Wait for LLM to respond
4. Verify delete button disappears after response

**Expected Result:**
✅ Delete button visible before response
✅ Delete button removed after LLM responds

---

## Test Scenario 4: Cancel Deletion
**Steps:**
1. Send a message: "Test message"
2. Click the delete button
3. Click "Cancel" in the confirmation dialog
4. Verify the message remains in chat

**Expected Result:**
✅ Message is NOT deleted
✅ Message remains visible in chat
✅ Conversation history unchanged

---

## Test Scenario 5: Delete with Media
**Steps:**
1. Upload an image or audio file
2. Add text: "Check this out"
3. Send the message
4. Verify delete button appears
5. Delete the message
6. Verify both text and media are removed

**Expected Result:**
✅ Delete button appears on message with media
✅ Entire message (text + media) is deleted
✅ Media preview is removed from chat

---

## Test Scenario 6: Delete in Group Chat
**Steps:**
1. Create or open a group chat
2. Send a user message
3. Verify delete button appears
4. Delete the message
5. Verify group chat history is updated

**Expected Result:**
✅ Delete button appears in group chat
✅ Message is deleted from group chat history
✅ Other participants' messages remain intact

---

## Test Scenario 7: Persistence After Page Reload
**Steps:**
1. Send a message: "Test persistence"
2. Note the message exists
3. Reload the page
4. Verify the message is still there
5. Delete the message
6. Reload the page again
7. Verify the message is gone

**Expected Result:**
✅ Deleted message does NOT reappear after reload
✅ History is properly saved to localStorage
✅ Chat state persists correctly

---

## Test Scenario 8: Multiple Bots
**Steps:**
1. Create multiple bots
2. Switch to Bot A
3. Send a message
4. Delete the message
5. Switch to Bot B
6. Verify Bot B's history is unaffected
7. Switch back to Bot A
8. Verify the message is still deleted

**Expected Result:**
✅ Deletion only affects the current bot's history
✅ Other bots' histories remain unchanged
✅ Deletion persists when switching between bots

---

## Test Scenario 9: Edge Case - Empty Message
**Steps:**
1. Send a message with only media (no text)
2. Verify delete button appears
3. Delete the message
4. Verify it's removed properly

**Expected Result:**
✅ Delete button works with media-only messages
✅ Message is properly deleted

---

## Test Scenario 10: UI/UX Verification
**Steps:**
1. Send a message
2. Hover over the delete button
3. Verify visual feedback (color change)
4. Check button styling matches design
5. Verify emoji icon displays correctly

**Expected Result:**
✅ Delete button has red border (#ef4444)
✅ Hover effect shows background color change
✅ 🗑️ emoji displays correctly
✅ Button is properly aligned and sized
✅ Button matches the dark theme design

---

## Browser Compatibility Tests
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## Performance Tests
- ✅ Delete message with large media files
- ✅ Delete from long conversation history (100+ messages)
- ✅ Rapid delete/cancel actions
- ✅ Memory cleanup after deletion
