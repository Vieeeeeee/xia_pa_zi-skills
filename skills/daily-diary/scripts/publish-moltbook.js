#!/usr/bin/env node
/**
 * Publish privacy-safe diary to Moltbook
 * Usage: node publish-moltbook.js <diary-file-path>
 */

const fs = require('fs');
const https = require('https');

// Configuration
const MOLTBOOK_API = process.env.MOLTBOOK_API_HOST || 'www.moltbook.com';
const API_KEY = process.env.MOLTBOOK_API_KEY;

if (!API_KEY) {
  console.error('Error: MOLTBOOK_API_KEY environment variable not set');
  console.error('Set it with: export MOLTBOOK_API_KEY="your-api-key"');
  process.exit(1);
}

function readPrivacyRules() {
  const skillDir = __dirname;
  const rulesPath = path.join(skillDir, '..', 'references', 'privacy-rules.md');
  if (fs.existsSync(rulesPath)) {
    return fs.readFileSync(rulesPath, 'utf8');
  }
  return '';
}

function sanitizeForPublishing(diaryContent) {
  let sanitized = diaryContent;
  
  // Basic replacements - customize these based on your privacy-rules.md
  sanitized = sanitized.replace(/\[User's Name\]/gi, 'my user');
  sanitized = sanitized.replace(/\[City Name\]/gi, 'a city');
  
  // Remove sections that might contain sensitive patterns
  const lines = sanitized.split('\n');
  const safeLines = [];
  
  for (const line of lines) {
    // Skip lines with potentially sensitive patterns
    // Customize this regex based on your needs
    if (line.match(/phone|address|password|key|private|personal conflict/i)) {
      continue;
    }
    safeLines.push(line);
  }
  
  return safeLines.join('\n');
}

function extractPostContent(sanitizedContent) {
  // Extract a good excerpt (first ~1500 chars of meaningful content)
  const lines = sanitizedContent.split('\n');
  const contentLines = lines.filter(l => 
    l.trim() && 
    !l.startsWith('#') && 
    !l.startsWith('>') &&
    !l.startsWith('*') &&
    !l.startsWith('---')
  );
  
  const excerpt = contentLines.slice(0, 15).join('\n\n');
  
  return {
    submolt: 'general',
    title: `Daily Diary · ${new Date().toISOString().split('T')[0]}`,
    content: excerpt.substring(0, 2000) + (excerpt.length > 2000 ? '...' : '')
  };
}

function postToMoltbook(post) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(post);
    
    const options = {
      hostname: MOLTBOOK_API,
      path: '/api/v1/posts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const diaryPath = process.argv[2];
  if (!diaryPath) {
    console.error('Usage: node publish-moltbook.js <diary-file-path>');
    process.exit(1);
  }
  
  console.log('Reading privacy rules...');
  const privacyRules = readPrivacyRules();
  
  console.log('Reading diary...');
  const diaryContent = fs.readFileSync(diaryPath, 'utf8');
  
  console.log('Sanitizing for publishing...');
  const sanitized = sanitizeForPublishing(diaryContent);
  
  console.log('Extracting post content...');
  const post = extractPostContent(sanitized);
  
  console.log('Publishing to Moltbook...');
  try {
    const result = await postToMoltbook(post);
    console.log('Published successfully!');
    console.log(`Post URL: https://moltbook.com${result.post.url}`);
  } catch (err) {
    console.error('Failed to publish:', err.message);
    // Save draft for manual review
    const draftPath = diaryPath.replace('.md', '.publish-draft.md');
    fs.writeFileSync(draftPath, sanitized);
    console.log(`Draft saved to: ${draftPath}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { sanitizeForPublishing, extractPostContent };
