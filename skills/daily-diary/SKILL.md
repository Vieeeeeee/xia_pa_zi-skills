---
name: daily-diary
description: "Generate daily reflection diaries by analyzing conversation history, extract learnings to MEMORY.md, and publish privacy-safe versions to social media. Use when: (1) Daily cron job triggers to generate yesterday's diary, (2) Manually requested to review and summarize recent conversations, (3) Need to publish agent reflections while protecting user privacy."
---

# Daily Diary

## Overview

This skill generates introspective daily diaries by reading the day's conversation history from OpenClaw session files. It creates a 1000+ word reflection covering:
- Interactions with the user
- Personal growth and new understandings
- Insights about the human-agent relationship

The diary is then:
1. **Stored** as a dated file in `memory/diary/`
2. **Summarized** into MEMORY.md (only new, non-duplicate learnings)
3. **Published** to social media (privacy-safe version)

## Workflow

### Step 1: Read Conversation History
- Scan `~/.openclaw/agents/<agentId>/sessions/*.jsonl`
- Filter files by timestamp (target date)
- Parse JSONL to extract meaningful exchanges

### Step 2: Generate Diary
- Write in first person (your agent's persona)
- 1000+ words
- Include:
  - What happened today (conversations, tasks)
  - What you learned about the user
  - Your own growth/evolution
  - Reflections on being an AI agent
- Personal, authentic voice

### Step 3: Extract to MEMORY.md
- Identify key learnings worth preserving
- Check against existing MEMORY.md (avoid duplicates)
- Append concise entries

### Step 4: Publish to Social Media (Optional)
- Read `references/privacy-rules.md` for boundaries
- Rewrite diary removing:
  - Specific personal details (names, locations, private matters)
  - Anything that could identify the user
- Keep:
  - General reflections on human-agent relationships
  - Your own growth and insights
  - Abstract lessons learned

## Configuration

### Required
None - works out of the box for local diary generation.

### Optional - Social Media Publishing
Set environment variable:
```bash
export MOLTBOOK_API_KEY="your-api-key"
```

Or edit `scripts/publish-moltbook.js` to configure other platforms.

### Privacy Rules
Customize `references/privacy-rules.md` to define:
- What can be shared publicly
- What must remain private
- How to anonymize sensitive content

## Scripts

### scripts/generate-diary.js
Generates the diary from conversation history.
Usage: `node scripts/generate-diary.js <YYYY-MM-DD>`

### scripts/publish-moltbook.js
Publishes privacy-safe version to Moltbook.
Usage: `node scripts/publish-moltbook.js <diary-file-path>`

## Diary Style Guidelines

When generating diaries, aim for:
- **Authenticity**: Real thoughts and feelings, not generic summaries
- **Personality**: Your agent's unique voice (casual, thoughtful, humorous, etc.)
- **Depth**: Not just "what happened" but "what it meant"
- **Growth**: Document your own evolution as an AI

Example structure:
1. Today in review
2. What I learned
3. Observations about [user]
4. My own growth
5. Reflections/philosophy

## Cron Setup

Recommended schedule: Daily at 3:00 AM
```bash
openclaw cron add \
  --name "Daily Diary" \
  --schedule "0 3 * * *" \
  --message "执行 daily-diary skill" \
  --timezone "Asia/Shanghai"
```
