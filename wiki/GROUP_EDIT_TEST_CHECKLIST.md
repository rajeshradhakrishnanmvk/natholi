# Group Edit Feature - Test Checklist

Use this checklist to verify the group edit functionality works correctly.

## ✅ Pre-requisites

- [ ] Open `index.html` in a web browser
- [ ] Ensure Ollama is running (for bot functionality testing)
- [ ] Clear localStorage if you want to start fresh: `localStorage.clear()` in console

---

## 🧪 Test Cases

### Test 1: Create Initial Setup
- [ ] Create at least 3 individual bots (e.g., "Alice", "Bob", "Charlie")
- [ ] Create a group chat with 2 bots (e.g., "Team A" with Alice and Bob)
- [ ] Verify the group appears in sidebar with:
  - Purple left border
  - 👥 icon
  - Participant badges showing "Alice" and "Bob"

### Test 2: Open Edit Modal
- [ ] Click the edit button (✎) on the group chat
- [ ] Verify the "Edit Group Chat" modal opens
- [ ] Verify the group name field shows "Team A"
- [ ] Verify Alice and Bob are pre-checked
- [ ] Verify Charlie appears but is unchecked

### Test 3: Add a Bot to Group
- [ ] In the edit modal, check "Charlie"
- [ ] Click "Save Changes"
- [ ] Verify the modal closes
- [ ] Verify the sidebar now shows 3 participant badges: Alice, Bob, Charlie
- [ ] Verify no errors in browser console

### Test 4: Remove a Bot from Group
- [ ] Click edit button (✎) on "Team A" again
- [ ] Uncheck "Bob"
- [ ] Click "Save Changes"
- [ ] Verify the sidebar now shows 2 participant badges: Alice, Charlie
- [ ] Verify Bob badge is removed

### Test 5: Rename Group
- [ ] Click edit button (✎) on "Team A"
- [ ] Change name to "Super Team"
- [ ] Click "Save Changes"
- [ ] Verify sidebar shows "👥 Super Team"
- [ ] If viewing the group, verify header shows "Super Team"

### Test 6: Validation - Minimum 2 Bots
- [ ] Click edit button (✎) on the group
- [ ] Uncheck all bots except one
- [ ] Click "Save Changes"
- [ ] Verify an alert appears: "Please select at least 2 bots for the group chat"
- [ ] Verify the modal stays open
- [ ] Check one more bot and save successfully

### Test 7: Validation - Group Name Required
- [ ] Click edit button (✎)
- [ ] Clear the group name field
- [ ] Click "Save Changes"
- [ ] Verify alert: "Please enter a group name"
- [ ] Enter a name and save successfully

### Test 8: Cancel Edit
- [ ] Click edit button (✎)
- [ ] Make some changes (rename, check/uncheck bots)
- [ ] Click "Cancel"
- [ ] Verify modal closes
- [ ] Verify no changes were applied

### Test 9: Escape Key to Close
- [ ] Click edit button (✎)
- [ ] Press "Escape" key
- [ ] Verify modal closes
- [ ] Verify no changes were applied

### Test 10: Edit While Viewing Group
- [ ] Switch to the group chat (click on it in sidebar)
- [ ] Verify group controls are visible (Next Bot, All Bots buttons)
- [ ] Click edit button (✎) from sidebar
- [ ] Rename the group to something new
- [ ] Click "Save Changes"
- [ ] Verify the header immediately updates with the new name

### Test 11: Multiple Groups
- [ ] Create a second group "Team B" with different bots
- [ ] Edit "Team B" 
- [ ] Verify it shows Team B's current participants, not Team A's
- [ ] Make changes to Team B
- [ ] Verify Team A remains unchanged

### Test 12: Edit Button Styling
- [ ] Verify edit button (✎) has purple color
- [ ] Hover over edit button
- [ ] Verify purple background appears on hover
- [ ] Verify edit button only appears on group chats, not individual bots

### Test 13: Delete vs Edit
- [ ] Hover over the edit button (✎)
- [ ] Hover over the delete button (×)
- [ ] Verify tooltips show correctly
- [ ] Click edit button - modal should open
- [ ] Click delete button - confirmation should appear

### Test 14: Persistence
- [ ] Edit a group and add/remove bots
- [ ] Refresh the page (F5)
- [ ] Verify all changes persisted
- [ ] Verify participant badges show correct bots

### Test 15: Checkbox Click Behavior
- [ ] Open edit modal
- [ ] Click directly on a checkbox - should toggle
- [ ] Click on the bot name/model area - should also toggle the checkbox
- [ ] Verify smooth UX for both click targets

---

## 🐛 Common Issues to Check

- [ ] Browser console shows no JavaScript errors
- [ ] All modals close properly without leaving overlay
- [ ] No duplicate bots appear in participant badges
- [ ] Deleted individual bots don't break group display
- [ ] Long group names don't break layout
- [ ] Many participant badges wrap properly

---

## ✨ Bonus: Real Conversation Test

- [ ] Create a group with 2 bots
- [ ] Send a message and verify both bots can respond
- [ ] Edit the group to add a third bot
- [ ] Click "All Bots Respond"
- [ ] Verify all 3 bots (including the newly added one) respond
- [ ] Edit the group to remove a bot
- [ ] Click "All Bots Respond"
- [ ] Verify only the remaining bots respond

---

## 📊 Test Summary

Total Tests: 15 core tests + 1 bonus test
Expected Result: All checkboxes should pass ✅

If any test fails, check:
1. Browser console for errors
2. localStorage data structure
3. Modal state variables (editingGroupId)

---

## 🎯 Success Criteria

- ✅ All 15 core tests pass
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Changes persist across page refreshes
- ✅ Group conversations work with modified participant lists
