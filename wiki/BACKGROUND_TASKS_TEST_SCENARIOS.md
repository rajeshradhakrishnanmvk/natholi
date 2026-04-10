# Background Tasks - Test Scenarios

## Test Checklist

### ✅ Basic Functionality

#### Test 1: Start a Background Task
1. Open the application
2. Click "🚀 Start Background Task" button
3. Fill in:
   - Task Name: "Test Story"
   - Select Bot: Choose any available bot
   - Prompt: "Write a very short story about a cat"
4. Click "Start Task"
5. **Expected**: 
   - Modal closes
   - Toast notification appears: "📝 Task started"
   - Task appears in active tasks panel

#### Test 2: Monitor Active Tasks
1. After starting a task from Test 1
2. Click "📋 View Tasks" button
3. **Expected**:
   - Panel slides in from right
   - Active task shows with ⏳ icon
   - Task has pulsing animation
   - Shows bot name and task name
   - "Cancel" button is visible

#### Test 3: View Completed Task
1. Wait for task from Test 1 to complete
2. **Expected**:
   - Toast notification: "✅ Task completed"
   - Task moves to "Completed Tasks" section
   - Shows ✅ icon with green border
   - "View" button appears
   - Active tasks badge count decreases

#### Test 4: Insert Task Result
1. Click "View Tasks" to open panel
2. Find completed task
3. Click "👁️ View" button
4. **Expected**:
   - Result appears in current chat
   - Shows as assistant message
   - Includes bot name with "(Background Task)" suffix
   - Contains the full response

### ✅ Multiple Tasks

#### Test 5: Run Multiple Tasks Simultaneously
1. Create 3 different bots with different names
2. Start 3 background tasks with different prompts:
   - Bot 1: "Count to 5"
   - Bot 2: "List 3 colors"
   - Bot 3: "Name 2 animals"
3. **Expected**:
   - All 3 tasks appear in active tasks
   - Badge shows "3"
   - Tasks can complete independently
   - Each moves to completed when done

#### Test 6: Chat While Tasks Run
1. Start a background task with a long prompt
2. While task runs, chat with current bot
3. **Expected**:
   - Chat works normally
   - No blocking or freezing
   - Background task continues
   - Can send/receive messages freely

### ✅ Task Management

#### Test 7: Cancel Running Task
1. Start a task with long prompt
2. Open tasks panel
3. Click "🚫 Cancel" button
4. **Expected**:
   - Task moves to completed section
   - Shows 🚫 icon with yellow border
   - Status shows as "cancelled"
   - Toast notification appears

#### Test 8: Delete Completed Task
1. Have at least one completed task
2. Open tasks panel
3. Click "🗑️" button on a completed task
4. **Expected**:
   - Task is removed from list
   - UI updates immediately
   - No error messages

#### Test 9: Clear All Completed Tasks
1. Have multiple completed tasks
2. Open tasks panel
3. Click "Clear All" button
4. **Expected**:
   - All completed tasks removed
   - Shows "No completed tasks" message
   - Active tasks remain unaffected

### ✅ UI/UX

#### Test 10: Badge Counter
1. Start background task
2. Check "View Tasks" button
3. **Expected**:
   - Badge appears with count "1"
   - Badge is red colored
   - Count increases with each new task
   - Count decreases when tasks complete

#### Test 11: Notifications
1. Perform various task actions
2. **Expected notifications**:
   - Task started: Blue border, info style
   - Task completed: Green border, success style
   - Task failed: Red border, error style
   - Task cancelled: Yellow border, warning style
   - Notifications auto-dismiss after 5 seconds

#### Test 12: Panel Animations
1. Click "View Tasks"
2. Click close button (✕)
3. **Expected**:
   - Panel slides in smoothly from right
   - Panel slides out smoothly to right
   - No jarring movements
   - Overlay/backdrop appears if applicable

### ✅ Persistence

#### Test 13: Page Refresh
1. Start a background task
2. Refresh the page
3. **Expected**:
   - Active tasks are NOT restored (they were running)
   - Completed tasks ARE restored
   - Task history is preserved

#### Test 14: Switch Bots
1. Start a background task
2. Switch to different bot
3. Chat with new bot
4. **Expected**:
   - Background task continues
   - Can view tasks from any bot context
   - Task results can be inserted into any chat

### ✅ Error Handling

#### Test 15: Failed Task
1. Stop Ollama service
2. Try to start a background task
3. **Expected**:
   - Task shows as failed (❌)
   - Red border on task item
   - Error notification appears
   - No crash or freeze

#### Test 16: Empty Prompt
1. Click "Start Background Task"
2. Leave prompt empty
3. Click "Start Task"
4. **Expected**:
   - Alert: "Please select a bot and enter a prompt"
   - Modal stays open
   - No task created

#### Test 17: No Bots Available
1. Delete all bots except one
2. Delete the last bot
3. Open background task modal
4. **Expected**:
   - Bot selector is empty or shows message
   - Can't create task without bots

### ✅ Edge Cases

#### Test 18: Very Long Task
1. Create task with complex prompt requiring 30+ seconds
2. Monitor while it runs
3. **Expected**:
   - Task runs to completion
   - UI remains responsive
   - No timeout errors

#### Test 19: Task Result Display
1. Create task with prompt generating markdown/code
2. View the result
3. **Expected**:
   - Markdown is properly rendered
   - Code blocks have syntax highlighting
   - Formatting is preserved

#### Test 20: Maximum Tasks
1. Start 10+ background tasks
2. **Expected**:
   - All tasks tracked correctly
   - UI performs well
   - Scroll works in tasks panel
   - Only last 20 completed tasks kept

## Success Criteria

- ✅ All basic functionality tests pass
- ✅ Multiple tasks can run simultaneously
- ✅ UI remains responsive during task execution
- ✅ Notifications work correctly
- ✅ Task persistence works as expected
- ✅ Error handling is graceful
- ✅ No memory leaks or performance issues
