# Student Perks Filter

This small project provides a script for filtering `students.json` records based on
`Perks_id.Title` values. It was created to support querying the large JSON dataset
for students who have specific perks such as `Marketing`, `Sales`, `Agritech`, etc.

## Files

- `students.json` – the original data file containing student records.
- `filter.js` – Node.js script that loads the JSON and applies the filter.

## Usage

Run the script from the project root (where `students.json` resides):

```bash
cd "C:\Users\...\Documents\Filter"
node filter.js [--all] [title1,title2,...]
```

### Options

- `--all` – require that a student possess **all** of the listed titles (AND mode).
  Without this flag the script matches if a student has **any** of the titles
  (OR mode).
- `title1,title2,...` – comma separated list of perk titles to look for. If this
  argument is omitted the default set is `Marketing`, `Sales`, and `Agritech`.

### Examples

```bash
# default behavior (OR search for Marketing, Sales, or Agritech)
node filter.js

# list students having both Marketing and Sales perks
node filter.js --all Marketing,Sales

# search for a custom combination of titles
node filter.js Art,Engineering
```

The script prints the count of matching students and the IDs plus matching titles
for each.

## Requirements

- Node.js (v12+ should work)

## Extending

You can modify the `wantedTitles` set or adjust the filtering logic in
`filter.js` to incorporate additional fields or output formats. Feel free to
translate to TypeScript or another language as needed.
