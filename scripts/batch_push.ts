import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const filesList = execSync('git ls-files', { encoding: 'utf-8' })
  .split('\n')
  .map((f) => f.trim())
  .filter((f) => f && f !== '.env' && !f.includes('.png') && !f.includes('.jpg'));

const fileObjects = filesList.map((filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return { path: filePath, content };
});

fs.writeFileSync('scripts/payload_batch.json', JSON.stringify(fileObjects, null, 2));
console.log(`Prepared ${fileObjects.length} text files for GitHub push.`);
