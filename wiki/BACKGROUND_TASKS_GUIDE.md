# 🚀 Background Tasks Feature Guide

## Overview

The **Background Tasks** feature allows you to run long-running bot tasks in the background while you continue chatting with other bots. This is perfect for tasks like writing stories, generating reports, analyzing data, or any other time-consuming work that doesn't need your immediate attention.

## 🎯 What Does It Do?

- **Non-blocking execution**: Start a task and continue using the app
- **Multiple simultaneous tasks**: Run several background tasks at once
- **Task monitoring**: Track active and completed tasks in real-time
- **Result retrieval**: View and insert completed task results into your current chat
- **Persistent history**: Tasks are saved and survive page refreshes

## 🚀 How to Use

### Starting a Background Task

1. **Click "🚀 Start Background Task"** in the sidebar
2. **Fill in the task details**:
   - **Task Name** (optional): A short description for easy identification
   - **Select Bot**: Choose which bot should handle the task
   - **Task Prompt**: The actual instruction for the bot (e.g., "Write a short story about a robot learning to paint")
3. **Click "Start Task"**

### Monitoring Tasks

1. **Click "📋 View Tasks"** in the sidebar to open the tasks panel
2. The panel shows two sections:
   - **⏳ Active Tasks**: Currently running tasks with cancel option
   - **📋 Completed Tasks**: Finished tasks with results

### Viewing Results

1. Open the **Tasks Panel**
2. Find your completed task
3. Click **"👁️ View"** to insert the result into your current chat
4. The result appears as a bot message with metadata

### Managing Tasks

- **Cancel a running task**: Click "🚫 Cancel" on any active task
- **Delete a completed task**: Click "🗑️" on any completed task
- **Clear all completed tasks**: Click "Clear All" at the top of completed tasks section

## 📊 Task Status Indicators

- ⏳ **Running**: Task is currently being processed (animated pulse)
- ✅ **Completed**: Task finished successfully (green border)
- ❌ **Failed**: Task encountered an error (red border)
- 🚫 **Cancelled**: Task was cancelled by user (yellow border)

## 🔔 Notifications

The system shows toast notifications for:
- 📝 **Task started**: Confirms your task has begun
- ✅ **Task completed**: Alerts you when a task finishes successfully
- ❌ **Task failed**: Notifies you of any errors
- 🚫 **Task cancelled**: Confirms task cancellation

## 💡 Use Cases

### 1. Creative Writing
```
Task Name: Fantasy Short Story
Bot: Creative Writer
Prompt: Write a 1000-word fantasy short story about a dragon who becomes a librarian
```

### 2. Code Generation
```
Task Name: React Component
Bot: Python Expert
Prompt: Create a fully documented React component for a data visualization dashboard with TypeScript
```

### 3. Data Analysis
```
Task Name: Market Research
Bot: Data Analyst
Prompt: Analyze the top 10 trends in AI technology for 2024 and provide a detailed report
```

### 4. Content Creation
```
Task Name: Blog Post
Bot: Content Creator
Prompt: Write a comprehensive blog post about the benefits of meditation, including scientific studies
```

## 🔧 Technical Details

- Tasks run asynchronously without blocking the UI
- Each task maintains its own conversation context
- Results are stored in localStorage for persistence
- Maximum of 20 completed tasks are kept in history
- Tasks use the same Ollama backend as regular chats

## ⚡ Tips & Best Practices

1. **Use descriptive task names** to easily identify tasks later
2. **Choose the right bot** for each task based on their specialization
3. **Be specific in prompts** to get better results
4. **Monitor the active tasks badge** on the "View Tasks" button
5. **Clear completed tasks regularly** to keep the interface clean
6. **Cancel unnecessary tasks** to free up resources

## 🎨 UI Features

- **Badge counter**: Shows number of active tasks
- **Color-coded status**: Quick visual identification of task states
- **Animated indicators**: Pulsing animation for running tasks
- **Slide-in panel**: Smooth panel transition from the right
- **Toast notifications**: Non-intrusive status updates

## 🔮 Future Enhancements (Coming Soon)

- Task progress tracking with percentage
- Scheduled/delayed task execution
- Task templates for common operations
- Export task results to files
- Task dependencies and chaining
- Batch task execution

## 🐛 Troubleshooting

**Task shows as failed?**
- Check if Ollama is running on http://localhost:11434
- Verify the selected bot's model is available
- Check the browser console for error details

**Task takes too long?**
- Complex prompts may take several minutes
- Consider breaking large tasks into smaller ones
- Monitor the active tasks panel for progress

**Results not showing?**
- Ensure you're viewing the completed tasks section
- Check that the task completed successfully (green ✅ icon)
- Try refreshing the page if the panel is stuck

## 📝 Notes

- Background tasks continue even if you switch between bots
- Tasks are local to your browser (not shared across devices)
- Closing the browser tab will stop any running tasks
- Task history persists in localStorage across sessions
