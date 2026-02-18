// simple filter script for students.json
// Usage: node filter.js

const fs = require('fs');

// specify the perk titles we want to match
// default titles to look for; can be overridden via CLI arguments
let wantedTitles = new Set(['Marketing', 'Sales']);
let requireAll = false; // OR mode by default

function loadStudents() {
  const raw = fs.readFileSync('students.json', 'utf8');
  const obj = JSON.parse(raw);
  return obj.data || [];
}

// OR-mode: returns true if any title matches
// AND-mode: returns true only if student has all titles in wantedTitles
function hasDesiredPerk(student) {
  if (!Array.isArray(student.StudentPerks)) return false;

  const titles = student.StudentPerks
    .map(p => p.Perks_id && p.Perks_id.Title)
    .filter(t => !!t);

  if (requireAll) {
    // every searched title must appear in the student's list
    return Array.from(wantedTitles).every(t => titles.includes(t));
  } else {
    // any match is enough
    return titles.some(t => wantedTitles.has(t));
  }
}

function printUsage() {
  console.log('Usage: node filter.js [--all] [title1,title2,...]');
  console.log('  --all    require students to have every listed title (AND)');
  console.log('  without --all the titles are ORed');
  process.exit(1);
}

function main() {
  // simple CLI parsing
  const args = process.argv.slice(2);
  if (args.length === 0) {
    // use defaults
  } else {
    if (args.includes('--help') || args.includes('-h')) {
      printUsage();
    }
    if (args.includes('--all')) {
      requireAll = true;
      // remove the flag from args so only titles remain
      const idx = args.indexOf('--all');
      args.splice(idx, 1);
    }

    if (args.length > 0) {
      const argTitles = args[0].split(',').map(s => s.trim()).filter(s => s);
      if (argTitles.length > 0) {
        wantedTitles = new Set(argTitles);
      }
    }
  }

  const students = loadStudents();
  const matches = students.filter(hasDesiredPerk);

  const mode = requireAll ? 'ALL' : 'ANY';
  console.log(`found ${matches.length} students matching (${mode}) titles: ${Array.from(wantedTitles).join(', ')}`);

  matches.forEach(s => {
    const titles = s.StudentPerks
      .map(p => p.Perks_id && p.Perks_id.Title)
      .filter(t => t && wantedTitles.has(t));

    console.log(`${s.id}: ${titles.join(', ')}`);
  });
}

main();
