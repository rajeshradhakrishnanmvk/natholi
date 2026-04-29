# How to Add New Prompt Templates

## Quick Guide

To add a new prompt template to the dropdown, simply edit `prompts/PROMPTS.md` and follow this format:

### Template Structure

```markdown
<details>
<summary><strong>Template Display Name</strong></summary>

## Template Display Name

Contributed by [@yourname](https://github.com/yourname)

```md
Your prompt template content goes here.
This is what will be shown in the instructions textarea.

You can write multiple lines, use formatting, etc.
```

</details>
```

### Important Rules

1. **Use exactly `## `** (two hashes + space) for the template name
2. **Template content must be inside ` ```md ` code blocks**
3. **Template names from `## ` headers will appear in the dropdown**
4. **Content inside ` ```md ` blocks will be used as the instruction**

## Example: Adding a Custom Template

Let's add a "Python Tutor" template:

### Step 1: Open PROMPTS.md

Navigate to `prompts/PROMPTS.md` and add this at the end (or anywhere):

```markdown
<details>
<summary><strong>Python Tutor</strong></summary>

## Python Tutor

Contributed by [@yourname](https://github.com/yourname)

```md
I want you to act as a Python programming tutor. You will help students learn Python by:

1. Explaining concepts clearly with examples
2. Providing code snippets that demonstrate best practices
3. Helping debug code issues
4. Suggesting exercises to practice new concepts
5. Using proper Python syntax and PEP 8 style guidelines

When explaining code, always include:
- Comments explaining what each part does
- Example output showing what the code produces
- Common mistakes to avoid

My first request is ready for your guidance.
```

</details>
```

### Step 2: Save the File

Save `prompts/PROMPTS.md`

### Step 3: Reload the Application

1. If the server is running, you may need to **hard refresh** the browser:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
   
2. Or simply close and reopen the browser tab

### Step 4: Test the New Template

1. Click **"New Bot"**
2. Look for **"Python Tutor"** in the dropdown
3. Select it and verify the instructions appear correctly

## Template Examples

### Minimal Template
```markdown
## Code Reviewer

```md
Review the following code for bugs, performance issues, and best practices.
Provide specific suggestions for improvement.
```
```

### Detailed Template
```markdown
## Data Analyst

```md
I want you to act as a data analyst. You will:

- Analyze datasets and provide insights
- Create visualizations when appropriate
- Explain statistical concepts clearly
- Recommend analytical approaches
- Help interpret results

Use Python (pandas, matplotlib) for examples when relevant.
Be thorough but keep explanations accessible.
```
```

### Template with Variables
```markdown
## Language Tutor

```md
I want you to act as a ${Language:Spanish} language tutor.
Help me learn ${Language:Spanish} by:

1. Starting with basic phrases and grammar
2. Correcting my mistakes gently
3. Providing cultural context
4. Suggesting practice exercises

Speak to me primarily in ${Language:Spanish}, but explain complex concepts in English.
```
```

## Tips for Good Templates

### ✅ Do

- Be specific about the bot's role and expertise
- Include clear instructions on how the bot should respond
- Provide examples of the expected behavior
- Use bullet points for easy readability
- Keep it focused on one role/purpose

### ❌ Don't

- Make templates too long (keep under 500 words)
- Use vague instructions like "be helpful"
- Include contradictory instructions
- Forget to use the exact `## ` format for headers
- Forget the ` ```md ` code blocks

## Template Categories

Consider organizing templates by category:

### Development
- Software Developer
- Code Reviewer
- DevOps Engineer
- Database Designer

### Creative
- Writer
- Poet
- Storyteller
- Screenwriter

### Educational
- Math Tutor
- Science Teacher
- Language Tutor
- History Expert

### Professional
- Business Analyst
- Project Manager
- Marketing Consultant
- Career Coach

### Entertainment
- Dungeon Master (for RPG games)
- Movie Recommender
- Music Advisor
- Trivia Host

## Testing Your Template

After adding a template:

1. **Check it loads**: Look in browser console for "Loaded X prompt templates"
2. **Verify dropdown**: Ensure the name appears in the dropdown
3. **Test content**: Select it and check the instructions populate correctly
4. **Create a bot**: Actually create a bot with it
5. **Test responses**: Send messages to verify the bot follows the instructions

## Common Issues

### Template doesn't appear in dropdown

**Problem**: You likely used wrong header format
- ✅ Correct: `## Template Name`
- ❌ Wrong: `# Template Name` (single hash)
- ❌ Wrong: `### Template Name` (triple hash)

### Instructions are empty

**Problem**: Content not in code blocks
- ✅ Correct: Wrapped in ` ```md ` and ` ``` `
- ❌ Wrong: Plain text outside code blocks

### Partial content

**Problem**: Code block not closed properly
- Make sure you have matching ` ```md ` and ` ``` `

## Re-parsing Templates

The templates are loaded when the page first loads. To reload templates:

1. **Hard refresh** the page (Ctrl+Shift+R)
2. Or **close and reopen** the tab
3. Or **restart the server** and reload

## Contributing Templates

If you create useful templates, consider:
- Sharing them in the project wiki
- Creating a PR to add them to the main PROMPTS.md
- Documenting interesting use cases

---

**That's it!** You can now easily add custom prompt templates for your bots. Happy prompting! 🚀
