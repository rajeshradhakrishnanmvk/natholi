# Testing the Prompt Template Feature

## Quick Test Steps

### 1. Start the Server
```bash
node serve.js
```
Expected output:
```
Server running at http://localhost:3000
Open http://localhost:3000 in your browser
```

### 2. Open the Application
Navigate to: `http://localhost:3000`

### 3. Create a Bot with Template

**Test Case 1: Ethereum Developer Bot**

1. Click the **"New Bot"** button in the sidebar
2. Fill in the form:
   - **Bot Name**: `Ethereum Expert`
   - **Model**: `gemma4:e4b` (or your preferred model)
   - **Prompt Template**: Select **"Ethereum Developer"** from dropdown
   
3. Verify:
   - ✅ The Instructions textarea should auto-fill with the Ethereum Developer prompt
   - ✅ The content should say something like: "Imagine you are an experienced Ethereum developer..."

4. Click **"Create"**

5. Test the bot:
   - Send message: `Create a simple smart contract for storing a message`
   - Expected: Bot should respond as an Ethereum developer with smart contract code

**Test Case 2: Linux Terminal Bot**

1. Click **"New Bot"** again
2. Fill in the form:
   - **Bot Name**: `Linux Terminal`
   - **Model**: `gemma4:e4b`
   - **Prompt Template**: Select **"Linux Terminal"** from dropdown

3. Verify:
   - ✅ Instructions should auto-fill with Linux Terminal prompt

4. Click **"Create"**

5. Test the bot:
   - Send message: `pwd`
   - Expected: Bot should respond as if it's a Linux terminal

**Test Case 3: Custom Instructions (No Template)**

1. Click **"New Bot"** again
2. Fill in the form:
   - **Bot Name**: `Custom Bot`
   - **Model**: `gemma4:e4b`
   - **Prompt Template**: Leave as **"-- Select a template --"**
   - **Instructions**: Manually type: `You are a helpful assistant who speaks like a pirate.`

3. Click **"Create"**

4. Test the bot:
   - Send message: `Hello, how are you?`
   - Expected: Bot should respond in pirate speak

**Test Case 4: Edit Template After Selection**

1. Click **"New Bot"** again
2. Select **"Motivational Coach"** from dropdown
3. Edit the instructions to add: `Always end your responses with an inspiring quote.`
4. Create the bot
5. Test that it includes quotes in responses

## Verification Checklist

### UI Verification
- [ ] Dropdown shows "-- Select a template --" as default
- [ ] Dropdown is populated with template names (Ethereum Developer, Linux Terminal, etc.)
- [ ] Selecting a template fills the instructions textarea
- [ ] Instructions can be manually edited after template selection
- [ ] Modal has increased width to accommodate new fields
- [ ] Instructions field has proper placeholder text

### Functionality Verification
- [ ] Bot saves instructions to localStorage (check Application > Local Storage in DevTools)
- [ ] Instructions persist after page reload
- [ ] Bot uses instructions when responding
- [ ] Multiple bots can have different instructions
- [ ] Creating a bot without template (empty instructions) still works
- [ ] Group chat bots also support instructions

### Console Verification
Open browser DevTools (F12) and check Console for:
- [ ] Message: `Loaded X prompt templates` (where X is the number of templates)
- [ ] No errors related to template loading
- [ ] Templates are logged if you add `console.log(promptTemplates)` temporarily

## Sample Prompts to Test Different Templates

| Template | Test Prompt | Expected Behavior |
|----------|-------------|-------------------|
| Ethereum Developer | `Create a simple voting smart contract` | Provides Solidity code |
| JavaScript Console | `console.log("Hello")` | Returns console output |
| English Translator | `istanbulu cok seviyom` | Translates to English |
| Storyteller | `Tell me a story about courage` | Creates an engaging story |
| Math Teacher | `Explain the Pythagorean theorem` | Explains with examples |
| Poet | `Write a poem about the ocean` | Creates a poem |

## Debugging

If templates don't load:

1. **Check browser console** for errors
2. **Verify PROMPTS.md** exists at `/prompts/PROMPTS.md`
3. **Check network tab** to see if the file is being fetched
4. **Test manually**:
   ```javascript
   // In browser console:
   fetch('/prompts/PROMPTS.md')
     .then(r => r.text())
     .then(console.log)
   ```

If instructions aren't being used:

1. **Check localStorage**: Application > Local Storage > bots object should have `instructions` field
2. **Check network**: Look at the request to Ollama API - should include system message with instructions
3. **Add debug logging**: Temporarily add `console.log(enhancedHistory)` in `getBotResponse()`

## Success Criteria

✅ All test cases pass
✅ No console errors
✅ Bots respond according to their instructions
✅ Instructions persist across page reloads
✅ Feature works with both individual and group chats
